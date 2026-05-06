"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

const PREGUNTAS_RONDAS = [
  { q: "¿Cómo se mueven usualmente los niños en una ronda?", a: "En círculo", o: ["En línea", "En círculo", "Saltando"] },
  { q: "¿Qué suelen hacer mientras se mueven?", a: "Cantar", o: ["Escribir", "Cantar", "Dormir"] },
  { q: "¿Cuál es el objetivo principal de la ronda?", a: "Jugar y divertirse", o: ["Estudiar", "Jugar y divertirse", "Comer"] },
  { q: "¿Qué suelen pedirse en las rondas antiguas?", a: "Prosperidad", o: ["Prosperidad", "Dinero", "Juguetes"] }
];

export default function RondasPage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleSelect = (opt: string) => {
    if (opt === PREGUNTAS_RONDAS[index].a) {
      setScore(score + 25);
    }
    if (index < PREGUNTAS_RONDAS.length - 1) {
      setIndex(index + 1);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div className="min-h-screen bg-blue-50 p-8 flex items-center justify-center">
        <Card className="max-w-md w-full p-12 text-center rounded-[3rem] shadow-2xl border-4 border-white">
          <div className="text-8xl mb-6">🎶</div>
          <h2 className="text-3xl font-black text-blue-600 mb-4">¡Espíritu de Ronda!</h2>
          <p className="text-xl text-gray-600 mb-8">Conoces muy bien la alegría de las canciones circulares.</p>
          <div className="bg-blue-100 p-6 rounded-2xl mb-8">
            <p className="text-5xl font-black text-blue-600">{score} 🌟</p>
          </div>
          <Button onClick={() => router.push('/dashboard')} className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-xl rounded-2xl">
            Volver al Mapa
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex flex-col items-center">
      <header className="w-full max-w-4xl flex justify-between items-center mb-12">
        <button onClick={() => router.push('/dashboard')} className="text-blue-600 font-black bg-white px-4 py-2 rounded-xl shadow-sm">← Salir</button>
        <div className="bg-white px-6 py-2 rounded-full shadow-sm font-black text-blue-600">Pregunta: {index + 1}/4</div>
      </header>
      <main className="w-full max-w-2xl text-center">
        <h1 className="text-3xl font-black text-gray-800 mb-12">{PREGUNTAS_RONDAS[index].q}</h1>
        <div className="grid grid-cols-1 gap-4">
          {PREGUNTAS_RONDAS[index].o.map(opt => (
            <button key={opt} onClick={() => handleSelect(opt)} className="p-6 bg-white border-2 border-gray-100 hover:border-blue-400 rounded-2xl font-bold text-xl shadow-sm transition-all hover:-translate-y-1">
              {opt}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
