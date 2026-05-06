"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

const TRABALENGUAS = [
  "Pablito clavó un clavito en la calva de un calvito.",
  "Tres tristes tigres tragaban trigo en un trigal.",
  "Pepe Pecas pica papas con un pico.",
  "Como poco coco como, poco coco compro."
];

export default function TrabalenguasPage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer(t => t + 1);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleNext = () => {
    if (index < TRABALENGUAS.length - 1) {
      setIndex(index + 1);
    } else {
      setIsRunning(false);
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div className="min-h-screen bg-orange-50 p-8 flex items-center justify-center">
        <Card className="max-w-md w-full p-12 text-center rounded-[3rem] shadow-2xl border-4 border-white">
          <div className="text-8xl mb-6">👅</div>
          <h2 className="text-3xl font-black text-orange-600 mb-4">¡Agilidad Mental!</h2>
          <p className="text-xl text-gray-600 mb-8">Has completado los trabalenguas en {(timer/10).toFixed(1)} segundos.</p>
          <Button onClick={() => router.push('/dashboard')} className="w-full bg-orange-600 hover:bg-orange-700 py-6 text-xl rounded-2xl">
            Volver al Mapa
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex flex-col items-center">
      <header className="w-full max-w-4xl flex justify-between items-center mb-12">
        <button onClick={() => router.push('/dashboard')} className="text-orange-600 font-black bg-white px-4 py-2 rounded-xl shadow-sm">← Salir</button>
        <div className="bg-white px-6 py-2 rounded-full shadow-sm font-black text-orange-600">Tiempo: {(timer/10).toFixed(1)}s</div>
      </header>
      <main className="w-full max-w-2xl text-center">
        <h1 className="text-3xl font-black text-gray-800 mb-4">¡Dilo lo más rápido posible!</h1>
        <p className="text-gray-500 mb-12 font-bold">(Haz clic en el botón cuando termines cada uno)</p>
        <Card className="p-16 rounded-[3rem] bg-white shadow-xl border-none mb-12">
          <h2 className="text-4xl font-black text-orange-600 leading-tight">{TRABALENGUAS[index]}</h2>
        </Card>
        {!isRunning && index === 0 ? (
          <Button onClick={() => setIsRunning(true)} className="w-full bg-orange-600 hover:bg-orange-700 py-8 text-2xl font-black rounded-[2rem] shadow-xl">
            ¡Comenzar Reto! 🏁
          </Button>
        ) : (
          <Button onClick={handleNext} className="w-full bg-green-500 hover:bg-green-600 py-8 text-2xl font-black rounded-[2rem] shadow-xl">
            ¡Siguiente! ➡️
          </Button>
        )}
      </main>
    </div>
  );
}
