


import BottomNavbar from "@/components/ui/navbar";

import { db } from "@/firebase/firebaseConfig";
import { getAuth } from 'firebase/auth';
import { doc, getDoc , setDoc } from 'firebase/firestore';
import { useState, useEffect } from "react"

import Meditation from "@/activities/Meditation";


function Homepage() {

    const auth = getAuth();
    const [name, setName] = useState ("")
    const [timeLeft, setTimeLeft] = useState(20); 
    const [isActive, setIsActive] = useState(false);
    const [userId, setUserId] = useState("");


    
    

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


    const [activity, setActivity] = useState(getTodaysActivity())

    
    
    const getCurrentUser = async () => {
        const user = auth.currentUser; 
        
        
      
        if (user) {
            
          try {
            
            const userRef = doc(db, 'users', user.uid); 
            const userDoc = await getDoc(userRef); 
            console.log(userDoc)
      
            if (userDoc.exists()) {
                const user = userDoc.data()
                console.log(user.name)
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



    return (
        <div className="flex flex-col justify-center items-center">
            {activity === 'meditate' ? <Meditation /> : 
            
            <h1>Other Activity Page</h1>}
                


            <BottomNavbar />
      
        </div>
  );
}

export default Homepage;
