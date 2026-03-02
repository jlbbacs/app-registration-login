// src/utils/waitlistLogic.js
export const calculatePosition = (userEmail) => {
  // Get the current waitlist from localStorage
  const waitlist = JSON.parse(localStorage.getItem("waitlist") || "[]");

  if (waitlist.length === 0) return 1;

  // Sort users by points descending, then by registration order
  const sorted = [...waitlist].sort((a, b) => {
    if (b.points === a.points) return 0; // keep original order for same points
    return b.points - a.points; // higher points first
  });

  // Find the user's index
  const position = sorted.findIndex((u) => u.email === userEmail) + 1;

  return position;
};