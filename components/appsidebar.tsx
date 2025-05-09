'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function AppSidebar() {
  const pathname = usePathname();
  
  // Only show sidebar on dashboard routes
  if (!pathname?.startsWith('/dashboard')) {
    return null;
  }

  return (
    <aside className="w-64 bg-white text-black min-h-screen p-4">
      <nav className="space-y-4">
        <Link href="/dashboard" className="block py-2 font-bold px-4 hover:bg-gray-800 rounded">
          Dashboard
        </Link>
        <Link href="/profile" className="block py-2 px-4 font-bold  hover:bg-gray-800 rounded">
          Profile
        </Link>
        <Link href="/profile" className="block py-2 px-4 font-bold  hover:bg-gray-800 rounded">
          bam bam 
        </Link>
        <Link href="/profile" className="block py-2 px-4 font-bold  hover:bg-gray-800 rounded">
          tamtam 
            </Link>
        <Link href="/profile" className="block py-2 px-4 font-bold  hover:bg-gray-800 rounded">
          zam zam
        </Link>
      </nav>
    </aside>
  );
}

