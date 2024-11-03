import BottomNavbar from "@/components/ui/navbar";
import { db } from '@/firebase/firebaseConfig';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

function Friends() {
  const [userId, setUserId] = useState("");
  const [friends, setFriends] = useState<{ id: string, name?: string, activity?: string }[] | null>(null);
  const [entry, setEntry] = useState(""); // Added state for friend entry

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
      
      <div className="space-y-4 max-w-md mx-auto"> {/* Container with fixed max width for uniformity */}
        {friends && friends.map((friend) => (
          <div
            key={friend.id}
            className="p-4 rounded-xl bg-blue-50 flex items-center w-full shadow-md"
          >
            <div className="w-20 h-20 flex items-center justify-center">
              <img src="/bowie.png" alt="friend icon" className="w-full h-full object-cover rounded-full" />
            </div>
            <div className="ml-4 flex-grow">
              <div className="text-lg font-semibold">{friend.name}</div>
              <div className="text-gray-800">
              <span className="font-semibold">Currently on:</span> {friend.activity || 'No recent activity'}</div>

            </div>
          </div>
        ))}

        {/* Add Friend Section */}
        <div className="text-left p-4 rounded-xl bg-blue-50 w-full shadow-md"> {/* Left-aligned box with same styling */}
          <p className="text-[17px] font-bold text-gray-700 mb-2">
            Add a friend!
          </p>
          <textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="Enter friend's name or ID..."
            className="w-full h-10 p-2 rounded-md mb-2 border border-gray-300"
          />
          <button
            onClick={() => console.log("Send Friend Request clicked")}
            className="w-full py-2 bg-[#B7AFDF] font-bold text-[15px] text-white rounded-md hover:bg-green-700 transition duration-300">
            Send Request!
          </button>
        </div>
      </div>

      <BottomNavbar />
    </div>
  );
}

export default Friends;