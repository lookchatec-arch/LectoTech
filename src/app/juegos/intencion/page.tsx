"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

const INTENCIONES = [
  { t: "¡Por favor, ayúdame con la tarea!", i: "Persuadir" },
  { t: "La reunión es mañana a las diez.", i: "Informar" },
  { t: "¡Te quiero muchísimo, mamá!", i: "Expresar" },
  { t: "¡Vota por nuestra lista escolar!", i: "Persuadir" },
  { t: "El gato es un animal carnívoro.", i: "Informar" }
];

export default function IntencionPage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleSelect = (intencion: string) => {
    if (intencion === INTENCIONES[index].i) {
      setScore(score + 20);
    }
    if (index < INTENCIONES.length - 1) {
      setIndex(index + 1);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div className="min-h-screen bg-red-50 p-8 flex items-center justify-center">
        <Card className="max-w-md w-full p-12 text-center rounded-[3rem] shadow-2xl border-4 border-white">
          <div className="text-8xl mb-6">🎯</div>
          <h2 className="text-3xl font-black text-red-600 mb-4">¡Maestro de Intenciones!</h2>
          <p className="text-xl text-gray-600 mb-8">Sabes exactamente por qué la gente dice lo que dice.</p>
          <div className="bg-red-100 p-6 rounded-2xl mb-8">
            <p className="text-5xl font-black text-red-600">{score} 🌟</p>
          </div>
          <Button onClick={() => router.push('/dashboard')} className="w-full bg-red-600 hover:bg-red-700 py-6 text-xl rounded-2xl">
            Volver al Mapa
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex flex-col items-center">
      <header className="w-full max-w-4xl flex justify-between items-center mb-12">
        <button onClick={() => router.push('/dashboard')} className="text-red-600 font-black bg-white px-4 py-2 rounded-xl shadow-sm">← Salir</button>
        <div className="bg-white px-6 py-2 rounded-full shadow-sm font-black text-red-600">Puntos: {score}</div>
      </header>
      <main className="w-full max-w-2xl text-center">
        <h1 className="text-3xl font-black text-gray-800 mb-8">¿Cuál es la intención de este mensaje?</h1>
        <Card className="p-12 rounded-[2.5rem] bg-white shadow-xl border-none mb-12">
          <h2 className="text-3xl font-black text-red-700 leading-relaxed">"{INTENCIONES[index].t}"</h2>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button onClick={() => handleSelect("Informar")} className="p-6 bg-blue-500 text-white rounded-2xl font-bold text-xl shadow-lg hover:scale-105 transition-transform">Informar</button>
          <button onClick={() => handleSelect("Persuadir")} className="p-6 bg-green-500 text-white rounded-2xl font-bold text-xl shadow-lg hover:scale-105 transition-transform">Persuadir</button>
          <button onClick={() => handleSelect("Expresar")} className="p-6 bg-pink-500 text-white rounded-2xl font-bold text-xl shadow-lg hover:scale-105 transition-transform">Expresar</button>
        </div>
      </main>
    </div>
  );
}
