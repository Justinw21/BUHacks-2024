import { logOut } from "@/services/authServices";
import { useNavigate } from "react-router-dom";
import { db } from "@/firebase/firebaseConfig";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import CompletedActivity from "./CompletedActivity";
import BottomNavbar from "@/components/ui/navbar";

function Meditation() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);
  const [isActive, setIsActive] = useState(false);
  const [userId, setUserId] = useState("");
  const [activityCompleted, setActivityCompleted] = useState<boolean | null>(null);

  useEffect(() => {
    const checkActivityCompletion = async () => {
      const today = new Date().toISOString().split("T")[0];
      const q = query(collection(db, "users", userId, "history"), where("timestamp", "==", today));
      const querySnapshot = await getDocs(q);
      setActivityCompleted(!querySnapshot.empty);
    };

    if (userId) checkActivityCompletion();
  }, [userId]);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserId(user.uid);
      getCurrentUser();
    }
  }, [auth]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft((prevTime) => prevTime - 1), 1000);
    } else if (timeLeft === 0) {
      addToHistory();
      setIsActive(false);
      setActivityCompleted(true);
      setTimeLeft(300);
    }
    return () => clearTimeout(timer);
  }, [isActive, timeLeft]);

  const addToHistory = async () => {
    const activity = { name: "Meditation", timestamp: new Date().toISOString().split("T")[0] };
    await setDoc(doc(db, "users", userId, "history", `${Date.now()}`), activity);
  };

  const getCurrentUser = async () => {
    const user = auth.currentUser;
    if (user) {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) setName(userDoc.data().name);
    }
  };

  const handleSignOut = async () => {
    await logOut();
    navigate("/");
  };

  const handleStart = () => setIsActive(true);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const progress = (timeLeft / 300) * circumference;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-100 to-blue-100 text-gray-800">
      {activityCompleted === null ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-400"></div>
        </div>
      ) : activityCompleted ? (
        <CompletedActivity />
      ) : (
        <div className="flex flex-col items-center text-center max-w-lg w-full px-4 space-y-20">
          {/* Header Section */}
          <div className={`${!isActive ? "opacity-100" : "opacity-0"} transition-opacity duration-1000 ease-out`}>
            <p className="text-4xl font-semibold mt-0 text-pink-600">
              Hi, <span className="text-[#686EAD]">{name}</span>
            </p>
            <p className="text-2xl text-gray-600 mt-4 mb-4">Let's Meditate</p>
            <button
              onClick={handleSignOut}
              className="mt-0 text-sm text-gray-800 bg-blue-200 hover:bg-blue-300 py-2 px-4 rounded-full transition duration-300"
            >
              Sign Out
            </button>
            <img src="meditate.png" alt="Meditate" className="w-64 h-64 mt-5 rounded-lg " />
          </div>

          {/* Timer Section */}
          <div className={`${
                    isActive ? 'scale-150  w-screen h-screen fixed inset-0 flex items-center justify-center pb-64 ' : 'scale-100'
                } transition-transform duration-700 ease-out   p-0 rounded-lg`}>
            <div className="relative flex items-center justify-center mb-0 mt-0">
              <svg width="220" height="220" className="absolute">
                <circle cx="110" cy="110" r={radius} fill="none" stroke="#f0e4f3" strokeWidth="12" />
                <circle
                  cx="110"
                  cy="110"
                  r={radius}
                  fill="none"
                  stroke="#ffb3ba"
                  strokeWidth="12"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference - progress}
                  strokeLinecap="round"
                  className="transition-all duration-300 ease-out"
                />
              </svg>
              <span className="text-4xl font-mono text-gray-700">{formatTime(timeLeft)}</span>
            </div>
          </div>

          {/* Get Started Button */}
          <button
            onClick={handleStart}
            disabled={isActive}
            className="mt-4 px-8 py-4 bg-pink-400 text-white rounded-full shadow-lg hover:bg-pink-500 transition-all duration-300 disabled:opacity-50"
          >
            {isActive ? "Meditation in Progress" : "Get Started"}
          </button>
        </div>
      )}
      <BottomNavbar />
    </div>
  );
}

export default Meditation;
