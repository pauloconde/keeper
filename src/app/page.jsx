"use client";
export default function Home() {
  return (
    <div className="dark bg-background-light dark:bg-background-dark font-display text-white antialiased">
      <div className="relative flex h-auto min-h-screen w-full flex-col">
        <div className="layout-container flex h-full grow flex-col">
          <div className="flex flex-1 justify-center p-4 sm:p-6 lg:p-8">
            <div className="layout-content-container flex w-full max-w-7xl flex-1 flex-col">
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
