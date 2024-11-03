import BottomNavbar from "@/components/ui/navbar";
import { db } from '@/firebase/firebaseConfig'
import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

function Friends() {
  const [userId, setUserId] = useState("");
  const [friends, setFriends] = useState<{ id: string, name: string, activity: string }[] | null>(null);

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchFriends();
    }
  }, [userId]);

  const getCurrentUser = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUserId(user.uid);
    } else {
      console.log("No user is signed in");
    }
  };

  const fetchFriends = async () => {
    try {
      const friendsData = await getUserFriends(userId);
      setFriends(friendsData);
    } catch (error) {
      console.error("Error fetching friends list:", error);
    }
  };

  const getUserFriends = async (userId: string) => {
    try {
      const friendCollectionRef = collection(db, 'users', userId, 'friends');
      const friendSnapshot = await getDocs(friendCollectionRef);
      
      const friendData = friendSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      return friendData;
    } catch (error) {
      console.error("Error fetching friends:", error);
      throw error;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-serif mb-4">Friends List</h2>
      <div className="space-y-4">
        {friends && friends.map((friend, index) => (
          <div
            key={index}
            className="p-4 rounded-xl bg-blue-50 flex items-center"
          >
            <div className="w-24 h-24 flex items-center justify-center">
              <img src={"/public/bowie.png"} alt="friend icon" className="w-24 h-24" />
            </div>
            <div className="ml-4">
              <div className="text- font-semibold">{friend.name}</div>
              <div className="text-gray-800">{friend.activity || 'No recent activity'}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <BottomNavbar />
    </div>
  );
}

export default Friends;