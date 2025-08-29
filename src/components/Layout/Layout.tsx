import React, { ReactNode } from 'react'
import Header from './Header'
import BottomNavigation from './BottomNavigation'
import AIChat from '../AIChat/AIChat'

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-16 pb-28">
        {children}
      </main>
      <BottomNavigation />
      <AIChat />
    </div>
  )
}

export default Layout