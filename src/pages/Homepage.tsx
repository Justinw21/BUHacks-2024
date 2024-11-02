import { logOut } from "@/services/authServices";

import { useNavigate} from 'react-router-dom';

import BottomNavbar from '@/components/ui/navbar';
import { db } from "@/firebase/firebaseConfig";
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useState } from "react";



import BottomNavbar from "@/components/ui/navbar";

function Homepage() {

    const auth = getAuth();
    const navigate = useNavigate();
    const [name, setName] = useState ("")
    
    const getCurrentUser = async () => {
        const user = auth.currentUser; // Get the current user
        
      
        if (user) {
          try {
            console.log(user.uid)
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

  const handleSignOut = async () => {
    await logOut();
    navigate("/signin");
  };

    return (
        <div>
            <h2>Home Page</h2>
            <p>Hi {name}</p>


            <button onClick={handleSignOut}>
      Sign Out
    </button>


      <button onClick={handleSignOut}>Sign Out</button>

      <BottomNavbar />
    </div>
  );
}

export default Homepage;
