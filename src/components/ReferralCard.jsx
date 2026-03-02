import { useState, useEffect } from "react";
import confetti from "canvas-confetti";

export default function ReferralCard({ user, setUser }) {
  const [referralLink, setReferralLink] = useState("");

  // Safety: Only access 'window' after the component mounts in the browser
  useEffect(() => {
    if (typeof window !== "undefined" && user?.email) {
      setReferralLink(`${window.location.origin}?ref=${user.email}`);
    }
  }, [user?.email]);

  // Safety Guard: Don't render if user is missing
  if (!user) return null;

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Join the Waitlist",
          text: "Use my referral link to join!",
          url: referralLink,
        });
      } else {
        await navigator.clipboard.writeText(referralLink);
        alert("Referral link copied!");
      }

      // 1. Get current waitlist safely
      const rawWaitlist = localStorage.getItem("waitlist");
      const waitlist = rawWaitlist ? JSON.parse(rawWaitlist) : [];

      // 2. Update points logic
      const updatedWaitlist = waitlist.map((u) =>
        u.email === user.email ? { ...u, points: (u.points || 0) + 10 } : u
      );

      // 3. Update Storage
      const updatedUser = { ...user, points: (user.points || 0) + 10 };
      localStorage.setItem("waitlist", JSON.stringify(updatedWaitlist));
      localStorage.setItem("waitlistUser", JSON.stringify(updatedUser));

      // 4. Update State & Trigger Effect
      setUser(updatedUser);
      confetti();
      
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  return (
    <div className="bg-zinc-900 p-6 rounded-2xl mt-6 border border-zinc-800 text-center">
      <h3 className="text-xl mb-2">Referral Points</h3>
      {/* Use optional chaining for the points display */}
      <p className="text-4xl font-bold text-green-400 mb-4">
        {user?.points || 0} pts
      </p>
      <button
        onClick={handleShare}
        className="bg-green-600 hover:bg-green-500 px-6 py-3 rounded-xl font-bold transition-all active:scale-95"
      >
        Share & Earn +10 Points
      </button>
    </div>
  );
}