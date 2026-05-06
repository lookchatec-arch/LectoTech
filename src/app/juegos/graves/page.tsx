"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

const PALABRAS_GRAVES = [
  { p: "Árbol", c: true }, { p: "Café", c: false }, { p: "Lápiz", c: true },
  { p: "León", c: false }, { p: "Mesa", c: true }, { p: "Azul", c: false },
  { p: "Joven", c: true }, { p: "Pared", c: false }, { p: "Cárcel", c: true },
  { p: "Fácil", c: true }, { p: "Ratón", c: false }, { p: "Camino", c: true }
];

export default function GravesPage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<null | boolean>(null);
  const [finished, setFinished] = useState(false);

  const handleSelect = (userChoice: boolean) => {
    const isCorrect = userChoice === PALABRAS_GRAVES[index].c;
    if (isCorrect) {
      setScore(score + 10);
      setFeedback(true);
    } else {
      setFeedback(false);
    }
    setTimeout(() => {
      setFeedback(null);
      if (index < PALABRAS_GRAVES.length - 1) {
        setIndex(index + 1);
      } else {
        setFinished(true);
      }
    }, 1000);
  };

  if (finished) {
    return (
      <div className="min-h-screen bg-indigo-50 p-8 flex items-center justify-center">
        <Card className="max-w-md w-full p-12 text-center rounded-[3rem] shadow-2xl border-4 border-white">
          <div className="text-8xl mb-6">⚖️</div>
          <h2 className="text-3xl font-black text-indigo-600 mb-4">¡Maestro del Equilibrio!</h2>
          <p className="text-xl text-gray-600 mb-8">Dominas las palabras graves a la perfección.</p>
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
        <button onClick={() => router.push('/dashboard')} className="bg-white px-4 py-2 rounded-xl shadow-sm font-black text-indigo-600">← Salir</button>
        <div className="bg-white px-6 py-2 rounded-full shadow-sm font-black text-indigo-600">Puntos: {score}</div>
      </header>
      <main className="w-full max-w-2xl text-center">
        <h1 className="text-4xl font-black text-gray-800 mb-4">¿Es una palabra Grave?</h1>
        <p className="text-gray-500 mb-12 font-bold">(Recuerda: acento en la penúltima sílaba)</p>
        <Card className="p-16 rounded-[3rem] bg-white shadow-xl border-none mb-12">
          <h2 className="text-7xl font-black text-indigo-600 animate-pulse">{PALABRAS_GRAVES[index].p}</h2>
        </Card>
        <div className="grid grid-cols-2 gap-6">
          <button onClick={() => handleSelect(true)} disabled={feedback !== null} className="bg-green-500 text-white p-8 rounded-[2rem] font-black text-2xl shadow-lg hover:scale-105 transition-transform">SÍ ✅</button>
          <button onClick={() => handleSelect(false)} disabled={feedback !== null} className="bg-red-500 text-white p-8 rounded-[2rem] font-black text-2xl shadow-lg hover:scale-105 transition-transform">NO ❌</button>
        </div>
        {feedback !== null && (
          <div className={`mt-8 text-2xl font-black ${feedback ? 'text-green-500' : 'text-red-500'} animate-bounce`}>
            {feedback ? "¡EXCELENTE! 🎯" : "INTÉNTALO DE NUEVO 🔄"}
          </div>
        )}
      </main>
    </div>
  );
}
