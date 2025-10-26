"use client";
import React, { useState } from 'react';
import Head from 'next/head';
import KeeperLogo from './components/KeeperLogo';

// --- Datos de Ejemplo ---
// En una aplicación real, esto vendría de una API
const initialEndpoints = [
  {
    id: 1,
    status: 'active',
    name: 'My API Server',
    url: 'https://api.myapp.com/health',
    frequency: 'Every 7 days',
    lastPing: '2 days ago',
    nextPing: 'In 5 days',
  },
  {
    id: 2,
    status: 'expiring',
    name: 'Staging Environment',
    url: 'https://staging.my-app.dev/status',
    frequency: 'Every 30 days',
    lastPing: '28 days ago',
    nextPing: 'In 2 days',
  },
  {
    id: 3,
    status: 'failed',
    name: 'Legacy System Healthcheck',
    url: 'http://192.168.1.10/legacy/ping',
    frequency: 'Every 1 day',
    lastPing: '1 day ago',
    nextPing: 'In 1 hour',
  },
  {
    id: 4,
    status: 'inactive',
    name: 'Dev Database Ping',
    url: 'mysql://user:pass@dev.db.internal:3306',
    frequency: 'Every 12 hours',
    lastPing: '3 days ago',
    nextPing: 'Paused',
  },
];

// --- Componente Header ---
// Extraído para mayor claridad
const DashboardHeader = () => (
  <header className="flex items-center justify-between gap-4 pb-6">
    <div className="flex items-center gap-6">
      <div >
       <KeeperLogo width="200" height="60" />
      </div>
      <div className="text-[#bc7fff] text-md leading-normal tracking-wide">Sleep is for humans!</div>
    </div>
    <button className="flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-5 bg-[#bc7fff] text-white text-sm font-bold leading-normal tracking-wide hover:bg-opacity-90 transition-colors">
      <span className="material-symbols-outlined !text-lg">add</span>
      <span className="truncate">Add New Endpoint</span>
    </button>
  </header>
);

// --- Componente EndpointCard ---
// Este es el componente reutilizable que solicitaste.
// Maneja diferentes "modos" (estados) a través de props.
const EndpointCard = ({ endpoint }) => {
  // Configuración para cada estado
  const statusConfig = {
    active: {
      text: 'Active',
      textColor: 'text-green-400',
      bgColor: 'bg-green-500',
    },
    expiring: {
      text: 'Expiring Soon',
      textColor: 'text-yellow-400',
      bgColor: 'bg-yellow-500',
    },
    failed: {
      text: 'Failed',
      textColor: 'text-red-400',
      bgColor: 'bg-red-500',
    },
    inactive: {
      text: 'Inactive',
      textColor: 'text-gray-400',
      bgColor: 'bg-gray-500',
    },
  };

  // Obtener la configuración correcta o usar 'inactive' como default
  const config = statusConfig[endpoint.status] || statusConfig.inactive;

  return (
    <div className="flex items-start gap-3 rounded-xl bg-white/5 p-5 transition-all hover:bg-white/10">
      {/* Indicador de estado dinámico */}
      <div className={`w-1.5 h-6 shrink-0 rounded-full ${config.bgColor} mt-1`}></div>
      
      <div className="flex w-full flex-col gap-4">
        <div>
          {/* Texto de estado dinámico */}
          <p className={`text-sm font-medium ${config.textColor}`}>{config.text}</p>
          {/* Datos del endpoint */}
          <h3 className="text-lg font-bold leading-tight tracking-[-0.015em] text-white">{endpoint.name}</h3>
          <p className="text-sm text-primary/70 truncate" title={endpoint.url}>{endpoint.url}</p>
        </div>
        
        <div className="text-sm text-white/60 space-y-1">
          <p><strong className="font-medium text-white/80">Frequency:</strong> {endpoint.frequency}</p>
          <p><strong className="font-medium text-white/80">Last Ping:</strong> {endpoint.lastPing}</p>
          <p><strong className="font-medium text-white/80">Next Ping:</strong> {endpoint.nextPing}</p>
        </div>
        
        <div className="flex items-center gap-2 mt-2">
          <button className="flex h-9 flex-1 cursor-pointer items-center justify-center gap-1.5 overflow-hidden rounded-lg bg-primary/20 px-4 text-sm font-semibold text-primary transition-colors hover:bg-primary/30">
            <span className="material-symbols-outlined !text-base">bolt</span>
            <span className="truncate">Ping Now</span>
          </button>
          <button className="flex size-9 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white" title="Edit">
            <span className="material-symbols-outlined">edit</span>
          </button>
          <button className="flex size-9 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-white/10 text-white/70 transition-colors hover:bg-red-500/20 hover:text-red-400" title="Delete">
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Componente EmptyState ---
// Se muestra cuando no hay endpoints
const EmptyState = () => (
  <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/20 bg-white/5 text-center p-12 min-h-60">
    <span className="material-symbols-outlined text-5xl text-primary/60 mb-4">add_circle</span>
    <h3 className="text-xl font-bold text-white mb-2">No endpoints configured yet.</h3>
    <p className="text-white/70 mb-6 max-w-sm">Add your first endpoint to start monitoring your services and keep them active.</p>
    <button className="flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-5 bg-primary text-[#1e0539] text-sm font-bold leading-normal tracking-wide hover:bg-opacity-90 transition-colors">
      <span className="material-symbols-outlined !text-lg">add</span>
      <span>Add Your First Endpoint</span>
    </button>
  </div>
);

// --- Página Principal ---
export default function Home() {
  const [endpoints, setEndpoints] = useState(initialEndpoints);

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
              
              <DashboardHeader />

              <main className="py-8">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <h2 className="text-4xl font-black leading-tight tracking-[-0.033em]">Endpoints</h2>
                </div>

                {/* --- Grid Dinámica --- */}
                {/* Muestra los endpoints si existen, o el estado vacío si no */}
                {endpoints.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {endpoints.map((endpoint) => (
                      <EndpointCard key={endpoint.id} endpoint={endpoint} />
                    ))}
                  </div>
                ) : (
                  <EmptyState />
                )}
                
                {/* Nota: En tu HTML original, el EmptyState se mostraba *además* de las otras tarjetas.
                  Lo he cambiado a una lógica condicional: o se muestran las tarjetas, o se muestra el EmptyState.
                  Si quieres replicar el comportamiento original (mostrar siempre el EmptyState), 
                  simplemente descomenta la siguiente línea y elimina la lógica condicional de arriba.
                */}
                {/* <EmptyState /> */}
                
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
