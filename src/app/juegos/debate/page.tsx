"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export default function DebatePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedSide, setSelectedSide] = useState<string | null>(null);

  const topics = [
    {
      id: 1,
      title: "¿Deberían los libros ser solo digitales?",
      sides: [
        { id: "pro", name: "A Favor (Digital)", arguments: ["Ahorro de papel", "Fácil de transportar", "Interactividad"] },
        { id: "contra", name: "En Contra (Físico)", arguments: ["No cansa la vista", "Sensación del papel", "No requiere batería"] }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDF6E3] p-4 md:p-8 flex items-center justify-center">
      <div className="max-w-5xl w-full bg-white rounded-[3rem] shadow-2xl overflow-hidden border-b-[16px] border-[#2A5C82] relative">
        
        <div className="p-8 md:p-16">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6 text-center md:text-left">
            <div>
              <h1 className="text-5xl font-black text-[#2A5C82] tracking-tighter uppercase">EL CLUB DEL DEBATE ⚖️</h1>
              <p className="text-gray-400 font-bold uppercase text-xs tracking-widest mt-2">La fuerza de tus argumentos</p>
            </div>
            <button onClick={() => router.back()} className="text-[#2A5C82] font-black border-2 border-[#2A5C82] px-6 py-2 rounded-xl hover:bg-[#2A5C82] hover:text-white transition-all">SALIR DEL CLUB</button>
          </div>

          {step === 1 && (
            <div className="space-y-12 animate-in fade-in duration-700">
               <div className="bg-[#2A5C82] p-10 rounded-[3rem] text-white text-center shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                  <h2 className="text-3xl font-black mb-4">TEMA DEL DÍA</h2>
                  <p className="text-5xl font-black italic tracking-tighter">"{topics[0].title}"</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {topics[0].sides.map((side) => (
                   <button
                     key={side.id}
                     onClick={() => { setSelectedSide(side.id); setStep(2); }}
                     className={`p-10 rounded-[3rem] border-4 transition-all group flex flex-col items-center text-center gap-6
                       ${side.id === 'pro' ? 'border-green-100 bg-green-50 hover:border-green-500' : 'border-orange-100 bg-orange-50 hover:border-orange-500'}
                     `}
                   >
                     <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-md group-hover:scale-110 transition-transform ${side.id === 'pro' ? 'bg-green-500' : 'bg-orange-500'} text-white`}>
                       {side.id === 'pro' ? '👍' : '👎'}
                     </div>
                     <h3 className={`text-2xl font-black ${side.id === 'pro' ? 'text-green-700' : 'text-orange-700'}`}>{side.name}</h3>
                     <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">Haz clic para defender esta postura</p>
                   </button>
                 ))}
               </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in slide-in-from-right-8 duration-700">
               <div className="flex items-center gap-6 bg-[#2A5C82]/5 p-8 rounded-[3rem] border-2 border-[#2A5C82]/10">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl shrink-0 ${selectedSide === 'pro' ? 'bg-green-500' : 'bg-orange-500'} text-white`}>
                    {selectedSide === 'pro' ? '👍' : '👎'}
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Tu Postura</p>
                    <h2 className="text-2xl font-black text-[#2A5C82]">{topics[0].sides.find(s => s.id === selectedSide)?.name}</h2>
                  </div>
               </div>

               <h3 className="text-xl font-bold text-gray-700 text-center">Tus Argumentos Clave:</h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {topics[0].sides.find(s => s.id === selectedSide)?.arguments.map((arg, i) => (
                   <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border-2 border-gray-100 hover:border-[#2A5C82] transition-all text-center group">
                      <div className="text-3xl mb-4 group-hover:animate-bounce">📌</div>
                      <p className="text-lg font-black text-gray-800">{arg}</p>
                      <p className="text-xs text-gray-400 mt-2 font-bold">Punto fuerte {i+1}</p>
                   </div>
                 ))}
               </div>

               <div className="pt-8 border-t border-gray-100 flex flex-col items-center gap-6">
                  <p className="text-gray-500 font-medium text-center max-w-lg">Recuerda que un debate no se trata de ganar, sino de usar la <strong>persuasión</strong> y el <strong>respeto</strong> para comunicar tus ideas.</p>
                  <div className="flex gap-4 w-full">
                    <Button onClick={() => setStep(1)} className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 py-4 rounded-2xl font-bold">Elegir Otro Tema</Button>
                    <Button onClick={() => router.back()} className="flex-1 bg-[#2A5C82] hover:bg-blue-900 py-4 rounded-2xl font-bold shadow-xl">Finalizar Sesión</Button>
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
