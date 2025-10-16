'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Shield, User, GraduationCap } from 'lucide-react';

export default function SetupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'ADMIN' | 'TEACHER' | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedRole) {
      toast.error('Please select a role');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('/api/auth/signup', {
        ...formData,
        role: selectedRole
      });

      if (response.data.error) {
        toast.error(response.data.error);
        setIsLoading(false);
        return;
      }

      toast.success(`${selectedRole} account created successfully! 🎉`);
      
      // Redirect to sign in
      setTimeout(() => {
        router.push('/sign-in');
      }, 1500);
    } catch (error: any) {
      if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Something went wrong');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Admin Setup
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Create admin or teacher accounts for your learning platform
            </p>
          </div>
        </div>

        {/* Role Selection */}
        {!selectedRole && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setSelectedRole('ADMIN')}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 hover:shadow-2xl transition-all duration-200 hover:scale-105"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                  <Shield className="w-10 h-10 text-red-600 dark:text-red-300" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Create Admin
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Full platform access including user management
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setSelectedRole('TEACHER')}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 hover:shadow-2xl transition-all duration-200 hover:scale-105"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <GraduationCap className="w-10 h-10 text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Create Teacher
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Can create courses and view analytics
                  </p>
                </div>
              </div>
            </button>
          </div>
        )}

        {/* Form */}
        {selectedRole && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                  selectedRole === 'ADMIN' 
                    ? 'bg-red-100 dark:bg-red-900' 
                    : 'bg-blue-100 dark:bg-blue-900'
                }`}>
                  {selectedRole === 'ADMIN' ? (
                    <Shield className="w-6 h-6 text-red-600 dark:text-red-300" />
                  ) : (
                    <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Create {selectedRole}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Enter account details below
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setSelectedRole(null)}
                variant="ghost"
                size="sm"
              >
                Change Role
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter full name"
                  disabled={isLoading}
                  className="h-12"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Enter email address"
                  disabled={isLoading}
                  className="h-12"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Create a strong password"
                  disabled={isLoading}
                  className="h-12"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Must be at least 6 characters long
                </p>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Creating account...</span>
                  </div>
                ) : (
                  `Create ${selectedRole} Account`
                )}
              </Button>
            </form>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <a
                  href="/sign-in"
                  className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
                >
                  Sign in here
                </a>
              </p>
            </div>
          </div>
        )}

        {/* Default Credentials Info */}
        <div className="bg-blue-50 dark:bg-blue-950 rounded-2xl border border-blue-200 dark:border-blue-800 p-6">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
            📝 Quick Setup Credentials
          </h3>
          <div className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
            <p><strong>Admin:</strong> admin@kwadjo.com / admin123</p>
            <p><strong>Teacher:</strong> teacher@kwadjo.com / teacher123</p>
            <p className="text-xs mt-2 text-blue-600 dark:text-blue-400">
              These are suggested credentials for testing. You can create accounts with any details you prefer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


