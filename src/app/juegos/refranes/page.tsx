"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

const REFRANES = [
  { r: "A palabras necias, oídos sordos.", m: "Ignorar comentarios sin fundamento." },
  { r: "Del dicho al hecho hay mucho trecho.", m: "Hay diferencia entre lo que se dice y se hace." },
  { r: "Camarón que se duerme, se lo lleva la corriente.", m: "Hay que estar atentos para no perder oportunidades." },
  { r: "Más vale pájaro en mano que ciento volando.", m: "Es mejor asegurar lo que se tiene." }
];

export default function RefranesPage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleSelect = (meaning: string) => {
    if (meaning === REFRANES[index].m) {
      setScore(score + 25);
    }
    if (index < REFRANES.length - 1) {
      setIndex(index + 1);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div className="min-h-screen bg-emerald-50 p-8 flex items-center justify-center">
        <Card className="max-w-md w-full p-12 text-center rounded-[3rem] shadow-2xl border-4 border-white">
          <div className="text-8xl mb-6">🗣️</div>
          <h2 className="text-3xl font-black text-emerald-600 mb-4">¡Sabio de Refranes!</h2>
          <p className="text-xl text-gray-600 mb-8">Has demostrado gran conocimiento de la sabiduría popular.</p>
          <div className="bg-emerald-100 p-6 rounded-2xl mb-8">
            <p className="text-5xl font-black text-emerald-600">{score} 🌟</p>
          </div>
          <Button onClick={() => router.push('/dashboard')} className="w-full bg-emerald-600 hover:bg-emerald-700 py-6 text-xl rounded-2xl">
            Volver al Mapa
          </Button>
        </Card>
      </div>
    );
  }

  const options = [...REFRANES].map(r => r.m).sort(() => Math.random() - 0.5);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex flex-col items-center">
      <header className="w-full max-w-4xl flex justify-between items-center mb-12">
        <button onClick={() => router.push('/dashboard')} className="text-emerald-600 font-black bg-white px-4 py-2 rounded-xl shadow-sm">← Salir</button>
        <div className="bg-white px-6 py-2 rounded-full shadow-sm font-black text-emerald-600">Puntos: {score}</div>
      </header>
      <main className="w-full max-w-2xl text-center">
        <h1 className="text-3xl font-black text-gray-800 mb-8">¿Qué significa este refrán?</h1>
        <Card className="p-12 rounded-[2.5rem] bg-white shadow-xl border-none mb-12 border-l-8 border-emerald-500">
          <h2 className="text-3xl font-black text-emerald-700 italic">"{REFRANES[index].r}"</h2>
        </Card>
        <div className="space-y-4">
          {options.map(opt => (
            <button key={opt} onClick={() => handleSelect(opt)} className="w-full p-6 bg-white border-2 border-gray-100 hover:border-emerald-500 rounded-2xl font-bold text-lg shadow-sm transition-all hover:-translate-y-1">
              {opt}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
