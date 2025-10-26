import { db } from "../utils/firebase";
import { collection, addDoc } from "firebase/firestore";

const handleSave = async () => {
  setSaving(true);
  try {
    await addDoc(collection(db, "users"), {
      name: fullName,
      homeAddress,
      workAddress,
      workStartTime,
      workEndTime,
      canDrive,
      createdAt: new Date()
    });
    console.log("✅ User profile saved!");
  } catch (error) {
    console.error("❌ Error saving profile:", error);
  } finally {
    setSaving(false);
  }
};
