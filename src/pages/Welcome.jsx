import { useState, useEffect } from "react";
import confetti from "canvas-confetti";


export default function Welcome({ setUser }) {
  const [form, setForm] = useState({ name: "", email: "", contact: "" });

  // Reset form if last user is cleared from Dashboard
  useEffect(() => {
    setForm({ name: "", email: "", contact: "" });
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleJoin = () => {
    if (!form.name || !form.email || !form.contact) {
      return alert("Please fill all fields!");
    }

    const waitlist = JSON.parse(localStorage.getItem("waitlist") || "[]");

    const newUser = { ...form, points: 0 };
    waitlist.push(newUser);

    localStorage.setItem("waitlist", JSON.stringify(waitlist));
    localStorage.setItem("waitlistUser", JSON.stringify(newUser));

    // Set user to navigate to Dashboard
    setUser(newUser);

    // Confetti effect
    confetti();

    // Reminder after registration
    setTimeout(() => alert("✅ You're on the waitlist! We'll remind you soon."), 5000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white px-4">
      <h1 className="text-4xl font-bold mb-6">Join the Waitlist</h1>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        className="w-full max-w-md p-3 mb-4 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full max-w-md p-3 mb-4 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500"
      />
      <input
        type="text"
        name="contact"
        placeholder="Contact Number"
        value={form.contact}
        onChange={handleChange}
        className="w-full max-w-md p-3 mb-4 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500"
      />

      <button
        onClick={handleJoin}
        className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl font-medium transition"
      >
        Join Waitlist
      </button>
    </div>
  );
}