import React from 'react'
import { Users, Home, Clock } from 'lucide-react'

export default function BottomNavbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-purple-300 py-2">
      <div className="container mx-auto flex justify-around items-center">
        <NavButton href="/friends" icon={<Users />} label="Friends" />
        <NavButton href="/" icon={<Home />} label="Home" />
        <NavButton href="/history" icon={<Clock />} label="History" />
      </div>
    </nav>
  )
}

type NavButtonProps = {
  href: string
  icon: React.ReactNode
  label: string
}

function NavButton({ href, icon, label }: NavButtonProps) {
  return (
    <a
      href={href}
      className="flex flex-col items-center justify-center text-white hover:text-purple-100 transition-colors duration-200 px-4 py-2"
    >
      {React.cloneElement(icon as React.ReactElement, {
        className: 'w-7 h-7 mb-1',
        'aria-hidden': true,
      })}
      <span className="text-xs">{label}</span>
      <span className="sr-only">{label}</span>
    </a>
  )
}