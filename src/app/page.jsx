"use client";

import Link from 'next/link'
import {
  SignUpButton,
  SignInButton
} from '@clerk/nextjs'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1e0539] text-white">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#bc7fff]/10 border border-[#bc7fff]/20 rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-[#bc7fff] rounded-full animate-pulse"></div>
            <span className="text-[#bc7fff] text-sm font-medium">Your Uptime, Guaranteed</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Keep Your Services
            <span className="block text-[#bc7fff]">Always Active</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            The automated guardian for your free-tier services. Stop worrying about inactivity shutdowns and keep your side projects alive.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignUpButton>
              <button className="bg-[#bc7fff] hover:bg-[#bc7fff]/90 text-[#1e0539] font-semibold py-4 px-8 rounded-lg transition duration-200 shadow-lg hover:shadow-[#bc7fff]/25 hover:shadow-xl  cursor-pointer">
                Start protecting your services
              </button>
            </SignUpButton>
            <SignInButton>
              <button
                className="border border-[#bc7fff] hover:bg-[#bc7fff]/10 text-[#bc7fff] font-semibold py-4 px-8 rounded-lg transition duration-200"
              >
                I've already an account
              </button>
            </SignInButton>

          </div>

        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-4 bg-[#1e0539]/80">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Your Hard Work,{' '}
            <span className="text-[#bc7fff]">Gone to Sleep</span>
          </h2>

          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-300 mb-6">
              You built an amazing side project using free-tier platforms like Supabase, Render, or Heroku.
            </p>
            <p className="text-lg text-gray-300">
              But these platforms have one rule:{' '}
              <strong className="text-[#bc7fff]">inactivity spins down your service.</strong>{' '}
              A few days without visits and your app is offline.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-[#1e0539]/60 border border-[#bc7fff]/10 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">😴</div>
              <h3 className="text-xl font-semibold mb-2">Services Sleep</h3>
              <p className="text-gray-400">Inactivity triggers automatic shutdowns</p>
            </div>

            <div className="bg-[#1e0539]/60 border border-[#bc7fff]/10 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">😞</div>
              <h3 className="text-xl font-semibold mb-2">Users Get Frustrated</h3>
              <p className="text-gray-400">Your app is down when they need it</p>
            </div>

            <div className="bg-[#1e0539]/60 border border-[#bc7fff]/10 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">📉</div>
              <h3 className="text-xl font-semibold mb-2">Credibility Drops</h3>
              <p className="text-gray-400">Unreliable services hurt your reputation</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-[#1e0539]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How <span className="text-[#bc7fff]">Keeper</span> Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-[#bc7fff]/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#bc7fff]/20">
                <span className="text-2xl font-bold text-[#bc7fff]">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Add Your URL</h3>
              <p className="text-gray-300">
                Simply enter the web address or API endpoint you want to keep awake.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-20 h-20 bg-[#bc7fff]/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#bc7fff]/20">
                <span className="text-2xl font-bold text-[#bc7fff]">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Set Your Schedule</h3>
              <p className="text-gray-300">
                Configure how often to ping your service—every 5, 15, 30 minutes, or custom intervals.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-20 h-20 bg-[#bc7fff]/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#bc7fff]/20">
                <span className="text-2xl font-bold text-[#bc7fff]">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Relax</h3>
              <p className="text-gray-300">
                Keeper automatically sends requests to keep your services active 24/7.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-[#1e0539]/80">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose Your New <span className="text-[#bc7fff]">Guardian</span>?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#1e0539]/60 border border-[#bc7fff]/10 rounded-xl p-6">
              <div className="text-3xl mb-4">🤖</div>
              <h3 className="text-lg font-semibold mb-3">Full Automation</h3>
              <p className="text-gray-400 text-sm">
                Set it and forget it. Eliminate manual pinging forever.
              </p>
            </div>

            <div className="bg-[#1e0539]/60 border border-[#bc7fff]/10 rounded-xl p-6">
              <div className="text-3xl mb-4">⚙️</div>
              <h3 className="text-lg font-semibold mb-3">Developer First</h3>
              <p className="text-gray-400 text-sm">
                Works with any web-accessible URL: APIs, websites, cloud functions.
              </p>
            </div>

            <div className="bg-[#1e0539]/60 border border-[#bc7fff]/10 rounded-xl p-6">
              <div className="text-3xl mb-4">🛡️</div>
              <h3 className="text-lg font-semibold mb-3">100% Reliable</h3>
              <p className="text-gray-400 text-sm">
                Robust infrastructure ensures pings are sent on time, every time.
              </p>
            </div>

            <div className="bg-[#1e0539]/60 border border-[#bc7fff]/10 rounded-xl p-6">
              <div className="text-3xl mb-4">💸</div>
              <h3 className="text-lg font-semibold mb-3">Protect Free Tier</h3>
              <p className="text-gray-400 text-sm">
                Cost-effective solution to prevent service shutdowns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#1e0539] to-[#2d0a52]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stop the Shutdowns. Start the <span className="text-[#bc7fff]">Peace of Mind</span>.
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Your projects deserve to be always available. Let Keeper be the guardian that never sleeps.
          </p>
          <SignUpButton>
            <button className="bg-[#bc7fff] hover:bg-[#bc7fff]/90 text-[#1e0539] font-semibold py-4 px-8 rounded-lg transition duration-200 shadow-lg hover:shadow-[#bc7fff]/25 hover:shadow-xl  cursor-pointer">
              Get Started with Keeper today
            </button>
          </SignUpButton>
        </div>
      </section>
    </div>
  );
}
