"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

const ELEMENTOS_GUIA = [
  { p: "¿Qué elemento indica el nombre del lugar a visitar?", options: ["Mapa", "Título", "Precio"], correct: "Título" },
  { p: "¿Qué muestra la ubicación exacta y rutas?", options: ["Mapa", "Foto", "Horario"], correct: "Mapa" },
  { p: "¿Qué explica los atractivos y servicios?", options: ["Descripción", "Título", "Autor"], correct: "Descripción" },
  { p: "¿Qué ayuda a ver cómo es el lugar visualmente?", options: ["Texto", "Fotografía", "Índice"], correct: "Fotografía" }
];

export default function GuiaPage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleSelect = (option: string) => {
    if (option === ELEMENTOS_GUIA[index].correct) {
      setScore(score + 25);
    }
    if (index < ELEMENTOS_GUIA.length - 1) {
      setIndex(index + 1);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div className="min-h-screen bg-green-50 p-8 flex items-center justify-center">
        <Card className="max-w-md w-full p-12 text-center rounded-[3rem] shadow-2xl border-4 border-white">
          <div className="text-8xl mb-6">📸</div>
          <h2 className="text-3xl font-black text-green-600 mb-4">¡Guía Experto!</h2>
          <p className="text-xl text-gray-600 mb-8">Sabes exactamente qué necesita un turista para su viaje.</p>
          <div className="bg-green-100 p-6 rounded-2xl mb-8">
            <p className="text-5xl font-black text-green-600">{score} 🌟</p>
          </div>
          <Button onClick={() => router.push('/dashboard')} className="w-full bg-green-600 hover:bg-green-700 py-6 text-xl rounded-2xl">
            Volver al Mapa
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex flex-col items-center">
      <header className="w-full max-w-4xl flex justify-between items-center mb-12">
        <button onClick={() => router.push('/dashboard')} className="text-green-600 font-black bg-white px-4 py-2 rounded-xl shadow-sm">← Salir</button>
        <div className="bg-white px-6 py-2 rounded-full shadow-sm font-black text-green-600">Misión: {index + 1}/4</div>
      </header>
      <main className="w-full max-w-2xl text-center">
        <h1 className="text-3xl font-black text-gray-800 mb-8">{ELEMENTOS_GUIA[index].p}</h1>
        <div className="space-y-4">
          {ELEMENTOS_GUIA[index].options.map(opt => (
            <button key={opt} onClick={() => handleSelect(opt)} className="w-full p-6 bg-white border-2 border-gray-100 hover:border-green-500 rounded-2xl font-bold text-xl shadow-sm transition-all hover:-translate-y-1">
              {opt}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
