import { logOut } from "@/services/authServices";

import { useNavigate} from 'react-router-dom';

import { db } from "@/firebase/firebaseConfig";
import { getAuth } from 'firebase/auth';
import { doc, getDoc , setDoc } from 'firebase/firestore';
import { useState, useEffect } from "react"

import Meditation from "@/activities/Meditation";



import BottomNavbar from "@/components/ui/navbar";

function Homepage() {

    const auth = getAuth();
    const [name, setName] = useState ("")
    const [timeLeft, setTimeLeft] = useState(20); 
    const [isActive, setIsActive] = useState(false);
    const [userId, setUserId] = useState("");


    useEffect(() => {
        console.log(activity)
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
            setIsActive(false); // Optionally stop the timer
          }
    
        return () => clearTimeout(timer); // Clean up on component unmount or reset
      }, [isActive, timeLeft]);
    

    const getTodaysActivity = () => {
        const today = new Date().toISOString().split('T')[0];
        
        const seed = parseInt(today.replace(/-/g, ''), 10);
       
        const randomNum = seed % 3;
        console.log(randomNum)
        if (randomNum == 0) {
           
            return "meditate"
        }
        if (randomNum == 1) {
       
            return "journal"
        }
        if (randomNum == 2) {
            
            return "jog"
        }
    }

    const addToHistory = async () => {
        try {
          const activity = {
            name: "Meditation",
            timestamp: new Date().toISOString(),
          };
          // Create a document in the history collection for the user
          await setDoc(doc(db, 'users', userId, 'history', `${Date.now()}`), activity);
          console.log("Activity added to history:", activity);
        } catch (error) {
          console.error("Error adding activity to history:", error);
        }
      };

    const [activity, setActivity] = useState(getTodaysActivity())

    
    
    const getCurrentUser = async () => {
        const user = auth.currentUser; 
        
        
      
        if (user) {
            
          try {
            
            const userRef = doc(db, 'users', user.uid); 
            const userDoc = await getDoc(userRef); // Fetch the user document
            console.log(userDoc)
      
            if (userDoc.exists()) {
                const user = userDoc.data()
                console.log(user.name)
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



    return (
        <div className="flex flex-col justify-center items-center">
            {activity === 'meditate' ? <Meditation /> : 
            
            <h1>Other Activity Page</h1>}
                


            <BottomNavbar />
      
        </div>
  );
}

export default Homepage;
