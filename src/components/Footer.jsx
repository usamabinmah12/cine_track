import React from 'react';

export default function Footer({ moviesCount }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer footer-center p-10 bg-neutral text-neutral-content rounded-t-3xl mt-12 shadow-2xl border-t border-base-100/10">
      <div className="grid grid-flow-col gap-4">
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span className="text-xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              CineTrack
            </span>
          </div>
          <p className="text-xs text-neutral-content/60 max-w-xs mt-1">
            Your ultimate client-side cinema companion. Organized, persistent, and entirely zero-backend.
          </p>
        </div>
      </div>

      <div>
        <div className="grid grid-flow-col gap-4 text-xs font-semibold text-neutral-content/80">
          <div className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-success"></span>
            <span>Local Storage Active</span>
          </div>
          <span>•</span>
          <div>
            <span>{moviesCount} Movies Tracked</span>
          </div>
        </div>
      </div>

      <div className="text-xs text-neutral-content/40 border-t border-neutral-focus w-full pt-4">
        <p>© {currentYear} CineTrack. Built with React, Tailwind CSS & DaisyUI.</p>
      </div>
    </footer>
  );
}