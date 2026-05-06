"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export default function RadioPage() {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStation, setCurrentStation] = useState("Noticias");

  const stations = [
    { name: "Noticias", frequency: "90.1 FM", description: "Informa sobre hechos de la realidad de forma objetiva.", format: "Noticiero" },
    { name: "Radioteatro", frequency: "95.5 FM", description: "Historias narradas con sonidos y voces dramáticas.", format: "Ficción" },
    { name: "Cultura Ec", frequency: "102.3 FM", description: "Entrevistas y reportajes sobre nuestras tradiciones.", format: "Magazine" }
  ];

  return (
    <div className="min-h-screen bg-[#121212] p-4 md:p-8 flex items-center justify-center font-mono">
      <div className="max-w-4xl w-full bg-[#1E1E1E] rounded-[3rem] shadow-[0_0_80px_rgba(255,0,0,0.2)] overflow-hidden border-4 border-[#333] relative">
        
        {/* Retro UI Overlay */}
        <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-red-600 via-orange-500 to-red-600"></div>

        <div className="p-8 md:p-12">
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-600 rounded-full animate-pulse shadow-[0_0_20px_rgba(220,38,38,0.5)]"></div>
              <div>
                <h1 className="text-3xl font-black text-white tracking-tighter">RADIO LECTOTECH</h1>
                <p className="text-red-500 font-bold uppercase text-[10px] tracking-widest">ON AIR - TRANSMITIENDO EN VIVO</p>
              </div>
            </div>
            <button onClick={() => router.back()} className="text-gray-500 hover:text-white transition-colors border border-gray-700 px-4 py-2 rounded-xl text-xs font-black">APAGAR</button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sintonizador */}
            <div className="space-y-6">
              <h2 className="text-gray-400 font-bold uppercase text-xs tracking-widest">Sintonizador de Estaciones</h2>
              <div className="space-y-3">
                {stations.map((s) => (
                  <button
                    key={s.name}
                    onClick={() => { setCurrentStation(s.name); setIsPlaying(true); }}
                    className={`w-full p-6 rounded-2xl border-2 transition-all text-left flex justify-between items-center
                      ${currentStation === s.name ? 'border-red-600 bg-red-600/10' : 'border-gray-800 bg-[#252525] hover:border-gray-600'}
                    `}
                  >
                    <div>
                      <p className="text-white font-black text-xl">{s.name}</p>
                      <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{s.frequency}</p>
                    </div>
                    {currentStation === s.name && <span className="text-red-500 animate-bounce">📡</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Reproductor / Información */}
            <div className="bg-[#252525] p-8 rounded-[2.5rem] border border-gray-800 flex flex-col justify-between items-center text-center space-y-6">
               <div className="w-full aspect-video bg-black rounded-2xl flex items-center justify-center relative overflow-hidden border-2 border-gray-800">
                  {/* Visualizer bars */}
                  <div className="flex items-end gap-1 h-20">
                    {[1,2,3,4,5,6,7,8].map(i => (
                      <div key={i} className={`w-3 bg-red-600 transition-all duration-300 ${isPlaying ? 'animate-[wave_1s_ease-in-out_infinite]' : 'h-2'}`} style={{animationDelay: `${i * 0.1}s`}}></div>
                    ))}
                  </div>
                  <style jsx>{`
                    @keyframes wave {
                      0%, 100% { height: 10px; }
                      50% { height: 60px; }
                    }
                  `}</style>
               </div>

               <div className="space-y-2">
                 <p className="text-red-500 font-black uppercase text-xs tracking-[0.2em]">Formato Radial: {stations.find(s => s.name === currentStation)?.format}</p>
                 <h3 className="text-2xl font-black text-white">{currentStation}</h3>
                 <p className="text-gray-400 text-sm italic max-w-xs mx-auto">
                   "{stations.find(s => s.name === currentStation)?.description}"
                 </p>
               </div>

               <div className="w-full bg-black/50 p-6 rounded-2xl border border-white/5">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Estructura del Guion</p>
                  <div className="flex justify-around text-xs font-bold text-white/50">
                    <span className="text-red-500 underline decoration-2 underline-offset-4">INTRO</span>
                    <span>DESARROLLO</span>
                    <span>CIERRE</span>
                  </div>
               </div>
            </div>
          </div>

          <div className="mt-12 text-center">
             <Button className="bg-red-600 hover:bg-red-700 py-6 px-12 text-xl rounded-2xl shadow-[0_10px_30px_rgba(220,38,38,0.4)] transition-all active:scale-95">
                {isPlaying ? 'PAUSAR EMISIÓN ⏸️' : 'REPRODUCIR AHORA ▶️'}
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
