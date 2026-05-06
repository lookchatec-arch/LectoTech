"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

const FIGURAS = [
  { t: "La escuela estaba triste sin niños.", f: "Personificación" },
  { t: "Tengo tanta sed que me bebería el océano.", f: "Hipérbole" },
  { t: "El sol nos sonreía desde lo alto.", f: "Personificación" },
  { t: "Te lo he dicho mil millones de veces.", f: "Hipérbole" },
  { t: "El viento soplaba con furia.", f: "Personificación" }
];

export default function FigurasPage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleSelect = (figura: string) => {
    if (figura === FIGURAS[index].f) {
      setScore(score + 20);
    }
    if (index < FIGURAS.length - 1) {
      setIndex(index + 1);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div className="min-h-screen bg-purple-50 p-8 flex items-center justify-center">
        <Card className="max-w-md w-full p-12 text-center rounded-[3rem] shadow-2xl border-4 border-white">
          <div className="text-8xl mb-6">🧙</div>
          <h2 className="text-3xl font-black text-purple-600 mb-4">¡Mago Literario!</h2>
          <p className="text-xl text-gray-600 mb-8">Dominas las figuras de dicción como un experto.</p>
          <div className="bg-purple-100 p-6 rounded-2xl mb-8">
            <p className="text-5xl font-black text-purple-600">{score} 🌟</p>
          </div>
          <Button onClick={() => router.push('/dashboard')} className="w-full bg-purple-600 hover:bg-purple-700 py-6 text-xl rounded-2xl">
            Volver al Mapa
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex flex-col items-center">
      <header className="w-full max-w-4xl flex justify-between items-center mb-12">
        <button onClick={() => router.push('/dashboard')} className="text-purple-600 font-black bg-white px-4 py-2 rounded-xl shadow-sm">← Salir</button>
        <div className="bg-white px-6 py-2 rounded-full shadow-sm font-black text-purple-600">Reto: {index + 1}/5</div>
      </header>
      <main className="w-full max-w-2xl text-center">
        <h1 className="text-3xl font-black text-gray-800 mb-8">¿Qué figura literaria es?</h1>
        <Card className="p-12 rounded-[2.5rem] bg-white shadow-xl border-none mb-12">
          <h2 className="text-3xl font-black text-purple-700 leading-relaxed">"{FIGURAS[index].t}"</h2>
        </Card>
        <div className="grid grid-cols-2 gap-6">
          <button onClick={() => handleSelect("Personificación")} className="bg-purple-500 text-white p-8 rounded-[2rem] font-black text-xl shadow-lg hover:scale-105 transition-transform">Personificación</button>
          <button onClick={() => handleSelect("Hipérbole")} className="bg-purple-700 text-white p-8 rounded-[2rem] font-black text-xl shadow-lg hover:scale-105 transition-transform">Hipérbole</button>
        </div>
      </main>
    </div>
  );
}
