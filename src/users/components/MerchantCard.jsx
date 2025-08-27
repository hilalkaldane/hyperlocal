import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function MerchantCard({ merchant }) {
  const nav = useNavigate();
  const faceEmojis = ["😀","😃","😄","😁","😆","😅","😂","🤣","😊","😇","😍","🤩","🥳","👻","🤡","😎","✨","🤖","🦄","💥"];  
  const emoji = faceEmojis[Math.floor(Math.random() * faceEmojis.length)];

  return (
    <div
      onClick={() => nav(`/merchant/${merchant.id}`)}
      className="flex gap-3 items-center p-3 rounded-lg border border-gray-100 bg-white shadow-sm"
      role="button"
      tabIndex={0}
    >
      <div className="w-14 h-14 rounded-md flex-shrink-0 flex items-center justify-center bg-gray-100 text-gray-500 text-3xl">
        {emoji}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium truncate">{merchant.name}</div>
        <div className="text-sm text-gray-500">
          {merchant.distancekm} km • {merchant.tagline}
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          nav(`/merchant/${merchant.id}`);
        }}
        className="ml-2 px-3 py-1 bg-gray-100 rounded-md text-sm"
      >
        View
      </button>
    </div>
  );
}
