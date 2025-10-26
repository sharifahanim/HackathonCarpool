import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../utils/firebase";
import { doc, updateDoc } from "firebase/firestore";

function Preferences({ currentUser }) {
  const navigate = useNavigate();
  const [maxDistance, setMaxDistance] = useState(5);
  const [groupSize, setGroupSize] = useState(4);
  const [days, setDays] = useState([]);
  const [musicPreference, setMusicPreference] = useState("Any music");
  const [conversationLevel, setConversationLevel] = useState("Moderate conversation");
  const [smokingAllowed, setSmokingAllowed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDayToggle = (day) => {
    setDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = async () => {
    if (!currentUser) {
      alert("Please log in first.");
      return;
    }

    setLoading(true);
    try {
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        preferences: {
          maxDistance,
          groupSize,
          days,
          musicPreference,
          conversationLevel,
          smokingAllowed,
        },
      });

      console.log("✅ Preferences saved!");
      navigate("/matches"); // go to matches page next
    } catch (error) {
      console.error("❌ Error saving preferences:", error);
      alert("Error saving preferences. Check console for details.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-2xl p-8 w-[450px]">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Set Your Preferences
        </h1>

        <label className="block mt-4 font-medium">Maximum distance (miles)</label>
        <input
          type="range"
          min="1"
          max="20"
          value={maxDistance}
          onChange={(e) => setMaxDistance(Number(e.target.value))}
          className="w-full"
        />
        <p>{maxDistance} miles</p>

        <label className="block mt-4 font-medium">Maximum group size</label>
        <select
          value={groupSize}
          onChange={(e) => setGroupSize(Number(e.target.value))}
          className="border rounded-md p-2 w-full"
        >
          {[2, 3, 4, 5].map((size) => (
            <option key={size} value={size}>{size} people</option>
          ))}
        </select>

        <label className="block mt-4 font-medium">Preferred days</label>
        <div className="grid grid-cols-2 gap-2">
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
            <label key={day} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={days.includes(day)}
                onChange={() => handleDayToggle(day)}
              />
              <span>{day}</span>
            </label>
          ))}
        </div>

        <label className="block mt-4 font-medium">Music preference</label>
        <select
          value={musicPreference}
          onChange={(e) => setMusicPreference(e.target.value)}
          className="border rounded-md p-2 w-full"
        >
          <option>Any music</option>
          <option>Pop</option>
          <option>Classical</option>
          <option>Lo-fi</option>
          <option>Silence</option>
        </select>

        <label className="block mt-4 font-medium">Conversation level</label>
        <select
          value={conversationLevel}
          onChange={(e) => setConversationLevel(e.target.value)}
          className="border rounded-md p-2 w-full"
        >
          <option>Quiet</option>
          <option>Moderate conversation</option>
          <option>Talkative</option>
        </select>

        <div className="flex items-center space-x-2 mt-4">
          <input
            type="checkbox"
            checked={smokingAllowed}
            onChange={() => setSmokingAllowed(!smokingAllowed)}
          />
          <span>Smoking allowed in car</span>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white mt-6 w-full py-2 rounded-md"
        >
          {loading ? "Saving..." : "Find Matches"}
        </button>
      </div>
    </div>
  );
}

export default Preferences;
