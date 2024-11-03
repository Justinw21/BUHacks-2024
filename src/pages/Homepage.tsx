





import BottomNavbar from "@/components/ui/navbar";

import { db } from "@/firebase/firebaseConfig";
import { getAuth } from 'firebase/auth';

import { doc, getDoc } from 'firebase/firestore';

import { useState} from "react"
import Journal from "@/activities/Journal";

import Meditation from "@/activities/Meditation";
import Cardio from "@/activities/Cardio";


function Homepage() {

    const auth = getAuth();



    
    

    const getTodaysActivity = () => {
        const today = new Date().toISOString().split('T')[0];
        
        
        const seed = parseInt(today.replace(/-/g, ''), 10);
       
        const randomNum = seed % 3;
        console.log(randomNum)
        console.log(seed)
        console.log(today)
        if (randomNum == 0) {
            console.log("meditate")
           
            return "meditate"
        }
        if (randomNum == 1) {
       
            return "jog"
        }
        if (randomNum == 2) {
            
            return "jog"
        }
    }


    const [activity] = useState(getTodaysActivity())

    
    
    const getCurrentUser = async () => {
        const user = auth.currentUser; 
        
        
      
        if (user) {
            
          try {
            
            const userRef = doc(db, 'users', user.uid); 
            const userDoc = await getDoc(userRef); 

      
            if (userDoc.exists()) {

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
        <div className="flex flex-col justify-center items-center w-full">
            {activity === 'meditate' ? <Meditation /> : 
            activity === 'journal'? <Journal/>:
            activity === 'jog'? <Cardio/>: 
            <h1>Other Activity Page</h1>
            
            }
                


            <BottomNavbar />
      
        </div>
  );
}

export default Homepage;
