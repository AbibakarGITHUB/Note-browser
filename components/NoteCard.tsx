// components/NoteCard.tsx
'use client';
import Link from 'next/link';

type NoteCardProps = {
  note: {
    id: string;
    content: string;
  };
  onDelete: (id: string) => Promise<void>;
};

export default function NoteCard({ note, onDelete }: NoteCardProps) {
  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Prevent event bubbling
    await onDelete(note.id);
  };

  return (
    <div className="bg-gray-800 p-4 rounded shadow text-white">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold truncate">
          {note.content.slice(0, 20)}...
        </h2>
        <Link
          href={`/dashboard/note/${note.id}`}
          className="text-blue-400 hover:underline text-sm"
        >
          View
        </Link>
      </div>

      <p className="text-sm text-gray-400 mb-2">
        {note.content.length > 60 ? note.content.slice(0, 60) + '...' : note.content}
      </p>

      <button
        onClick={handleDelete}
        className="text-red-500 text-sm hover:underline"
      >
        Delete
      </button>
    </div>
  );
}
