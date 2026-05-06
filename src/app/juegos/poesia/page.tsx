"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

const POEMAS = [
  { v: "Tus cabellos son de oro.", m: "Cabello rubio", o: ["Cabello rubio", "Cabello sucio", "Cabello largo"] },
  { v: "Las perlas de tu boca.", m: "Dientes blancos", o: ["Joyas", "Dientes blancos", "Palabras"] },
  { v: "El tambor de tu pecho.", m: "Corazón", o: ["Corazón", "Pulmón", "Voz"] }
];

export default function PoesiaPage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleSelect = (option: string) => {
    if (option === POEMAS[index].m) {
      setScore(score + 30);
    }
    if (index < POEMAS.length - 1) {
      setIndex(index + 1);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div className="min-h-screen bg-indigo-50 p-8 flex items-center justify-center">
        <Card className="max-w-md w-full p-12 text-center rounded-[3rem] shadow-2xl border-4 border-white">
          <div className="text-8xl mb-6">✒️</div>
          <h2 className="text-3xl font-black text-indigo-600 mb-4">¡Poeta en Potencia!</h2>
          <p className="text-xl text-gray-600 mb-8">Entiendes perfectamente el lenguaje del alma.</p>
          <div className="bg-indigo-100 p-6 rounded-2xl mb-8">
            <p className="text-5xl font-black text-indigo-600">{score} 🌟</p>
          </div>
          <Button onClick={() => router.push('/dashboard')} className="w-full bg-indigo-600 hover:bg-indigo-700 py-6 text-xl rounded-2xl">
            Volver al Mapa
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex flex-col items-center">
      <header className="w-full max-w-4xl flex justify-between items-center mb-12">
        <button onClick={() => router.push('/dashboard')} className="text-indigo-600 font-black bg-white px-4 py-2 rounded-xl shadow-sm">← Salir</button>
        <div className="bg-white px-6 py-2 rounded-full shadow-sm font-black text-indigo-600">Poesía: {score} pts</div>
      </header>
      <main className="w-full max-w-2xl text-center">
        <h1 className="text-3xl font-black text-gray-800 mb-8">¿Qué significa esta metáfora?</h1>
        <Card className="p-16 rounded-[3rem] bg-white shadow-xl border-none mb-12 border-t-8 border-indigo-400">
          <h2 className="text-4xl font-black text-indigo-700 italic">"{POEMAS[index].v}"</h2>
        </Card>
        <div className="grid grid-cols-1 gap-4">
          {POEMAS[index].o.map(opt => (
            <button key={opt} onClick={() => handleSelect(opt)} className="p-6 bg-white border-2 border-gray-100 hover:border-indigo-500 rounded-2xl font-bold text-xl shadow-sm transition-all hover:-translate-y-1">
              {opt}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
