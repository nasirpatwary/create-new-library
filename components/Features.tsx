"use client"
import dynamic from 'next/dynamic'
 
const TimeLine = dynamic(() => import('../components/TimeLine'), { ssr: false })
 
export default function Features() {
  return (
    <div>
      <TimeLine />
    </div>
  )
}