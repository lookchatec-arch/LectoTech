"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

const GRAFITIS = [
  { p: "Donde hay amor, hay...", o: ["Guerra", "Paz", "Ruido"], c: "Paz" },
  { p: "La imaginación no tiene...", o: ["Límites", "Pies", "Sabor"], c: "Límites" },
  { p: "Prefiero un minuto de vida a cien años de...", o: ["Sueño", "Tristeza", "Miedo"], c: "Miedo" }
];

export default function GrafitisPage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleSelect = (option: string) => {
    if (option === GRAFITIS[index].c) {
      setScore(score + 30);
    }
    if (index < GRAFITIS.length - 1) {
      setIndex(index + 1);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div className="min-h-screen bg-pink-50 p-8 flex items-center justify-center">
        <Card className="max-w-md w-full p-12 text-center rounded-[3rem] shadow-2xl border-4 border-white">
          <div className="text-8xl mb-6">🎨</div>
          <h2 className="text-3xl font-black text-pink-600 mb-4">¡Artista Urbano!</h2>
          <p className="text-xl text-gray-600 mb-8">Has completado tus grafitis poéticos con éxito.</p>
          <div className="bg-pink-100 p-6 rounded-2xl mb-8">
            <p className="text-5xl font-black text-pink-600">{score} 🌟</p>
          </div>
          <Button onClick={() => router.push('/dashboard')} className="w-full bg-pink-600 hover:bg-pink-700 py-6 text-xl rounded-2xl">
            Volver al Mapa
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] p-4 md:p-8 flex flex-col items-center">
      <header className="w-full max-w-4xl flex justify-between items-center mb-12">
        <button onClick={() => router.push('/dashboard')} className="text-pink-400 font-black bg-white/10 px-4 py-2 rounded-xl shadow-sm border border-white/20">← Salir</button>
        <div className="bg-white/10 px-6 py-2 rounded-full shadow-sm font-black text-pink-400 border border-white/20">Puntos: {score}</div>
      </header>
      <main className="w-full max-w-2xl text-center">
        <h1 className="text-3xl font-black text-white mb-12">Completa el Grafiti Poético</h1>
        <Card className="p-16 rounded-[3rem] bg-pink-600 shadow-2xl border-none mb-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10 opacity-50 mix-blend-overlay" style={{backgroundImage: 'url("https://www.transparenttextures.com/patterns/brick-wall.png")'}}></div>
          <h2 className="text-4xl font-black text-white relative z-10 font-serif">"{GRAFITIS[index].p}"</h2>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {GRAFITIS[index].o.map(opt => (
            <button key={opt} onClick={() => handleSelect(opt)} className="p-6 bg-white/5 hover:bg-pink-600 text-white border-2 border-white/20 rounded-2xl font-bold text-xl transition-all hover:scale-105">
              {opt}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
