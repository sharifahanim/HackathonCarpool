import { db } from "../utils/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function generateMatches(currentUserId) {
  const querySnapshot = await getDocs(collection(db, "users"));
  const users = [];

  querySnapshot.forEach((doc) => {
    const userData = doc.data();
    if (userData.id !== currentUserId) {
      users.push(userData);
    }
  });

  // Example: filter users within 5 miles
  const nearbyUsers = users.filter(u => u.distance <= 5);
  return nearbyUsers;
}
