📝 Browser Notes App

A modern note-taking application built with Next.js 14, featuring AI assistance and real-time data synchronization.

✨ Features
🔐 Secure authentication with Supabase
📝 Create and manage personal notes
🤖 AI-powered assistant for note interactions
🎨 Modern UI with shadcn/ui components
🌓 Dark mode design
📱 Responsive layout
🚀 Tech Stack
Next.js 14 - React framework
TypeScript - Type safety
Supabase - Backend & Authentication
Tailwind CSS - Styling
shadcn/ui - UI components
OpenAI - AI integration
📦 Installation
Clone the repository:

git clone https://github.com/AbibakarGITHUB/Note-browser

cd browser-notes-app

Install dependencies:

npm install

Set up environment variables:

cp .env.example .env.local

Fill in your environment variables:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
OPENAI_API_KEY=your_openai_key

Run the development server:

npm run dev

🏗️ Project Structure

my-app/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth routes
│   ├── dashboard/         # Protected routes
│   └── api/               # API endpoints
├── components/            # React components
├── lib/                   # Utilities
└── middleware.ts         # Auth middleware

🔒 Authentication
The app uses Supabase Authentication with:

Email/Password signup
Protected routes
Secure session management
💾 Database Schema

create table notes (
  id uuid default uuid_generate_v4() primary key,
  content text not null,
  created_at timestamp with time zone default now(),
  user_id uuid references auth.users not null
);


🤖 AI Integration
Real-time chat interface
OpenAI-powered responses
Context-aware assistance

🛠️ Development
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

📱 Responsive Design
Mobile-first approach
Adaptive layouts
Touch-friendly interface
🔐 Security Features
Authentication middleware
Row Level Security
Protected API routes
Type-safe operations
📄 License
MIT License - see LICENSE.md

🤝 Contributing
Fork the repository
Create your feature branch
Commit your changes
Push to the branch
Open a Pull Request
👥 Authors
Abibakar - Initial work
🙏 Acknowledgments
Next.js
Supabase
shadcn/ui
OpenAI
Made with ❤️ using Next.js and TypeScript
