import React from "react";

export default function ModalEdit({ open, title, children, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-900/80 via-blue-700/70 to-purple-900/80 backdrop-blur-sm animate-fadeInModal">
      <div className="bg-white/95 rounded-2xl shadow-2xl p-8 w-full max-w-lg relative border border-blue-200/40 animate-fadeInUp">
        <button
          className="absolute -top-4 -right-4 bg-white/80 border border-blue-200/60 rounded-full w-10 h-10 flex items-center justify-center text-2xl text-blue-700 hover:bg-red-500 hover:text-white shadow-lg transition-all duration-200"
          onClick={onClose}
          aria-label="Cerrar"
        >
          &times;
        </button>
        <h2 className="text-xl font-extrabold mb-6 text-blue-700 text-center tracking-wide drop-shadow-lg animate-pulse">
          {title}
        </h2>
        <div className="space-y-4">{children}</div>
      </div>
      <style>{`
        @keyframes fadeInModal { from { opacity: 0; } to { opacity: 1; } }
        .animate-fadeInModal { animation: fadeInModal 0.3s; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: none; } }
        .animate-fadeInUp { animation: fadeInUp 0.4s cubic-bezier(.4,2,.6,1); }
      `}</style>
    </div>
  );
}
