import { logOut } from "@/services/authServices";

import { useNavigate} from 'react-router-dom';

import { db } from "@/firebase/firebaseConfig";
import { getAuth } from 'firebase/auth';
import { doc, getDoc , setDoc , collection, query, where, getDocs} from 'firebase/firestore';
import { useState, useEffect } from "react"
import CompletedActivity from "./CompletedActivity";



import BottomNavbar from "@/components/ui/navbar";

function Cardio() {

    const auth = getAuth();
    const navigate = useNavigate();
    const [name, setName] = useState ("")
    const [timeLeft, setTimeLeft] = useState(300); 
    const [isActive, setIsActive] = useState(false);
    const [userId, setUserId] = useState("");

    const [activityCompleted, setActivityCompleted] = useState<boolean | null>(null);

    useEffect(() => {
        const checkActivityCompletion = async () => {
          const today = new Date();
          const dateString = today.toISOString().split('T')[0]; 

          const q = query(
            collection(db, 'users', userId, 'history'), 
            where('timestamp', '==', dateString)
          );
    
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            setActivityCompleted(true);
          } else {

            setActivityCompleted(false);
          }
        };
    
        checkActivityCompletion();
      }, [userId]);


    useEffect(() => {
        let timer: NodeJS.Timeout;
        const user = auth.currentUser; 
        if (user) {
            setUserId(user.uid)

        }
        
    
        if (isActive && timeLeft > 0) {
          timer = setTimeout(() => {
            setTimeLeft((prevTime) => prevTime - 1);
          }, 1000);
        } else if (timeLeft === 0) {
            // When the timer hits zero, add to history
            addToHistory();
            setIsActive(false);
            setActivityCompleted(true)
            setTimeLeft(300) // Optionally stop the timer
          }
    
        return () => clearTimeout(timer); // Clean up on component unmount or reset
      }, [isActive, timeLeft]);
    
    const addToHistory = async () => {
        try {
          const activity = {
            name: "Cardio",
            timestamp: new Date().toISOString().split('T')[0],
          };
         
          await setDoc(doc(db, 'users', userId, 'history', `${Date.now()}`), activity);
          console.log("Activity added to history:", activity);
        } catch (error) {
          console.error("Error adding activity to history:", error);
        }
      };

    //const [activity] = useState(getTodaysActivity())
    const handleStart = () => {

        setIsActive(true);
        
      };

      const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
      };
    
    
    const getCurrentUser = async () => {
        const user = auth.currentUser; 
        
        
      
        if (user) {
            
          try {
            
            const userRef = doc(db, 'users', user.uid); 
            const userDoc = await getDoc(userRef); 

      
            if (userDoc.exists()) {
                const user = userDoc.data()

                setName(user.name)
              return { id: userDoc.id, ...userDoc.data() }; 
            } else {
              console.log('No such user document!');
              return null; 
            }
          } catch (error) {
            console.error('Error fetching user data: ', error);
            throw error; 
          }
        } else {
          console.log('No user is signed in');
          return null; 
        }
      };
      getCurrentUser()

  const handleSignOut = async () => {
    await logOut();
    navigate("/");
  };

  const radius = 90; 
  const circumference = 2 * Math.PI * radius;
  const progress = (timeLeft / 300) * circumference;

    return (
        <div className="flex flex-col justify-center items-center">
            {activityCompleted === null ? (
                <p>Loading...</p>
            ) : activityCompleted ? (
                <CompletedActivity/>
            ) : (

            <div className="flex flex-col justify-center items-center">
                <div className={`${
                    !isActive ? 'opacity-100' : 'opacity-0'
                } transition-opacity duration-1000 ease-out  flex justify-center flex-col items-center p-8 rounded-lg`}>

                <p className="text-4xl  mt-10">Hi <span className="font-bold">{name},</span></p>
                <p className="text-[24px]">Let's Walk</p>


                <button className="mb-10" onClick={handleSignOut}>
                    Sign Out
                </button>
                
                </div>
                <div className={`${
                    isActive ? 'scale-150 w-screen h-screen fixed inset-0 flex items-center justify-center ' : 'scale-100'
                } transition-transform duration-700 ease-out   p-8 rounded-lg`}>

                    <div className="relative flex items-center justify-center">
                        <svg width="220" height="220" className="absolute">
                        <circle
                            cx="110"
                            cy="110"
                            r={radius}
                            fill="none"
                            stroke="#e5e7eb" 
                            strokeWidth="12"
                        />
                        <circle
                            cx="110"
                            cy="110"
                            r={radius}
                            fill="none"
                            stroke="#B7AFDF" 
                            strokeWidth="12"
                            strokeDasharray={circumference}
                            strokeDashoffset={circumference - progress}
                            strokeLinecap="round"
                            className="transition-stroke"
                        />
                        </svg>

                        <span className="text-4xl font-mono">
                        {formatTime(timeLeft)}
                        </span>
                    </div>
                </div>


                <button
                    onClick={handleStart}
                    disabled={isActive}
                    hidden={isActive}
                    className={`${
                        isActive ? "hidden": 'mt-40'}'flex justify-center items-center px-6 py-3 bg-[#78BBD7] text-white rounded-lg shadow-lg hover:bg-[#686EAD] disabled:opacity-50 mt-20 mb-20`}
                >
                    {isActive ? "In Progress" : "Get Started"}
                </button>

            </div>

)}
                


            <BottomNavbar />
      
        </div>
  );
}

export default Cardio;