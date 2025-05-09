'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import AuthForm from '@/components/AuthForm';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { error: signInError } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });

      if (signInError) throw signInError;

      // Successful login
      router.push('/dashboard');
      router.refresh(); // Refresh to update auth state
      
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-4">
      <div className='flex justify-center mb-4'>


          <h1 className="text-2xl text-white font-bold mb-4 text-center">Log In</h1>


      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <AuthForm 
        label="Log In" 
        onSubmit={handleLogin} 
        isLoading={isLoading}
      />
      <p className="mt-4 text-center text-gray-600">
        Don&apos;t have an account?{' '}
        <a href="/signup" className="text-blue-500 hover:underline">
          Sign up
        </a>
      </p>
    </div>
  );
}
