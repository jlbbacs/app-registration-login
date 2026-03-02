import { calculatePosition } from "../utils/waitlistLogic";
import ReferralCard from "../components/ReferralCard";

export default function Dashboard({ user, setUser }) {
  const position = calculatePosition(user.email);

  const handleBackToRegister = () => {
    // Clear only current user to go back to Welcome
    setUser(null);
  };

  return (
    <div className="p-8 min-h-screen bg-black text-white flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-2">Hello, {user.name}</h2>
      <p className="text-sm text-zinc-400 mb-6">Contact: {user.contact}</p>

      <div className="bg-zinc-900 p-6 rounded-2xl mb-6 text-center w-full max-w-md">
        <h3 className="text-xl mb-2">Position in Line</h3>
        <p className="text-6xl font-bold text-blue-400">{position}</p>
      </div>

      <ReferralCard user={user} setUser={setUser} />

      <button
        onClick={handleBackToRegister}
        className="mt-6 bg-red-500 hover:bg-red-600 transition px-6 py-3 rounded-xl font-medium"
      >
        Back to Register
      </button>
    </div>
  );
}