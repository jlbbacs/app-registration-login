import confetti from "canvas-confetti";

export default function ReferralCard({ user, setUser }) {
  const referralLink = `${window.location.origin}?ref=${user.email}`;

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Join the Waitlist",
        text: "Use my referral link to join!",
        url: referralLink,
      });
    } else {
      navigator.clipboard.writeText(referralLink);
      alert("Referral link copied!");
    }

    // Add points for sharing
    const waitlist = JSON.parse(localStorage.getItem("waitlist") || "[]");
    const updatedWaitlist = waitlist.map((u) =>
      u.email === user.email ? { ...u, points: u.points + 10 } : u
    );
    localStorage.setItem("waitlist", JSON.stringify(updatedWaitlist));

    const updatedUser = { ...user, points: user.points + 10 };
    localStorage.setItem("waitlistUser", JSON.stringify(updatedUser));
    setUser(updatedUser);

    confetti();
  };

  return (
    <div className="bg-zinc-900 p-6 rounded-2xl mt-6">
      <h3 className="text-xl mb-2">Referral Points</h3>
      <p className="text-4xl font-bold text-green-400 mb-4">{user.points} pts</p>
      <button
        onClick={handleShare}
        className="bg-green-500 px-6 py-3 rounded-xl hover:scale-105 transition"
      >
        Share & Earn +10 Points
      </button>
    </div>
  );
}