'use client';
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="bg-gray-900 text-white p-4">
        <Link href="/dashboard" className="text-xl hover:text-gray-300">
          Back to Dashboard
        </Link>
      </nav>

      {/* Profile Content */}
      <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
        
        <h1 className="text-2xl font-bold mb-6">Profile</h1>
        <Button 
          onClick={handleSignOut}
          variant="destructive"
          className="w-full"
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}