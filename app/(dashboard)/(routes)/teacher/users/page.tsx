import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";

const UsersPage = async () => {
  // Require admin access to manage users
  await requireAdmin();
  
  // Fetch all users from database
  const userData = await db.user.findMany({
    orderBy: {
      createdAt: "desc"
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      imageUrl: true,
      createdAt: true,
      updatedAt: true
    }
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage user roles and permissions. Only admins can access this page.
        </p>
      </div>
      <DataTable columns={columns} data={userData} /> 
    </div>
  );
};

export default UsersPage;