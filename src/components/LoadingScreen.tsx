import React, { useState, useEffect } from 'react'

const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-red-500 flex flex-col items-center justify-center text-white z-50">
      <img 
        src="https://www.tgli.org/TGLI_Logo.png" 
        alt="TGLI" 
        className="w-24 h-24 mb-8 filter brightness-0 invert"
      />
      <h1 className="text-2xl font-bold mb-2">Toronto Global Leadership Institute</h1>
      <p className="text-red-100 mb-8">Empowering Communities, Building Leaders</p>
      
      <div className="w-64 bg-red-400 rounded-full h-2 mb-4">
        <div 
          className="bg-white h-2 rounded-full transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm text-red-100">Loading... {progress}%</p>
    </div>
  )
}

export default LoadingScreen