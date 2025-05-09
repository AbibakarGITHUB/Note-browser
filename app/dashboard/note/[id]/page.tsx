'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';

type Note = {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
};

export default function NotePage({ params }: { params: { id: string } }) {
  const [note, setNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchNote() {
      try {
        const { data, error } = await supabase
          .from('notes')
          .select('*')
          .eq('id', params.id)
          .single();

        if (error || !data) {
          return notFound();
        }

        setNote(data);
      } catch (error) {
        console.error('Error fetching note:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchNote();
  }, [params.id]);

  const handleDelete = async () => {
    try {
      // First verify the note exists
      const { data: existingNote, error: fetchError } = await supabase
        .from('notes')
        .select('id')
        .eq('id', params.id)
        .single();

      if (fetchError || !existingNote) {
        console.error('Note not found:', fetchError);
        router.push('/dashboard');
        return;
      }

      // Then perform the delete operation
      const { error: deleteError } = await supabase
        .from('notes')
        .delete()
        .eq('id', params.id)
        .eq('user_id', note?.user_id); // Add user_id check for security

      if (deleteError) {
        console.error('Error deleting note:', deleteError);
        return;
      }

      // Only redirect after successful deletion
      router.refresh(); // Refresh the router cache
      router.push('/dashboard');
    } catch (error) {
      console.error('Error in delete operation:', error);
    }
  };

  // Add confirmation before delete
  const confirmDelete = () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      handleDelete();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6 pt-20">
        <div className="max-w-2xl mx-auto">Loading...</div>
      </div>
    );
  }

  if (!note) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-20">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link 
            href="/dashboard" 
            className="text-blue-400 hover:underline inline-block"
          >
            ← Back to Dashboard
          </Link>
          <button
            onClick={confirmDelete} // Changed from handleDelete to confirmDelete
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Delete Note
          </button>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-4">
          <h1 className="text-2xl font-bold mb-4">Note Details</h1>
          <p className="text-gray-300 whitespace-pre-wrap">{note.content}</p>
          
          <div className="mt-6 text-sm text-gray-400">
            Created: {new Date(note.created_at).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}