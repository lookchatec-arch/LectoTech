"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

const PASOS_TERROR = [
  { p: "Entras a una casa abandonada y escuchas un...", o: ["Grito", "Susurro", "Silencio"], c: "Susurro" },
  { p: "En la pared ves una sombra que...", o: ["Baila", "Te señala", "Desaparece"], c: "Te señala" },
  { p: "De repente, la puerta se cierra con un...", o: ["Estruendo", "Click", "Golpe"], c: "Estruendo" }
];

export default function TerrorPage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleSelect = (option: string) => {
    if (option === PASOS_TERROR[index].c) {
      setScore(score + 30);
    }
    if (index < PASOS_TERROR.length - 1) {
      setIndex(index + 1);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div className="min-h-screen bg-slate-900 p-8 flex items-center justify-center text-white">
        <Card className="max-w-md w-full p-12 text-center rounded-[3rem] shadow-2xl border-4 border-slate-700 bg-slate-800">
          <div className="text-8xl mb-6">👻</div>
          <h2 className="text-3xl font-black text-white mb-4">¡Maestro del Suspenso!</h2>
          <p className="text-xl text-slate-400 mb-8">Has sobrevivido al relato de terror.</p>
          <div className="bg-slate-700 p-6 rounded-2xl mb-8">
            <p className="text-5xl font-black text-white">{score} 🌟</p>
          </div>
          <Button onClick={() => router.push('/dashboard')} className="w-full bg-slate-600 hover:bg-slate-500 py-6 text-xl rounded-2xl border border-white/20">
            Volver al Mapa
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-4 md:p-8 flex flex-col items-center">
      <header className="w-full max-w-4xl flex justify-between items-center mb-12">
        <button onClick={() => router.push('/dashboard')} className="text-slate-400 font-black bg-white/5 px-4 py-2 rounded-xl border border-white/10">← Huir</button>
        <div className="bg-white/5 px-6 py-2 rounded-full font-black text-slate-400 border border-white/10">Suspenso: {score}%</div>
      </header>
      <main className="w-full max-w-2xl text-center">
        <h1 className="text-3xl font-black text-white mb-12">Continúa el Relato</h1>
        <Card className="p-16 rounded-[3rem] bg-slate-900 shadow-2xl border border-white/10 mb-12 relative overflow-hidden group">
          <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <h2 className="text-3xl font-black text-slate-200 leading-relaxed italic">"{PASOS_TERROR[index].p}"</h2>
        </Card>
        <div className="grid grid-cols-1 gap-4">
          {PASOS_TERROR[index].o.map(opt => (
            <button key={opt} onClick={() => handleSelect(opt)} className="p-6 bg-slate-800/50 hover:bg-red-900 text-slate-300 border border-white/10 rounded-2xl font-bold text-xl transition-all">
              {opt}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
