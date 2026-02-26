import React, { useState } from "react";

const shell =
  "min-h-screen bg-gradient-to-b from-[#E8F2EC] via-[#D6E8DE] to-[#C3DCCF] text-gray-700 relative overflow-hidden";

const panel =
  "bg-white border border-neutral-200 rounded-xl shadow-sm";

const primaryBtn =
  "bg-neutral-900 text-white hover:bg-black transition-colors cursor-pointer";

export default function App() {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [page, setPage] = useState<"about" | "app">("about");

  if (page === "about") {
    return (
      <div className={shell}>
        <Landing onEnter={() => setPage("app")} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className={`${shell} flex items-center justify-center`}>
        <AuthScreen setUser={setUser} mode={mode} setMode={setMode} />
      </div>
    );
  }

  return (
    <div className={shell}>
      <Dashboard user={user} setUser={setUser} goAbout={() => setPage("about")} />
    </div>
  );
}

function Landing({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-6xl font-light mb-12">I want ...</h1>
      <button onClick={onEnter} className={`px-10 py-4 rounded-lg ${primaryBtn}`}>
        Enter
      </button>
    </div>
  );
}

function AuthScreen({ setUser, mode, setMode }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = (e: any) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("iwant_users") || "{}");

    if (mode === "signup") {
      users[email] = { password };
      localStorage.setItem("iwant_users", JSON.stringify(users));
      setUser({ email });
      return;
    }

    if (users[email] && users[email].password === password) {
      setUser({ email });
    } else {
      alert("Invalid login");
    }
  };

  return (
    <div className={`${panel} w-full max-w-md p-10`}>
      <h2 className="text-2xl font-semibold mb-6">
        {mode === "login" ? "Login" : "Create account"}
      </h2>
      <form onSubmit={handleAuth} className="space-y-4">
        <input className="w-full border rounded-lg p-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" className="w-full border rounded-lg p-3" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className={`w-full py-3 rounded-lg ${primaryBtn}`}>
          {mode === "login" ? "Login" : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

function Dashboard({ user, setUser, goAbout }: any) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex justify-between mb-8">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="space-x-2">
          <button className="px-4 py-2 border rounded-lg" onClick={goAbout}>About</button>
          <button className="px-4 py-2 border rounded-lg" onClick={() => setUser(null)}>Logout</button>
        </div>
      </div>
      <div className={`${panel} p-8`}>
        Logged in as <strong>{user.email}</strong>
      </div>
    </div>
  );
}
