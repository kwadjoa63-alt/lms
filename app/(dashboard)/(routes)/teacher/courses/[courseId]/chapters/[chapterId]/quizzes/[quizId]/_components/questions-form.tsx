"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PlusCircle, Trash, Check, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface QuestionsFormProps {
  initialData: any[];
  courseId: string;
  chapterId: string;
  quizId: string;
}

const formSchema = z.object({
  question: z.string().min(1, "Question is required"),
  type: z.string().default("multiple-choice"),
  points: z.number().min(1).default(1),
  explanation: z.string().optional(),
  options: z.array(
    z.object({
      text: z.string().min(1),
      isCorrect: z.boolean(),
    })
  ).min(2, "At least 2 options required"),
});

export const QuestionsForm = ({
  initialData,
  courseId,
  chapterId,
  quizId,
}: QuestionsFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [options, setOptions] = useState<{ text: string; isCorrect: boolean }[]>([
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
  ]);

  const toggleCreating = () => {
    setIsCreating((current) => !current);
    setOptions([
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
    ]);
  };

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      type: "multiple-choice",
      points: 1,
      explanation: "",
      options: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
    },
  });

  const { isSubmitting } = form.formState;

  const addOption = () => {
    const newOptions = [...options, { text: "", isCorrect: false }];
    setOptions(newOptions);
    form.setValue("options", newOptions);
  };

  const removeOption = (index: number) => {
    if (options.length <= 2) {
      toast.error("At least 2 options required");
      return;
    }
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
    form.setValue("options", newOptions);
  };

  const updateOption = (index: number, field: "text" | "isCorrect", value: string | boolean) => {
    const newOptions = [...options];
    newOptions[index] = { ...newOptions[index], [field]: value };
    setOptions(newOptions);
    form.setValue("options", newOptions);
  };

  const toggleCorrect = (index: number) => {
    const newOptions = options.map((opt, i) => ({
      ...opt,
      isCorrect: i === index,
    }));
    setOptions(newOptions);
    form.setValue("options", newOptions);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Validate at least one correct answer
      const hasCorrectAnswer = values.options.some(opt => opt.isCorrect);
      if (!hasCorrectAnswer) {
        toast.error("Please mark at least one option as correct");
        return;
      }

      await axios.post(
        `/api/courses/${courseId}/chapters/${chapterId}/quizzes/${quizId}/questions`,
        values
      );
      toast.success("Question added");
      toggleCreating();
      form.reset();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="border bg-slate-100 rounded-md p-4 dark:bg-gray-800">
      <div className="font-medium flex items-center justify-between mb-4">
        Quiz Questions
        <Button onClick={toggleCreating} variant="ghost" size="sm">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add question
            </>
          )}
        </Button>
      </div>

      {isCreating && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="Enter your question"
                      {...field}
                      className="min-h-[80px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <label className="text-sm font-medium">Answer Options</label>
              {options.map((option, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Input
                    value={option.text}
                    onChange={(e) => updateOption(index, "text", e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    disabled={isSubmitting}
                  />
                  <Button
                    type="button"
                    variant={option.isCorrect ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleCorrect(index)}
                    disabled={isSubmitting}
                    className={cn(
                      "whitespace-nowrap",
                      option.isCorrect && "bg-green-600 hover:bg-green-700"
                    )}
                  >
                    {option.isCorrect ? <Check className="h-4 w-4" /> : "Correct?"}
                  </Button>
                  {options.length > 2 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeOption(index)}
                      disabled={isSubmitting}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addOption}
                disabled={isSubmitting}
                className="w-full"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add option
              </Button>
            </div>

            <FormField
              control={form.control}
              name="points"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isSubmitting}
                      placeholder="Points (default: 1)"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="explanation"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="Explanation (optional - shown after answering)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isSubmitting} type="submit" className="w-full">
              Add Question
            </Button>
          </form>
        </Form>
      )}

      {!isCreating && (
        <div className="space-y-2">
          {initialData.length === 0 && (
            <p className="text-sm text-slate-500 italic">No questions yet</p>
          )}
          {initialData.map((question: any, index: number) => (
            <div
              key={question.id}
              className="bg-slate-200 dark:bg-gray-700 rounded-md p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium">
                    {index + 1}. {question.question}
                  </p>
                  <div className="mt-2 space-y-1">
                    {question.options?.map((opt: any) => (
                      <div key={opt.id} className="flex items-center gap-2 text-sm">
                        {opt.isCorrect ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <X className="h-4 w-4 text-gray-400" />
                        )}
                        <span className={opt.isCorrect ? "font-semibold text-green-600" : ""}>
                          {opt.text}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-gray-400 mt-2">
                    {question.points} point{question.points !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

