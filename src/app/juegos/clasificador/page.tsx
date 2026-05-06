"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

const FRASES = [
  { texto: "El agua hierve a 100 grados centígrados.", tipo: "Objetivo", explicacion: "Es un hecho comprobable científicamente." },
  { texto: "Esa película es la más aburrida que he visto.", tipo: "Subjetivo", explicacion: "Es una opinión personal; a otros les puede gustar." },
  { texto: "Quito es la capital de Ecuador.", tipo: "Objetivo", explicacion: "Es un dato geográfico y político real." },
  { texto: "El color azul es más bonito que el rojo.", tipo: "Subjetivo", explicacion: "Es un gusto personal." },
  { texto: "Los perros tienen cuatro patas.", tipo: "Objetivo", explicacion: "Es una característica física observable de la especie." },
  { texto: "Esa sopa huele delicioso.", tipo: "Subjetivo", explicacion: "La percepción del olor depende de cada persona." },
];

export default function ClasificadorPage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ correct: boolean, msg: string } | null>(null);
  const [finished, setFinished] = useState(false);

  const handleSelect = (tipo: string) => {
    const isCorrect = FRASES[index].tipo === tipo;
    if (isCorrect) {
      setScore(score + 10);
      setFeedback({ correct: true, msg: "¡Muy bien! " + FRASES[index].explicacion });
    } else {
      setFeedback({ correct: false, msg: "¡Oh no! " + FRASES[index].explicacion });
    }

    setTimeout(() => {
      setFeedback(null);
      if (index < FRASES.length - 1) {
        setIndex(index + 1);
      } else {
        setFinished(true);
      }
    }, 3000);
  };

  if (finished) {
    return (
      <div className="min-h-screen bg-[var(--color-paper-cream)] p-8 flex items-center justify-center">
        <Card className="max-w-md w-full p-12 text-center rounded-[3rem] shadow-2xl border-4 border-white">
          <div className="text-8xl mb-6">⚖️</div>
          <h2 className="text-3xl font-black text-[#2A5C82] mb-4">¡Maestro de la Verdad!</h2>
          <p className="text-xl text-gray-600 mb-8">Ahora sabes distinguir entre la realidad y las opiniones.</p>
          <div className="bg-green-50 p-6 rounded-2xl mb-8">
            <p className="text-sm font-bold text-green-600 uppercase">Puntaje</p>
            <p className="text-5xl font-black text-[#4CAF50]">{score} 🌟</p>
          </div>
          <Button onClick={() => router.push('/dashboard')} className="w-full bg-[#4CAF50] hover:bg-green-600 py-6 text-xl rounded-2xl shadow-lg">
            Volver al Mapa
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <header className="max-w-4xl mx-auto mb-12 flex justify-between items-center">
        <button onClick={() => router.push('/dashboard')} className="text-[#2A5C82] font-black bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
          ← Salir
        </button>
        <div className="flex items-center gap-4">
          <div className="hidden md:block h-3 w-48 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${((index + 1) / FRASES.length) * 100}%` }}></div>
          </div>
          <span className="font-black text-[#2A5C82]">Puntos: {score}</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-[#2A5C82] mb-2">¿Es un Hecho o una Opinión?</h1>
          <p className="text-gray-500 font-bold">Clasifica la siguiente oración:</p>
        </div>

        <Card className="bg-white rounded-[3rem] shadow-xl p-10 md:p-20 border-none mb-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-3 bg-[#2A5C82]"></div>
          <p className="text-2xl md:text-4xl font-bold text-center text-gray-800 leading-tight">
            "{FRASES[index].texto}"
          </p>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => handleSelect("Objetivo")}
            disabled={!!feedback}
            className={`p-8 rounded-[2.5rem] font-black text-2xl transition-all shadow-lg border-b-8
              ${feedback?.correct && FRASES[index].tipo === "Objetivo" ? 'bg-green-500 border-green-700 text-white translate-y-2' :
                feedback && FRASES[index].tipo !== "Objetivo" ? 'opacity-50 grayscale' :
                'bg-blue-600 border-blue-800 text-white hover:-translate-y-1 active:translate-y-2'}
            `}
          >
            HECHO (Objetivo)
          </button>

          <button
            onClick={() => handleSelect("Subjetivo")}
            disabled={!!feedback}
            className={`p-8 rounded-[2.5rem] font-black text-2xl transition-all shadow-lg border-b-8
              ${feedback?.correct && FRASES[index].tipo === "Subjetivo" ? 'bg-green-500 border-green-700 text-white translate-y-2' :
                feedback && FRASES[index].tipo !== "Subjetivo" ? 'opacity-50 grayscale' :
                'bg-purple-600 border-purple-800 text-white hover:-translate-y-1 active:translate-y-2'}
            `}
          >
            OPINIÓN (Subjetivo)
          </button>
        </div>

        {feedback && (
          <div className={`mt-12 p-8 rounded-3xl animate-in zoom-in duration-300 border-2
            ${feedback.correct ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}
          `}>
            <p className="text-xl font-black mb-2">{feedback.correct ? '🎯 ¡Excelente!' : '💡 Pista:'}</p>
            <p className="text-lg font-medium">{feedback.msg}</p>
          </div>
        )}
      </main>
    </div>
  );
}
