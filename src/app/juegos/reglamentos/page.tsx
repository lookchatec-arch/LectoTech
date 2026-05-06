"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export default function ReglamentosPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [choices, setChoices] = useState<string[]>([]);

  const rules = [
    { id: "r1", text: "Pedir permiso antes de publicar fotos de otros.", category: "Derecho/Deber", correct: true },
    { id: "r2", text: "Usar contraseñas fáciles como '1234' para no olvidarlas.", category: "Seguridad", correct: false },
    { id: "r3", text: "Tratar con respeto a los demás en redes sociales.", category: "Convivencia", correct: true },
    { id: "r4", text: "Compartir noticias sin verificar si son reales.", category: "Información", correct: false }
  ];

  const handleToggle = (id: string) => {
    if (choices.includes(id)) {
      setChoices(choices.filter(i => i !== id));
    } else {
      setChoices([...choices, id]);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50 p-4 md:p-8 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white rounded-[3rem] shadow-2xl overflow-hidden border-8 border-indigo-100 relative">
        
        <div className="p-8 md:p-12">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h1 className="text-4xl font-black text-[#2A5C82] tracking-tighter">CIUDADANO DIGITAL 📱</h1>
              <p className="text-gray-400 font-bold uppercase text-xs tracking-widest mt-1">Reglamentos y Derechos en la Red</p>
            </div>
            <button onClick={() => router.back()} className="text-indigo-600 font-black hover:bg-indigo-50 px-4 py-2 rounded-xl transition-all">CERRAR</button>
          </div>

          {step === 1 && (
            <div className="space-y-8 animate-in fade-in duration-700">
               <div className="bg-indigo-600 p-8 rounded-3xl text-white flex items-center gap-6 shadow-xl">
                  <div className="text-5xl">🛡️</div>
                  <p className="text-indigo-100 font-bold leading-relaxed">
                    Estamos creando el <strong>Manual de Convivencia Digital</strong> de LectoTech. 
                    Selecciona solo las conductas que promueven un ambiente seguro y respetuoso.
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {rules.map((rule) => (
                   <button
                     key={rule.id}
                     onClick={() => handleToggle(rule.id)}
                     className={`p-6 rounded-[2rem] border-4 transition-all text-left flex items-start gap-4
                       ${choices.includes(rule.id) ? 'border-indigo-500 bg-indigo-50 shadow-md' : 'border-gray-50 bg-white hover:border-indigo-200'}
                     `}
                   >
                     <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 ${choices.includes(rule.id) ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-gray-200'}`}>
                       {choices.includes(rule.id) && '✓'}
                     </div>
                     <div>
                       <p className="font-bold text-gray-700 text-lg leading-snug">{rule.text}</p>
                       <span className="text-[10px] font-black uppercase text-indigo-400 tracking-widest mt-2 block">{rule.category}</span>
                     </div>
                   </button>
                 ))}
               </div>

               <Button 
                disabled={choices.length === 0}
                onClick={() => setStep(2)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 py-6 text-xl rounded-2xl shadow-xl mt-8"
               >
                 Generar Mi Reglamento 📜
               </Button>
            </div>
          )}

          {step === 2 && (
            <div className="text-center space-y-8 animate-in zoom-in duration-500 py-8">
               <div className="text-8xl">✅</div>
               <h2 className="text-4xl font-black text-[#2A5C82]">¡Eres un Ciudadano Responsable!</h2>
               
               <div className="bg-indigo-50 p-10 rounded-[3rem] border-2 border-indigo-100 max-w-lg mx-auto text-left space-y-6">
                  <h3 className="text-xl font-black text-indigo-600 uppercase tracking-widest text-center">MI COMPROMISO DIGITAL</h3>
                  <div className="space-y-4 text-gray-600 font-medium italic">
                    {choices.map((id, i) => {
                      const rule = rules.find(r => r.id === id);
                      return (
                        <div key={i} className="flex gap-3">
                          <span className="text-indigo-500 font-black">●</span>
                          <p>{rule?.text} {rule?.correct ? '✨' : '⚠️ (Recuerda revisar este punto)'}</p>
                        </div>
                      );
                    })}
                  </div>
               </div>

               <div className="flex gap-4">
                 <Button onClick={() => { setChoices([]); setStep(1); }} className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 py-4 rounded-2xl font-bold">Modificar</Button>
                 <Button onClick={() => router.back()} className="flex-1 bg-indigo-600 hover:bg-indigo-700 py-4 rounded-2xl font-bold text-white shadow-xl">Guardar Compromiso</Button>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
