"use client";
import React, { useState } from 'react';
import Head from 'next/head';
import KeeperLogo from './components/KeeperLogo';



// --- Componente Header ---
// Extraído para mayor claridad
const Header = () => (
  <header className="flex items-center justify-between gap-4 pb-6">
    <div className="flex items-center gap-6">
      <div >
        <KeeperLogo width="200" height="60" />
      </div>
      <div className="text-[#bc7fff] text-md leading-normal tracking-wide">Sleep is for humans!</div>
    </div>
    <div className="flex items-center gap-4">
    <button className="flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-5 bg-[#bc7fff] text-white text-sm font-bold leading-normal tracking-wide hover:bg-opacity-90 transition-colors">
      <span className="truncate">Login</span>
    </button>
    <button className="flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-5 bg-[#bc7fff] text-white text-sm font-bold leading-normal tracking-wide hover:bg-opacity-90 transition-colors">
      <span className="truncate">SignUp</span>
    </button>
    </div>
  </header>
);





// --- Página Principal ---
export default function Home() {

  // Configuración de Tailwind en línea (para que funcione con el CDN como en tu HTML)
  const tailwindConfig = `
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          colors: {
            "primary": "#bc7fff",
            "background-light": "#f7f6f8",
            "background-dark": "#1e0539",
          },
          fontFamily: {
            "display": ["Manrope", "sans-serif"]
          },
          borderRadius: {
            "DEFAULT": "0.25rem",
            "lg": "0.5rem",
            "xl": "0.75rem",
            "full": "9999px"
          },
        },
      },
    }
  `;

  return (
    // Aplicamos 'dark' a la raíz y las clases de body para que coincida con tu HTML
    <div className="dark bg-background-light dark:bg-background-dark font-display text-white antialiased">
      <div className="relative flex h-auto min-h-screen w-full flex-col">
        <div className="layout-container flex h-full grow flex-col">
          <div className="flex flex-1 justify-center p-4 sm:p-6 lg:p-8">
            <div className="layout-content-container flex w-full max-w-7xl flex-1 flex-col">
              <Header />
              <main className="py-8">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <h2 className="text-4xl font-black leading-tight tracking-[-0.033em]">Bienvenido</h2>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
