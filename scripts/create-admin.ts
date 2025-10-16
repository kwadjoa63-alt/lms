import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Starting admin/teacher account creation...\n');

  // Admin Account
  const adminEmail = 'admin@kwadjo.com';
  const adminPassword = 'admin123';
  
  // Teacher Account
  const teacherEmail = 'teacher@kwadjo.com';
  const teacherPassword = 'teacher123';

  try {
    // Check if admin exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (existingAdmin) {
      console.log('⚠️  Admin account already exists');
    } else {
      // Create admin
      const hashedAdminPassword = await bcrypt.hash(adminPassword, 10);
      const admin = await prisma.user.create({
        data: {
          name: 'Admin User',
          email: adminEmail,
          password: hashedAdminPassword,
          role: 'ADMIN',
        },
      });
      console.log('✅ Admin account created successfully!');
      console.log(`   Email: ${adminEmail}`);
      console.log(`   Password: ${adminPassword}`);
      console.log(`   Role: ${admin.role}\n`);
    }

    // Check if teacher exists
    const existingTeacher = await prisma.user.findUnique({
      where: { email: teacherEmail },
    });

    if (existingTeacher) {
      console.log('⚠️  Teacher account already exists');
    } else {
      // Create teacher
      const hashedTeacherPassword = await bcrypt.hash(teacherPassword, 10);
      const teacher = await prisma.user.create({
        data: {
          name: 'Teacher User',
          email: teacherEmail,
          password: hashedTeacherPassword,
          role: 'TEACHER',
        },
      });
      console.log('✅ Teacher account created successfully!');
      console.log(`   Email: ${teacherEmail}`);
      console.log(`   Password: ${teacherPassword}`);
      console.log(`   Role: ${teacher.role}\n`);
    }

    console.log('🎉 Setup complete! You can now sign in with these credentials.');
  } catch (error) {
    console.error('❌ Error creating accounts:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


