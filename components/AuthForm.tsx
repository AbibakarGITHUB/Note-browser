// components/AuthForm.tsx
import { useState } from 'react';

type Props = {
  label: string;
  onSubmit: (email: string, password: string) => void;
};

export default function AuthForm({ label, onSubmit }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className=" text-white space-y-4">
      <input
        type="email"
        placeholder="Email"
        className="w-full border p-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full border p-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="w-full bg-blue-500 text-white p-2 rounded">
        {label}
      </button>
    </form>
  );
}
