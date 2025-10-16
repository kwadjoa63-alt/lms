"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { MemberRole, User } from "@prisma/client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Combobox } from "@/components/ui/combobox";

interface MemberRoleFormProps {
  initialData: Omit<User, "password">;
  id: string;
}

const formSchema = z.object({
  role: z.string().min(1),
});

const options = Object.values(MemberRole).map((role) => ({
  label: role,
  value: role,
}));

export const MemberRoleForm = ({
  initialData,
  id,
}: MemberRoleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: initialData?.role || ""
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/profile/${id}`, values);
      toast.success("Profile updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }

  // Check if the course already has a selected option.
  const selectedOption = options.find(option => option.value === initialData.role);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-300">
              {initialData.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-bold">{initialData.name}</h2>
            <p className="text-gray-600 dark:text-gray-400">{initialData.email}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
        <div className="font-medium flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">User Role</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Assign appropriate role to manage user permissions
            </p>
          </div>
          <Button onClick={toggleEdit} variant="ghost">
            {isEditing ? (
              <>Cancel</>
            ) : (
              <>
                <Pencil className="h-4 w-4 mr-2" />
                Edit role
              </>
            )}
          </Button>
        </div>
        {!isEditing && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Current Role:</span>
            <span className={cn(
              "px-3 py-1 rounded-full text-sm font-semibold",
              initialData.role === "ADMIN" && "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
              initialData.role === "TEACHER" && "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
              initialData.role === "STUDENT" && "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
            )}>
              {selectedOption?.label || "No role"}
            </span>
          </div>
        )}
        {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox
                      options={options}
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
      </div>

      <div className="bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800 p-4">
        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Role Permissions</h4>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li><strong>STUDENT:</strong> Can enroll in and view purchased courses</li>
          <li><strong>TEACHER:</strong> Can create and manage courses, view analytics</li>
          <li><strong>ADMIN:</strong> Full access including user management</li>
        </ul>
      </div>
    </div>
  )
}