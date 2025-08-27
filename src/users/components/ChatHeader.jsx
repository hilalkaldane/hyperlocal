import React from "react";

export default function ChatHeader({ name = "John Doe", status = "online" }) {
  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-green-600 text-white flex items-center px-4 gap-3 z-40">
      <button aria-label="Back" className="p-1">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <polyline points="15 18 9 12 15 6" stroke="white" />
        </svg>
      </button>
      <div className="flex-1 min-w-0">
        <div className="font-semibold truncate">{name}</div>
        <div className="text-xs opacity-90">{status}</div>
      </div>
      <button aria-label="Chat menu" className="p-1">⋮</button>
    </header>
  );
}
