"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export default function TerrorSeptimoPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [atmosphere, setAtmosphere] = useState("");
  const [sound, setSound] = useState("");
  const [creature, setCreature] = useState("");

  const atmospheres = [
    { id: "a1", name: "Sótano Húmedo", desc: "Olor a moho y gotas cayendo rítmicamente.", icon: "🌫️" },
    { id: "a2", name: "Bosque de Niebla", desc: "Ramas que parecen dedos y silencio absoluto.", icon: "🌲" },
    { id: "a3", name: "Mansión de Vidrio", desc: "Reflejos distorsionados que parecen moverse solos.", icon: "🏛️" }
  ];

  const sounds = [
    { id: "s1", name: "Susurro metálico", desc: "Como si alguien arrastrara una cadena invisible." },
    { id: "s2", name: "Risa de niño lejano", desc: "Proviene de un lugar donde no debería haber nadie." },
    { id: "s3", name: "Crujido de madera", desc: "Bajo tus pies, aunque no te hayas movido." }
  ];

  return (
    <div className="min-h-screen bg-black p-4 md:p-8 flex items-center justify-center font-serif">
      <div className="max-w-4xl w-full bg-[#1A1A1A] rounded-[3rem] shadow-[0_0_50px_rgba(255,0,0,0.1)] overflow-hidden border-2 border-red-900/30 relative">
        
        {/* Sombras Decorativas */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-red-900/10 to-transparent pointer-events-none"></div>

        <div className="p-8 md:p-12">
          <div className="flex justify-between items-center mb-12 border-b border-red-900/20 pb-6">
            <div>
              <h1 className="text-4xl font-black text-red-600 tracking-tighter uppercase italic">ESCRITOR DE PESADILLAS 💀</h1>
              <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.3em] mt-2">Maestría en Suspenso y Terror</p>
            </div>
            <button onClick={() => router.back()} className="text-red-900 hover:text-red-600 transition-colors font-black text-xs tracking-widest border border-red-900/30 px-4 py-2 rounded-xl">ESCAPAR</button>
          </div>

          {step === 1 && (
            <div className="space-y-8 animate-in fade-in duration-700">
              <h2 className="text-2xl font-bold text-gray-300 text-center italic">"Todo gran miedo comienza con una atmósfera..."</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {atmospheres.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => { setAtmosphere(a.name); setStep(2); }}
                    className="p-8 rounded-[2.5rem] bg-[#252525] border-2 border-transparent hover:border-red-600/50 hover:bg-[#2A2A2A] transition-all group flex flex-col items-center text-center gap-4"
                  >
                    <div className="text-5xl group-hover:scale-110 transition-transform mb-2 grayscale group-hover:grayscale-0">{a.icon}</div>
                    <h3 className="text-xl font-bold text-red-500">{a.name}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed italic">"{a.desc}"</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in slide-in-from-right-8 duration-700">
              <h2 className="text-2xl font-bold text-gray-300 text-center italic">"¿Qué sonido rompe el silencio en tu {atmosphere}?"</h2>
              <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto">
                {sounds.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => { setSound(s.name); setStep(3); }}
                    className="p-6 rounded-2xl bg-[#252525] border border-red-900/20 hover:border-red-600 text-left transition-all group"
                  >
                    <p className="text-red-500 font-bold text-lg mb-1 group-hover:translate-x-2 transition-transform">🔊 {s.name}</p>
                    <p className="text-gray-400 text-sm italic">{s.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in zoom-in duration-700 text-center py-8">
               <div className="inline-block p-1 bg-gradient-to-br from-red-600 to-black rounded-[3rem]">
                  <div className="bg-[#1A1A1A] p-10 md:p-16 rounded-[2.8rem] space-y-6">
                    <p className="text-red-600 font-black uppercase tracking-[0.2em] text-xs">Fragmento de tu Obra</p>
                    <p className="text-2xl md:text-3xl text-gray-300 leading-relaxed italic max-w-xl">
                      "Entré en aquel <span className="text-red-500 font-bold">{atmosphere}</span>. El aire era pesado y olía a olvido. De pronto, un <span className="text-red-500 font-bold">{sound}</span> heló mi sangre. Algo me observaba desde las sombras, algo que no tenía nombre..."
                    </p>
                  </div>
               </div>

               <div className="max-w-md mx-auto space-y-6">
                  <p className="text-gray-500 text-sm font-medium">Has dominado el uso de la <strong>atmósfera</strong> y el <strong>sensor acústico</strong> para generar suspenso literario.</p>
                  <div className="flex gap-4">
                    <Button onClick={() => setStep(1)} className="flex-1 bg-red-950 text-red-500 hover:bg-red-900 py-4 rounded-2xl font-bold border border-red-900/30">Reescribir</Button>
                    <Button onClick={() => router.back()} className="flex-1 bg-red-600 hover:bg-red-700 py-4 rounded-2xl font-bold shadow-[0_10px_20px_rgba(220,38,38,0.3)]">Guardar Relato</Button>
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
