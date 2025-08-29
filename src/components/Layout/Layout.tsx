import React, { ReactNode } from 'react'
import TopNavigation from './TopNavigation'
import BottomNavigation from './BottomNavigation'

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation />
      <main className="pt-16 pb-20">
        {children}
      </main>
      <BottomNavigation />
    </div>
  )
}

export default Layout