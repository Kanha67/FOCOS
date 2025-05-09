import React from "react";

export default function DivineBgPeacock() {
  // Animated peacock feathers using SVG and CSS
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        opacity: 0.22,
        filter: "blur(0.5px)",
      }}
      aria-hidden="true"
    >
      {/* Multiple animated SVG peacock feathers */}
      {[...Array(7)].map((_, i) => (
        <svg
          key={i}
          width="180"
          height="420"
          viewBox="0 0 180 420"
          style={{
            position: "absolute",
            left: `${8 + i * 13}%`,
            top: `${-10 + (i % 2) * 12}%`,
            transform: `rotate(${(i % 2 === 0 ? 1 : -1) * (8 + i * 3)}deg) scale(${0.72 + 0.04 * i})`,
            animation: `floatFeather${i} 8s ease-in-out infinite`,
            animationDelay: `${i * 1.1}s`,
          }}
        >
          <ellipse cx="90" cy="210" rx="80" ry="200" fill="#49b6a6" fillOpacity="0.28" />
          <ellipse cx="90" cy="210" rx="60" ry="140" fill="#4f46e5" fillOpacity="0.22" />
          <ellipse cx="90" cy="210" rx="38" ry="90" fill="#fbbf24" fillOpacity="0.18" />
          <ellipse cx="90" cy="210" rx="18" ry="38" fill="#fff" fillOpacity="0.16" />
          <ellipse cx="90" cy="210" rx="10" ry="18" fill="#1e293b" fillOpacity="0.13" />
        </svg>
      ))}
      <style>{`
        ${[...Array(7)].map((_, i) => `
          @keyframes floatFeather${i} {
            0%   { transform: translateY(0) scale(${0.72 + 0.04 * i}) rotate(${(i % 2 === 0 ? 1 : -1) * (8 + i * 3)}deg); }
            50%  { transform: translateY(28px) scale(${0.72 + 0.04 * i}) rotate(${(i % 2 === 0 ? 1 : -1) * (11 + i * 5)}deg); }
            100% { transform: translateY(0) scale(${0.72 + 0.04 * i}) rotate(${(i % 2 === 0 ? 1 : -1) * (8 + i * 3)}deg); }
          }
        `).join("\n")}
      `}</style>
    </div>
  );
}
