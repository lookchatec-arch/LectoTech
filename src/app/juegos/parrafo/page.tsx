"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

const PARRAFO_ORDENADO = [
  "Platero es un burro pequeño, peludo y suave.",
  "Tiene los ojos negros y brillantes como escarabajos.",
  "Le gusta comer naranjas, uvas y granadas.",
  "Es tan blando por fuera que parece de algodón."
];

export default function ParrafoPage() {
  const router = useRouter();
  const [sentences, setSentences] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    // Shuffle sentences
    setSentences([...PARRAFO_ORDENADO].sort(() => Math.random() - 0.5));
  }, []);

  const moveSentence = (fromIndex: number, toIndex: number) => {
    const newSentences = [...sentences];
    const [moved] = newSentences.splice(fromIndex, 1);
    newSentences.splice(toIndex, 0, moved);
    setSentences(newSentences);
  };

  const checkOrder = () => {
    const isCorrect = sentences.every((s, i) => s === PARRAFO_ORDENADO[i]);
    if (isCorrect) {
      setFinished(true);
    } else {
      alert("¡Casi! Revisa el orden lógico de las ideas.");
    }
  };

  if (finished) {
    return (
      <div className="min-h-screen bg-pink-50 p-8 flex items-center justify-center">
        <Card className="max-w-md w-full p-12 text-center rounded-[3rem] shadow-2xl border-4 border-white">
          <div className="text-8xl mb-6">✍️</div>
          <h2 className="text-3xl font-black text-pink-600 mb-4">¡Arquitecto de Párrafos!</h2>
          <p className="text-xl text-gray-600 mb-8">Has construido un párrafo coherente y descriptivo.</p>
          <Button onClick={() => router.push('/dashboard')} className="w-full bg-pink-600 hover:bg-pink-700 py-6 text-xl rounded-2xl">
            Volver al Mapa
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <header className="max-w-4xl mx-auto mb-12 flex justify-between items-center">
        <button onClick={() => router.push('/dashboard')} className="text-pink-600 font-black bg-white px-4 py-2 rounded-xl shadow-sm">← Salir</button>
        <h1 className="text-2xl font-black text-gray-800">El Párrafo Loco ✍️</h1>
      </header>
      <main className="max-w-3xl mx-auto space-y-4">
        <p className="text-center text-gray-500 font-bold mb-8">Ordena las oraciones para describir a Platero:</p>
        {sentences.map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4 group hover:border-pink-300 border-2 border-transparent transition-all">
            <div className="flex flex-col gap-2">
              <button onClick={() => i > 0 && moveSentence(i, i - 1)} className="text-gray-300 hover:text-pink-500 disabled:opacity-20" disabled={i === 0}>▲</button>
              <button onClick={() => i < sentences.length - 1 && moveSentence(i, i + 1)} className="text-gray-300 hover:text-pink-500 disabled:opacity-20" disabled={i === sentences.length - 1}>▼</button>
            </div>
            <p className="font-bold text-gray-700 flex-1">{s}</p>
          </div>
        ))}
        <Button onClick={checkOrder} className="w-full bg-pink-600 hover:bg-pink-700 py-8 text-2xl font-black rounded-[2rem] mt-12 shadow-xl">
          ¡Verificar Orden! 🎯
        </Button>
      </main>
    </div>
  );
}
