"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export default function ModismosPage() {
  const router = useRouter();
  const [selectedModismo, setSelectedModismo] = useState<number | null>(null);
  
  const modismos = [
    { id: 1, phrase: "Estar en la luna", meaning: "Estar distraído o no prestar atención.", origin: "Viene de la idea de estar tan lejos que no ves lo que pasa aquí.", icon: "🌙" },
    { id: 2, phrase: "Dar en el clavo", meaning: "Acertar exactamente en algo difícil.", origin: "Se refiere a la precisión de los carpinteros al martillar.", icon: "🔨" },
    { id: 3, phrase: "Pedir peras al olmo", meaning: "Esperar algo imposible de alguien o algo.", origin: "El olmo no da frutas, por lo que es un absurdo.", icon: "🌳" },
    { id: 4, phrase: "Hacerse la boca agua", meaning: "Tener muchas ganas de comer algo rico.", origin: "Es la reacción física real al ver comida deliciosa.", icon: "🤤" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 p-4 md:p-8 flex items-center justify-center">
      <div className="max-w-5xl w-full bg-white rounded-[3.5rem] shadow-2xl overflow-hidden border-8 border-white/20 relative">
        
        <div className="p-8 md:p-16">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <div className="text-center md:text-left">
              <h1 className="text-5xl font-black text-[#2A5C82] tracking-tighter">MODISMOS TOP 🗣️</h1>
              <p className="text-gray-400 font-bold uppercase text-xs tracking-[0.3em] mt-2">DICCIONARIO INTERACTIVO DE EXPRESIONES</p>
            </div>
            <button onClick={() => router.back()} className="bg-purple-100 text-purple-600 hover:bg-purple-200 px-8 py-3 rounded-2xl transition-all font-black shadow-sm">VOLVER</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Lista de Modismos */}
            <div className="space-y-4 overflow-y-auto max-h-[500px] pr-4 custom-scrollbar">
              {modismos.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedModismo(m.id)}
                  className={`w-full p-8 rounded-[2.5rem] border-4 transition-all flex items-center gap-6 group
                    ${selectedModismo === m.id ? 'border-purple-500 bg-purple-50' : 'border-gray-50 bg-white hover:border-purple-200 hover:shadow-xl'}
                  `}
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg transition-transform group-hover:rotate-12 ${selectedModismo === m.id ? 'bg-purple-500 text-white' : 'bg-gray-100'}`}>
                    {m.icon}
                  </div>
                  <p className="text-2xl font-black text-gray-800 tracking-tight">{m.phrase}</p>
                </button>
              ))}
            </div>

            {/* Detalle del Modismo */}
            <div className="flex items-center justify-center">
              {selectedModismo ? (
                <div className="bg-purple-50 p-10 rounded-[3rem] border-2 border-purple-100 w-full animate-in zoom-in duration-500 space-y-8 text-center relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 text-9xl opacity-5 pointer-events-none">
                    {modismos.find((m: any) => m.id === selectedModismo)?.icon}
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-purple-600 font-black uppercase text-xs tracking-widest">Significado Real</p>
                    <h3 className="text-3xl font-black text-gray-800">
                      "{modismos.find((m: any) => m.id === selectedModismo)?.meaning}"
                    </h3>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-purple-100">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Curiosidad / Origen</p>
                    <p className="text-gray-600 font-medium italic leading-relaxed">
                      {modismos.find((m: any) => m.id === selectedModismo)?.origin}
                    </p>
                  </div>

                  <Button onClick={() => setSelectedModismo(null)} className="w-full bg-purple-600 hover:bg-purple-700 py-4 rounded-xl font-bold">
                    Elegir Otro
                  </Button>
                </div>
              ) : (
                <div className="text-center space-y-4 animate-pulse">
                  <div className="text-8xl opacity-20">📖</div>
                  <p className="text-gray-400 font-black uppercase tracking-widest text-sm">Selecciona una expresión de la lista</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
