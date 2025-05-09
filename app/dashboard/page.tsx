'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import NoteCard from '@/components/NoteCard';
import AiAssistant from '@/components/AiAssistant';
import DashboardHeader from '@/components/dashboard-header';
import { User } from '@supabase/supabase-js';

type Note = {
  id: string;
  content: string;
};

export default function DashboardPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [user, setUser] = useState<User | undefined>(undefined);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchNotes() {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("User fetch error:", userError?.message);
        return;
      }

      setUser(user);

      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Fetch error:', error.message);
      } else if (data) {
        setNotes(data);
      }
    }

    fetchNotes();
  }, []);

  const addNote = async () => {
    if (!newNote.trim() || !user) return;

    try {
      const { data, error } = await supabase
        .from('notes')
        .insert([
          {
            content: newNote,
            user_id: user.id,
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) {
        console.error('Insert error:', error.message);
        return;
      }

      if (data) {
        setNotes((prevNotes) => [...prevNotes, data]);
        setNewNote('');
      }
    } catch (err) {
      console.error('Error adding note:', err);
    }
  };

  const deleteNote = async (id: string) => {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
      console.error('Auth error:', authError.message);
      return;
    }

    if (!user) {
      console.warn("No user found — make sure you're logged in.");
      return;
    }

    const { error: deleteError } = await supabase
      .from('notes')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (deleteError) {
      console.error('Delete error:', deleteError.message);
      return;
    }

    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const filteredNotes = notes.filter((note) =>
    note.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen">
      <main className="flex-1  p-6">
        <DashboardHeader />
        <h1 className="text-3xl text-white font-bold mb-6">Your Notes</h1>

        {/* Search Bar */}
        <form className="flex flex-col items-center mb-6">
            <h1 className='font-bold text-white text-center mb-2'>Search</h1>
          <input
            placeholder="Search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-2 w-full md:w-1/2 px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400"
          />
        </form>

        {/* Input and Add button */}
        <div className="flex flex-col md:flex-row gap-2 mb-6">
          <input
            className="flex-1 border border-gray-500 bg-gray-900 p-2 rounded text-white"
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Write a new note..."
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={addNote}
          >
            Add
          </button>
        </div>

        {/* Note Cards */}
        <div className="grid gap-4">
          {filteredNotes.length === 0 ? (
            <p className="text-gray-400">No matching notes found.</p>
          ) : (
            filteredNotes.map((note) => (
              <Link key={note.id} href={`/dashboard/notes/${note.id}`}>
                <NoteCard note={note} onDelete={deleteNote} />
              </Link>
            ))
          )}
        </div>

        </main>
    {/* Right Sidebar: AI Assistant */}
    <aside className="w-[400px] bg-gray-900 p-4 hidden md:block">
      <div className="mt-20"> {/* Increased top margin */}
        <h2 className="text-lg text-white font-semibold mb-4">AI-Assistant</h2>
        <div className="h-[calc(100vh-12rem)] overflow-y-auto"> {/* Adjusted height */}
          <AiAssistant />
        </div>
      </div>
    </aside>
    </div>
  );
}
