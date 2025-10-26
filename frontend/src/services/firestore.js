import { db } from "../utils/firebase";
import { doc, setDoc, collection, getDocs, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { geocodeAddress, findNearbyUsers } from "./googleMaps";

export const handleSave = async ({ fullName, homeAddress, workAddress, workStartTime, workEndTime, canDrive }) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    alert("Please log in first!");
    return;
  }

  try {
    // Geocode addresses to get coordinates
    let homeCoords = null;
    let workCoords = null;

    if (homeAddress) {
      try {
        homeCoords = await geocodeAddress(homeAddress);
        console.log("✅ Home address geocoded:", homeCoords);
      } catch (error) {
        console.error("❌ Error geocoding home address:", error);
        // Continue without coordinates - app will still work
      }
    }

    if (workAddress) {
      try {
        workCoords = await geocodeAddress(workAddress);
        console.log("✅ Work address geocoded:", workCoords);
      } catch (error) {
        console.error("❌ Error geocoding work address:", error);
        // Continue without coordinates - app will still work
      }
    }

    // ✅ Each user has their own document, using UID as ID
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      name: fullName,
      homeAddress,
      workAddress,
      workStartTime,
      workEndTime,
      canDrive,
      coordinates: {
        home: homeCoords,
        work: workCoords
      },
      updatedAt: new Date(),
    });
    console.log("✅ User profile saved with coordinates!");
  } catch (error) {
    console.error("❌ Error saving profile:", error);
  }
};

export async function generateMatches(currentUserId) {
  try {
    // Get current user data
    const currentUserDoc = await getDoc(doc(db, "users", currentUserId));
    if (!currentUserDoc.exists()) {
      throw new Error("Current user not found");
    }
    
    const currentUser = currentUserDoc.data();

    // Get all other users
    const querySnapshot = await getDocs(collection(db, "users"));
    const allUsers = [];

    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      if (userData.uid !== currentUserId) {
        allUsers.push({
          id: doc.id,
          ...userData
        });
      }
    });

    // If user has coordinates, use distance-based matching
    if (currentUser.coordinates?.home) {
      const maxDistance = currentUser.preferences?.maxDistance || 5;
      const nearbyUsers = findNearbyUsers(
        currentUser.coordinates.home,
        allUsers.filter(u => u.coordinates?.home),
        maxDistance
      );
      nearbyUsers.sort((a, b) => a.distance - b.distance);
      console.log(`✅ Found ${nearbyUsers.length} matches within ${maxDistance} miles`);
      return nearbyUsers;
    } else {
      // Fallback: return all users as potential matches (no distance filtering)
      console.log(`⚠️ No coordinates available, showing ${allUsers.length} potential matches`);
      return allUsers.map(user => ({
        ...user,
        distance: 'Unknown',
        isFallback: true
      }));
    }
  } catch (error) {
    console.error("❌ Error generating matches:", error);
    throw error;
  }
}
