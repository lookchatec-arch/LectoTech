"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

const TERMINOS = [
  { t: "Padre", v: "Formal" },
  { t: "Pana", v: "Informal/Regional" },
  { t: "Compañero", v: "Formal" },
  { t: "Mande", v: "Informal/Regional" },
  { t: "Amigo", v: "Formal" },
  { t: "Guambra", v: "Informal/Regional" }
];

export default function VariedadesPage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleSelect = (variedad: string) => {
    if (variedad === TERMINOS[index].v) {
      setScore(score + 15);
    }
    if (index < TERMINOS.length - 1) {
      setIndex(index + 1);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div className="min-h-screen bg-cyan-50 p-8 flex items-center justify-center">
        <Card className="max-w-md w-full p-12 text-center rounded-[3rem] shadow-2xl border-4 border-white">
          <div className="text-8xl mb-6">🌐</div>
          <h2 className="text-3xl font-black text-cyan-600 mb-4">¡Ciudadano del Mundo!</h2>
          <p className="text-xl text-gray-600 mb-8">Entiendes la riqueza de las variaciones del lenguaje.</p>
          <div className="bg-cyan-100 p-6 rounded-2xl mb-8">
            <p className="text-5xl font-black text-cyan-600">{score} 🌟</p>
          </div>
          <Button onClick={() => router.push('/dashboard')} className="w-full bg-cyan-600 hover:bg-cyan-700 py-6 text-xl rounded-2xl">
            Volver al Mapa
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex flex-col items-center">
      <header className="w-full max-w-4xl flex justify-between items-center mb-12">
        <button onClick={() => router.push('/dashboard')} className="text-cyan-600 font-black bg-white px-4 py-2 rounded-xl shadow-sm">← Salir</button>
        <div className="bg-white px-6 py-2 rounded-full shadow-sm font-black text-cyan-600">Puntos: {score}</div>
      </header>
      <main className="w-full max-w-2xl text-center">
        <h1 className="text-3xl font-black text-gray-800 mb-8">¿Qué tipo de lenguaje es?</h1>
        <Card className="p-16 rounded-[3rem] bg-white shadow-xl border-none mb-12 border-b-8 border-cyan-400">
          <h2 className="text-6xl font-black text-cyan-700 animate-pulse">{TERMINOS[index].t}</h2>
        </Card>
        <div className="grid grid-cols-2 gap-6">
          <button onClick={() => handleSelect("Formal")} className="bg-blue-500 text-white p-8 rounded-[2rem] font-black text-2xl shadow-lg hover:scale-105 transition-transform">Formal</button>
          <button onClick={() => handleSelect("Informal/Regional")} className="bg-orange-500 text-white p-8 rounded-[2rem] font-black text-xl shadow-lg hover:scale-105 transition-transform">Informal / Regional</button>
        </div>
      </main>
    </div>
  );
}
