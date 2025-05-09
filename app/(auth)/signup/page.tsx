'use client';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import AuthForm from '@/components/AuthForm';

export default function SignupPage() {
  const router = useRouter();

  const handleSignup = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      alert(error.message);
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <div className="flex justify-center mb-4">
        <h1 className="text-2xl text-white font-bold">Sign Up</h1>
      </div>
     
      <AuthForm label="Sign Up" onSubmit={handleSignup} />

      <p className="mt-4 text-center text-gray-600">
         have an account?{' '}
        <a href="/login" className="text-blue-500 hover:underline">
          Login
        </a>
      </p>

    </div>
  );
}
