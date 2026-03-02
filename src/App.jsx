import { useState, useEffect } from "react";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load last registered user from localStorage
    const savedUser = localStorage.getItem("waitlistUser");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  return (
    <div>
      {!user ? (
        <Welcome setUser={setUser} />
      ) : (
        <Dashboard user={user} setUser={setUser} />
      )}
    </div>
  );
}

export default App;