'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function DashboardLink() {
  const pathname = usePathname()
  
  if (pathname === '/dashboard') {
    return null
  }

  return (
    <Link 
      href="/dashboard"
      className="flex items-center gap-2 bg-[#bc7fff] hover:bg-[#bc7fff]/90 text-[#1e0539] font-semibold py-2 px-4 rounded-md transition duration-200 shadow-lg hover:shadow-[#bc7fff]/25 hover:shadow-xl"
    >
      <span className="material-symbols-outlined text-lg">dashboard</span>
      Dashboard
    </Link>
  )
}