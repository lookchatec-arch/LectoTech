"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export default function SemblanzasPage() {
  const router = useRouter();
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  const profiles = [
    {
      id: "p1",
      name: "Juan Montalvo",
      icon: "🖋️",
      clues: [
        "Escritor ambateño del siglo XIX.",
        "Luchó con su pluma contra las injusticias.",
        "Autor de 'Las Catilinarias'."
      ],
      description: "Montalvo era un hombre de carácter firme y verbo encendido. Su semblanza destaca su pasión por la libertad y su elegancia al escribir, siendo un referente de la literatura ecuatoriana."
    },
    {
      id: "p2",
      name: "Tránsito Amaguaña",
      icon: "👩‍🌾",
      clues: [
        "Luchadora por los derechos indígenas.",
        "Nacida en Cayambe.",
        "Organizó las primeras huelgas agrarias."
      ],
      description: "La semblanza de Tránsito nos muestra una mujer valiente, de mirada profunda y manos trabajadoras. Su vida fue una entrega total a la justicia social y el reconocimiento de su cultura."
    }
  ];

  return (
    <div className="min-h-screen bg-rose-50 p-4 md:p-8 flex items-center justify-center">
      <div className="max-w-5xl w-full bg-white rounded-[3rem] shadow-2xl overflow-hidden border-8 border-rose-100 relative">
        
        <div className="p-8 md:p-12">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl font-black text-[#2A5C82] tracking-tighter">DETECTIVES DE SEMBLANZAS 🕵️‍♂️</h1>
              <p className="text-gray-400 font-bold uppercase text-xs tracking-widest mt-1">Descifrando la personalidad de grandes figuras</p>
            </div>
            <button onClick={() => router.back()} className="bg-rose-100 text-rose-600 px-6 py-2 rounded-xl font-black hover:bg-rose-200 transition-all">SALIR</button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Selección de Personaje */}
            <div className="space-y-6">
              <h2 className="text-xl font-black text-gray-700">Elige un Personaje para Investigar:</h2>
              <div className="grid grid-cols-1 gap-4">
                {profiles.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProfile(p.id)}
                    className={`p-8 rounded-[2.5rem] border-4 transition-all flex items-center gap-6 group
                      ${selectedProfile === p.id ? 'border-rose-500 bg-rose-50' : 'border-gray-50 bg-white hover:border-rose-200'}
                    `}
                  >
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-lg transition-transform group-hover:scale-110 ${selectedProfile === p.id ? 'bg-rose-500 text-white' : 'bg-gray-100'}`}>
                      {p.icon}
                    </div>
                    <p className="text-2xl font-black text-gray-800 tracking-tight">{p.name}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Resultado de la Investigación */}
            <div className="flex items-center justify-center">
              {selectedProfile ? (
                <div className="bg-white p-10 rounded-[3rem] border-2 border-rose-200 w-full animate-in slide-in-from-bottom-8 duration-500 space-y-8 relative shadow-xl">
                   <div className="absolute top-6 right-6 text-4xl opacity-20">🔎</div>
                   
                   <div className="space-y-4">
                     <p className="text-rose-600 font-black uppercase text-xs tracking-widest">Pistas Recolectadas</p>
                     <ul className="space-y-2">
                       {profiles.find(p => p.id === selectedProfile)?.clues.map((clue, i) => (
                         <li key={i} className="flex items-center gap-3 text-gray-600 font-bold">
                           <span className="text-rose-500">📍</span> {clue}
                         </li>
                       ))}
                     </ul>
                   </div>

                   <div className="bg-rose-50 p-8 rounded-3xl border-2 border-dashed border-rose-200">
                     <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Semblanza del Personaje</p>
                     <p className="text-gray-700 text-lg leading-relaxed font-medium italic">
                       "{profiles.find(p => p.id === selectedProfile)?.description}"
                     </p>
                   </div>

                   <Button onClick={() => setSelectedProfile(null)} className="w-full bg-rose-600 hover:bg-rose-700 py-4 rounded-xl font-bold text-white">
                     Investigar Otro
                   </Button>
                </div>
              ) : (
                <div className="text-center space-y-4 animate-pulse">
                  <div className="text-9xl opacity-10">🕵️‍♂️</div>
                  <p className="text-gray-400 font-black uppercase tracking-widest text-sm max-w-[200px]">Selecciona una figura histórica para ver su semblanza</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
