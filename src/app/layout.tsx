import { type Metadata } from 'next'
import KeeperLogo from '@/app/components/KeeperLogo'
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import DashboardLink from '@/app/components/DashboardLink'
import './globals.css'
import Link from 'next/link'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Keeper',
  description: 'Sleep is for humans, not for services!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <header className="flex items-center justify-between gap-4 pb-6 m-6">
            <div className="flex items-center gap-6">
              <div>
                <Link href="/">
                  <KeeperLogo width="200" height="60" />
                </Link>
              </div>
              <div className="text-[#bc7fff] text-md leading-normal tracking-wide">
                Sleep is for humans!
              </div>
            </div>
            <div className="flex justify-end items-center p-4 gap-4 h-16">
              <SignedOut>
                <SignInButton />
                <SignUpButton>
                  <button className="bg-[#bc7fff] hover:bg-[#bc7fff]/90 text-[#1e0539] font-semibold py-3 px-4 rounded-md transition duration-200 shadow-lg hover:shadow-[#bc7fff]/25 hover:shadow-xl cursor-pointer">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <DashboardLink />
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "!w-20 !h-20 !border-2 !border-solid !border-white/20",
                    }
                  }}
                />
              </SignedIn>
            </div>
          </header>

          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}