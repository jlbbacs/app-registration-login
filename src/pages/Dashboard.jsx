import { calculatePosition } from "../utils/waitlistLogic";
import ReferralCard from "../components/ReferralCard";

export default function Dashboard({ user, setUser }) {
  // 1. Safety Guard: If user is missing, show a loading state 
  // instead of crashing the whole app.
  if (!user) {
    return (
      <div className="h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // 2. Safely calculate position
  const position = user?.email ? calculatePosition(user.email) : "N/A";

  const handleBackToRegister = () => {
    setUser(null);
  };

  return (
    <div className="p-8 min-h-screen bg-black text-white flex flex-col items-center">
      {/* 3. Use optional chaining (?.) for extra safety */}
      <h2 className="text-3xl font-bold mb-2">Hello, {user?.name || "User"}</h2>
      <p className="text-sm text-zinc-400 mb-6">Contact: {user?.contact || "No contact provided"}</p>

      <div className="bg-zinc-900 p-6 rounded-2xl mb-6 text-center w-full max-w-md border border-zinc-800">
        <h3 className="text-xl mb-2">Position in Line</h3>
        <p className="text-6xl font-bold text-blue-400">{position}</p>
      </div>

      <ReferralCard user={user} setUser={setUser} />

      <button
        onClick={handleBackToRegister}
        className="mt-6 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all px-6 py-3 rounded-xl font-medium border border-red-500/20"
      >
        Back to Register
      </button>
    </div>
  );
}