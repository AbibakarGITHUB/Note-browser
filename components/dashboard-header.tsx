'use client';
import Link from 'next/link';

export default function DashboardHeader() {
  return (
    <header className="bg-gray-900 text-white p-4 fixed top-0 left-0 right-0 z-10">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-xl font-bold hover:text-gray-300">
            Dashboard
          </Link>

        </div>
      </div>
    </header>
  );
}