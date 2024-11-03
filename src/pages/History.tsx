import { db } from '@/firebase/firebaseConfig'
import { useState, useEffect } from 'react'
import { Check} from 'lucide-react'
import BottomNavbar from '@/components/ui/navbar'
import { collection, getDocs, doc , getDoc} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// Simulating a Firebase call
const getStreakFromFirebase = () => {
  return new Promise<number>((resolve) => {
    setTimeout(() => resolve(4), 1000) // Simulating a 1-second delay
  })
}

export default function History() {
  const [streak, setStreak] = useState<number | null>(null)
  const [userId, setUserId] = useState("");
  const [userHistory, setUserHistory] = useState<{ id: string }[] | null>(null);

  useEffect(() => {
    
    getCurrentUser() 
    getStreakFromFirebase().then(setStreak)
  }, [userId])




  

  useEffect(() => {
    console.log("hello")
    const fetchHistory = async () => {
      try {
          const data = await getUserHistory(userId);
          if (data) {
            const filteredData = data.filter(item => item.id !== 'emptyHistory');
            setUserHistory(filteredData)
            console.log(filteredData)

          }
          
      } catch (err) {
          console.error('Failed to load history')
      } finally {
          console.log("done")
      }
  };

  fetchHistory();
  }, [userId])

  const getUserHistory = async (userId: string) => {
    try {
        const historyCollectionRef = collection(db, 'users', userId, 'history');
        const historySnapshot = await getDocs(historyCollectionRef);
        
        const historyData = historySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return historyData;
    } catch (error) {
        console.error("Error fetching user history:", error);
        throw error; 
    }
};

  const getCurrentUser = async () => {
    const auth = getAuth();
    const user = auth.currentUser; 
    
    
  
    if (user) {
        
      setUserId(user.uid)
    } else {
      console.log('No user is signed in');
      return null; 
    }
  };
  

  const days = [
    { day: 'M', completed: true },
    { day: 'T', completed: true },
    { day: 'W', completed: true },
    { day: 'T', completed: true },
    { day: 'F', completed: true },
    { day: 'S', date: '2', completed: false },
    { day: 'S', date: '3', completed: false },
  ]

  const recentActivities = [
    {
      date: '9/29/24',
      type: 'Cardio',
      icon: 'run.png',
      backgroundColor: 'bg-[#E5F6F6]',
    },
    {
      date: '9/29/24',
      type: 'Meditation',
      icon: 'meditation.png',
      backgroundColor: 'bg-[#FFE5E5]',
    },
  ]

  const formatTimestamp = (timestamp:any) => {
    if (!timestamp) return '';
    const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
    return date.toLocaleString(); // Format to a local string (customize as needed)
};

  return (
    <div className="min-h-screen bg-white pb-16">
      <main className="container mx-auto px-4 py-8">
        {/* Streak Section */}
        <div className="flex flex-col items-center mb-8">
          <img src="fire.png" alt="Flame icon" className="w-16 h-16 mb-4" />
          <div className="text-center">
            <div className="text-7xl font-serif mb-2">
              {streak !== null ? streak : '...'}
            </div>
            <div className="text-2xl font-serif">day streak</div>
          </div>
        </div>

        {/* Calendar Section */}
        <div className="flex justify-between mb-12 px-4">
          {days.map((day, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-sm mb-2">{day.day}</div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center 
                ${day.completed ? 'bg-[#686EAD]' : 'bg-white'}`}>
                {day.completed ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <span className="text-sm">{day.date}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-serif mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {userHistory &&userHistory!.map((activity, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl bg-blue-50 flex items-center`}
              >
                
                  <div className="w-12 h-12 flex items-center justify-center">
                    <img src={"/src/assets/run.png"} alt={`meditation icon`} className="w-18 h-16" />
                  </div>
                
                <div className="ml-4">
                  <div className="text-lg">{activity.name}</div>
                  <div className="text-gray-600">{formatTimestamp(activity.timestamp)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavbar></BottomNavbar>
    </div>
  )
}

