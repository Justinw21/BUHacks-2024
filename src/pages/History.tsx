import { db } from '@/firebase/firebaseConfig'
import { useState, useEffect } from 'react'
import { Check } from 'lucide-react'
import BottomNavbar from '@/components/ui/navbar'

import { collection, getDocs } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const getStreakFromFirebase = () => {
  return new Promise<number>((resolve) => {
    setTimeout(() => resolve(4), 1000)
  })
}


import { collection, getDocs, doc, getDoc } from 'firebase/firestore'
import { getAuth, User } from 'firebase/auth'
import { getDay, subDays, format } from 'date-fns'


export default function ActivityScreen() {
  const [streak, setStreak] = useState<number | null>(null)
  const [userId, setUserId] = useState("")
  const [userHistory, setUserHistory] = useState<{ id: string; date?: string; type?: string; icon?: string; backgroundColor?: string; timestamp?: any; name?: string }[] | null>(null)

  useEffect(() => {

    const getCurrentUser = async () => {
      const auth = getAuth()
      const user = auth.currentUser
      if (user) {
        setUserId(user.uid)

        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        if(userDoc.exists()){
          const userInfo = userDoc.data()
          setStreak(userInfo.streaks)
        }

      } else {
        console.log('No user is signed in')
      }
    }

    getCurrentUser()


    //getStreakFromFirebase(user).then(setStreak)


    getStreakFromFirebase().then(setStreak)
    //getStreakFromFirebase(user).then(setStreak)

  }, [])

  useEffect(() => {
    if (!userId) return

    const fetchHistory = async () => {
      try {
        const data = await getUserHistory(userId)
        if (data) {
          const filteredData = data.filter((item) => item.id !== 'emptyHistory')
          setUserHistory(filteredData)
          console.log(filteredData)
        }
      } catch (err) {
        console.error('Failed to load history', err)
      }
    }

    fetchHistory()
  }, [userId])

  const getUserHistory = async (userId: string) => {
    try {
      const historyCollectionRef = collection(db, 'users', userId, 'history')
      const historySnapshot = await getDocs(historyCollectionRef)
      const historyData = historySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      return historyData
    } catch (error) {
      console.error('Error fetching user history:', error)
      throw error
    }
  }


  const days = [
    { day: 'S', date: '27', completed: false },
    { day: 'M', completed: true},
    { day: 'T', completed: true },
    { day: 'W', completed: true },
    { day: 'T', completed: true },
    { day: 'F', completed: true },


    { day: 'S', date: '2', completed: false }


  ]

  const getIconAndBackgroundColor = (type: string) => {
    if (type === 'Journal') {
      return { icon: '/public/journal.png', backgroundColor: 'bg-[#E5F6F6]' }
    } else if (type === 'Meditation') {
      return { icon: '/public/meditate.png', backgroundColor: 'bg-[#FFE5E5]' }
    } else if (type === 'Cardio') {
      return { icon: '/public/run.png', backgroundColor: 'bg-[#F0EBF8]' }
    } else if (type === 'Yoga') {
      return { icon: '/public/yoga.png', backgroundColor: 'bg-[#E8F5E9]' }
    } else {
      return { icon: '/public/default.png', backgroundColor: 'bg-blue-50' }
    }
  }

  const formatTimestamp = (timestamp: any) => {
    if (!timestamp) return ''
    const date = new Date(timestamp.seconds * 1000)
    return date.toLocaleString()
  }

  return (
    <div className="min-h-screen bg-white pb-16">
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center mb-8">
          <img src="fire.png" alt="Flame icon" className="w-16 h-16 mb-4" />
          <div className="text-center">
            <div className="text-7xl font-serif mb-2">
              {streak !== null ? streak : '...'}
            </div>
            <div className="text-2xl font-serif">day streak</div>
          </div>
        </div>

        <div className="flex justify-between mb-12 px-4">
          {days.map((day, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-sm mb-2">{day.day}</div>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  day.completed ? 'bg-[#686EAD]' : 'bg-white'
                }`}
              >
                {day.completed ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <span className="text-sm">{day.date}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-serif mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {(userHistory || []).map((activity, index) => {
              const { icon, backgroundColor } = getIconAndBackgroundColor(activity.type || activity.name || '')

              return (
                <div
                  key={index}
                  className={`p-4 rounded-xl ${backgroundColor} flex items-center`}
                >
                  <div className="w-12 h-12 flex items-center justify-center">
                    <img src={icon} alt={`${activity.type || activity.name} icon`} className="w-12 h-12" />
                  </div>
                  <div className="ml-4">
                    <div className="text-lg">{activity.date || formatTimestamp(activity.timestamp)}</div>
                    <div className="text-gray-600">{activity.type || activity.name}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>

      <BottomNavbar />
    </div>
  )
}
