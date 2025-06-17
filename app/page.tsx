import React from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gothic text-gothicIvory font-gothic">
      <div className="card text-center flex flex-col items-center justify-center w-full max-w-md">
        <h1 className="text-4xl font-gothic mb-4 text-gothicGold">Welcome to Next.js AI Project!</h1>
        <p className="text-lg text-gothicIvory mb-6">
          Your Next.js + TypeScript + Tailwind CSS project is running successfully.
        </p>
        <a
          href="https://nextjs.org/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gothic"
        >
          Next.js Documentation
        </a>
      </div>
    </main>
  );
}
