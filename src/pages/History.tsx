
import { useState, useEffect } from 'react'
import { Check} from 'lucide-react'
import BottomNavbar from '@/components/ui/navbar'
// Simulating a Firebase call
const getStreakFromFirebase = () => {
  return new Promise<number>((resolve) => {
    setTimeout(() => resolve(4), 1000) // Simulating a 1-second delay
  })
}

export default function ActivityScreen() {
  const [streak, setStreak] = useState<number | null>(null)

  useEffect(() => {
    getStreakFromFirebase().then(setStreak)
  }, [])

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
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl ${activity.backgroundColor} flex items-center`}
              >
                {activity.icon && (
                  <div className="w-12 h-12 flex items-center justify-center">
                    <img src={activity.icon} alt={`${activity.type} icon`} className="w-18 h-16" />
                  </div>
                )}
                <div className="ml-4">
                  <div className="text-lg">{activity.date}</div>
                  <div className="text-gray-600">{activity.type}</div>
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

