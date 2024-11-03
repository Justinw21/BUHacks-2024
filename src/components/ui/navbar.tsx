import React from 'react'
import { Users, Home, Clock } from 'lucide-react'

export default function BottomNavbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#686EAD] py-2">
      <div className="container mx-auto max-w-sm px-4">
        <div className="flex justify-between items-center">
          <NavButton href="/friends" icon={<Users />} label="Friends" />
          <NavButton href="/homepage" icon={<Home />} label="Home" />
          <NavButton href="/history" icon={<Clock />} label="History" />
        </div>
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
      className="flex flex-col items-center justify-center text-white hover:text-purple-100 transition-colors duration-200 px-2 py-1"
    >
      {React.cloneElement(icon as React.ReactElement, {
        className: 'w-5 h-5 mb-1',
        'aria-hidden': true,
      })}
      <span className="text-xs">{label}</span>
      <span className="sr-only">{label}</span>
    </a>
  )
}