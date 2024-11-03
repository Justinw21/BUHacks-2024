import { logOut } from "@/services/authServices";

import { useNavigate} from 'react-router-dom';

import { db } from "@/firebase/firebaseConfig";
import { getAuth } from 'firebase/auth';
import { doc, getDoc , setDoc , collection, query, where, getDocs} from 'firebase/firestore';
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button";
import CompletedActivity from "./CompletedActivity";



import BottomNavbar from "@/components/ui/navbar";

function Journal() {

    const auth = getAuth();
    const navigate = useNavigate();
    const [name, setName] = useState ("")
    const [timeLeft, setTimeLeft] = useState(20); 
    const [isActive, setIsActive] = useState(false);
    const [userId, setUserId] = useState("");

    const [activityCompleted, setActivityCompleted] = useState<boolean | null>(null);

    const [entry, setEntry] = useState<string>('');
    const [isJournaling, setIsJournaling] = useState(false);

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
        console.log("hello")
        try {
          const activity = {
            name: "Journal",
            entry: entry, 
            timestamp: new Date().toISOString().split('T')[0],

          };
          // Create a document in the history collection for the user
          await setDoc(doc(db, 'users', userId, 'history', `${Date.now()}`), activity);
          setActivityCompleted(true)
          console.log("Activity added to history:", activity);
        } catch (error) {
          console.error("Error adding activity to history:", error);
        }
      };

    
    
    const getCurrentUser = async () => {
        const user = auth.currentUser; 
        
        
      
        if (user) {
            
          try {
            
            const userRef = doc(db, 'users', user.uid); 
            const userDoc = await getDoc(userRef); // Fetch the user document

      
            if (userDoc.exists()) {
                const user = userDoc.data()

                setName(user.name)
              return { id: userDoc.id, ...userDoc.data() }; // Return user data
            } else {
              console.log('No such user document!');
              return null; // User document does not exist
            }
          } catch (error) {
            console.error('Error fetching user data: ', error);
            throw error; // Handle errors as needed
          }
        } else {
          console.log('No user is signed in');
          return null; // No user is signed in
        }
      };
      getCurrentUser()

  const handleSignOut = async () => {
    await logOut();
    navigate("/signin");
  };

  const clearEntry = () => {
    setEntry('');
};
const handleStartJournaling = () => {
    setIsJournaling(true);
  };


    return (
        <div className="flex flex-col justify-center items-center w-full">
            {activityCompleted === null ? (
                <p>Loading...</p>
            ) : activityCompleted ? (
                <CompletedActivity/>
            ) : (

            <div>

            
                <p className="text-4xl mt-10 ">Hi <span className="font-bold">{name},</span></p>
                <p className="text-[24px]">Let's Journal</p>


                <button onClick={handleSignOut}>
                    Sign Out
                </button>
                <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-4">Daily Journal</h1>
            <div className="flex flex-col mb-4">
           
            {!isJournaling ? (

        <button
          onClick={handleStartJournaling}
          className="flex justify-center items-center w-[300px] h-[450px] text-white bg-[#B7AFDF] rounded hover:bg-blue-700 transition duration-300  "
        >
          Let's Journal +
        </button>
      ) : (
        <div className="w-full max-w-md">
            <p>What is one thing you accomplished yesterday that you are proud of?</p>
          <textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="Write your journal entry here..."
            className="w-full h-60 p-2 border rounded"
          />
          <Button
            onClick={addToHistory}
            className="mt-4 px-4 py-2 text-white rounded hover:bg-green-700 transition duration-300"
          >
            Save Entry
          </Button>
        </div>
      )}

             
        
      
            </div>
            
        </div>
                


            

            </div>

)}
                


            <BottomNavbar />
      
        </div>
  );
}

export default Journal;
