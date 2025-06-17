"use client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    localStorage.setItem("mock-authenticated", "true");
    router.replace("/");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="text-center p-8 rounded-lg shadow-lg bg-white/80">
        <h1 className="text-3xl font-bold mb-4 text-blue-700">Login</h1>
        <p className="mb-6 text-gray-700">Click the button below to log in as a test user.</p>
        <button
          onClick={handleLogin}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Login as Test User
        </button>
      </div>
    </main>
  );
}
