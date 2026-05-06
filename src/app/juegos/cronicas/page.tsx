"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export default function CronicasPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [arrangedItems, setArrangedItems] = useState<any[]>([]);

  const items = [
    { id: 1, text: "Llegada al sitio arqueológico.", time: "08:00 AM" },
    { id: 2, text: "Descubrimiento de la vasija real.", time: "11:30 AM" },
    { id: 3, text: "Registro fotográfico y excavación.", time: "10:00 AM" },
    { id: 4, text: "Análisis preliminar en el laboratorio.", time: "15:00 PM" }
  ];

  const handleArrange = (item: any) => {
    if (!arrangedItems.find((i: any) => i.id === item.id)) {
      setArrangedItems([...arrangedItems, item]);
    }
  };

  const reset = () => {
    setArrangedItems([]);
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-[#FFFBEB] p-4 md:p-8 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white rounded-[3.5rem] shadow-2xl overflow-hidden border-t-[16px] border-[#FFD700] relative">
        
        <div className="p-8 md:p-12">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h1 className="text-4xl font-black text-[#2A5C82] tracking-tighter">CRÓNICAS 360 📜</h1>
              <p className="text-gray-400 font-bold uppercase text-xs tracking-widest mt-1">El arte de narrar en el tiempo</p>
            </div>
            <button onClick={() => router.back()} className="text-amber-600 font-black hover:underline">SALIR</button>
          </div>

          {step === 1 && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <div className="bg-amber-50 p-8 rounded-3xl border-2 border-amber-100 flex items-center gap-6">
                  <div className="text-5xl">🧭</div>
                  <p className="text-amber-800 font-bold leading-relaxed">
                    Una crónica debe seguir un <strong>orden cronológico</strong>. 
                    Ordena estos hechos de la expedición de menor a mayor hora para armar tu relato.
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {items.map((item) => (
                   <button
                     key={item.id}
                     disabled={arrangedItems.find((i: any) => i.id === item.id)}
                     onClick={() => handleArrange(item)}
                     className={`p-6 rounded-2xl border-2 transition-all text-left flex justify-between items-center
                       ${arrangedItems.find((i: any) => i.id === item.id) ? 'opacity-30 bg-gray-50' : 'bg-white border-gray-100 hover:border-amber-400 hover:shadow-lg'}
                     `}
                   >
                     <p className="font-bold text-gray-700">{item.text}</p>
                     <span className="text-xs font-black bg-amber-100 text-amber-600 px-3 py-1 rounded-full">{item.time}</span>
                   </button>
                 ))}
               </div>

               <div className="space-y-4">
                 <h3 className="font-black text-gray-400 uppercase text-xs tracking-widest text-center">Tu Línea de Tiempo</h3>
                 <div className="flex flex-wrap justify-center gap-4 min-h-[100px] p-6 bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-200">
                    {arrangedItems.length === 0 && <p className="text-gray-300 font-bold">Haz clic en los hechos arriba...</p>}
                    {arrangedItems.map((item, i) => (
                      <div key={item.id} className="bg-amber-400 text-white p-4 rounded-xl shadow-md flex items-center gap-3 animate-in zoom-in duration-300">
                        <span className="bg-white/20 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black">{i + 1}</span>
                        <p className="font-bold text-sm">{item.text}</p>
                      </div>
                    ))}
                 </div>
               </div>

               {arrangedItems.length === items.length && (
                 <Button onClick={() => setStep(2)} className="w-full bg-[#2A5C82] hover:bg-blue-900 py-6 text-xl rounded-2xl shadow-xl mt-8">
                   Publicar Crónica ➡️
                 </Button>
               )}
            </div>
          )}

          {step === 2 && (
            <div className="text-center space-y-8 animate-in zoom-in duration-500 py-8">
               <div className="text-8xl">🗞️</div>
               <h2 className="text-4xl font-black text-[#2A5C82]">¡Crónica Publicada!</h2>
               
               <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-gray-100 max-w-lg mx-auto text-left space-y-6 relative">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/10 rounded-full -mr-12 -mt-12"></div>
                  <h3 className="text-xl font-black text-amber-600 uppercase tracking-widest border-b-2 border-amber-100 pb-2">EXPEDICIÓN LECTOTECH</h3>
                  <div className="space-y-4 text-gray-600 font-medium italic">
                    {arrangedItems.map((item, i) => (
                      <p key={i}>
                        A las <strong>{item.time}</strong>, nuestro equipo realizó: <em>{item.text}</em>.
                      </p>
                    ))}
                  </div>
               </div>

               <div className="flex gap-4">
                 <Button onClick={reset} className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 py-4 rounded-2xl font-bold">Volver a Empezar</Button>
                 <Button onClick={() => router.back()} className="flex-1 bg-[#4CAF50] hover:bg-green-600 py-4 rounded-2xl font-bold">Finalizar Misión</Button>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
