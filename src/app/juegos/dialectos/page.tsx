"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

const PALABRAS_DIALECTOS = [
  { palabra: "Guambra", region: "Sierra", desc: "Niño o joven." },
  { palabra: "Atarraya", region: "Costa", desc: "Red de pesca." },
  { palabra: "Chulla", region: "Sierra", desc: "Único, impar." },
  { palabra: "Mucha", region: "Sierra", desc: "Beso." },
  { palabra: "Caleta", region: "Costa", desc: "Casa." },
  { palabra: "Cance", region: "Costa", desc: "Permiso o espacio." },
  { palabra: "Chapa", region: "Sierra", desc: "Policía." },
  { palabra: "Lámpara", region: "Costa", desc: "Algo exagerado o falso." },
];

export default function DialectosPage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState<null | boolean>(null);
  const [finished, setFinished] = useState(false);

  const handleRegionSelect = (region: string) => {
    const isCorrect = PALABRAS_DIALECTOS[index].region === region;
    if (isCorrect) {
      setScore(score + 10);
      setShowFeedback(true);
    } else {
      setShowFeedback(false);
    }

    setTimeout(() => {
      setShowFeedback(null);
      if (index < PALABRAS_DIALECTOS.length - 1) {
        setIndex(index + 1);
      } else {
        setFinished(true);
      }
    }, 1500);
  };

  if (finished) {
    return (
      <div className="min-h-screen bg-[var(--color-paper-cream)] p-8 flex items-center justify-center">
        <Card className="max-w-md w-full p-12 text-center rounded-[3rem] shadow-2xl border-4 border-white">
          <div className="text-8xl mb-6">🇪🇨</div>
          <h2 className="text-3xl font-black text-[#2A5C82] mb-4">¡Excelente Explorador!</h2>
          <p className="text-xl text-gray-600 mb-8">Has aprendido sobre la riqueza cultural y lingüística de nuestro país.</p>
          <div className="bg-blue-50 p-6 rounded-2xl mb-8">
            <p className="text-sm font-bold text-blue-600 uppercase">Conocimiento Ganado</p>
            <p className="text-5xl font-black text-[#2A5C82]">{score} 🌟</p>
          </div>
          <Button onClick={() => router.push('/dashboard')} className="w-full bg-[#2A5C82] hover:bg-blue-900 py-6 text-xl rounded-2xl shadow-lg">
            Volver al Mapa
          </Button>
        </Card>
      </div>
    );
  }

  const current = PALABRAS_DIALECTOS[index];

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-blue-50 p-4 md:p-8">
      <header className="max-w-4xl mx-auto mb-12 flex justify-between items-center">
        <button onClick={() => router.push('/dashboard')} className="text-[#2A5C82] font-black bg-white px-4 py-2 rounded-xl shadow-sm">
          ← Salir
        </button>
        <h1 className="text-2xl font-black text-[#2A5C82] hidden md:block">Dialectos del Ecuador 🇪🇨</h1>
        <div className="bg-white px-6 py-2 rounded-full shadow-sm font-black text-[#4CAF50]">
          Puntos: {score}
        </div>
      </header>

      <main className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-8">
          <Card className="bg-white rounded-[2.5rem] shadow-xl p-8 border-none relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-100 rounded-full -mr-12 -mt-12 opacity-50"></div>
            <p className="text-sm font-black text-gray-400 uppercase tracking-widest mb-2">¿De dónde es esta palabra?</p>
            <h2 className="text-6xl font-black text-[#FF8C00] mb-4">"{current.palabra}"</h2>
            <p className="text-xl text-gray-600 font-medium">Significado: <span className="text-[#2A5C82] font-bold">{current.desc}</span></p>
          </Card>

          <div className="grid grid-cols-2 gap-6">
            <button
              onClick={() => handleRegionSelect("Sierra")}
              disabled={showFeedback !== null}
              className={`group relative overflow-hidden p-8 rounded-[2rem] border-4 transition-all
                ${showFeedback === true && current.region === "Sierra" ? 'bg-green-500 border-green-200 scale-105' :
                  showFeedback === false && current.region !== "Sierra" ? 'bg-red-100 border-red-200' :
                  'bg-white border-white hover:border-yellow-400 shadow-lg'}
              `}
            >
              <div className="text-5xl mb-4 group-hover:animate-bounce">🏔️</div>
              <p className={`font-black text-2xl ${showFeedback === true && current.region === "Sierra" ? 'text-white' : 'text-[#2A5C82]'}`}>SIERRA</p>
            </button>

            <button
              onClick={() => handleRegionSelect("Costa")}
              disabled={showFeedback !== null}
              className={`group relative overflow-hidden p-8 rounded-[2rem] border-4 transition-all
                ${showFeedback === true && current.region === "Costa" ? 'bg-green-500 border-green-200 scale-105' :
                  showFeedback === false && current.region !== "Costa" ? 'bg-red-100 border-red-200' :
                  'bg-white border-white hover:border-blue-400 shadow-lg'}
              `}
            >
              <div className="text-5xl mb-4 group-hover:animate-bounce">🏖️</div>
              <p className={`font-black text-2xl ${showFeedback === true && current.region === "Costa" ? 'text-white' : 'text-[#2A5C82]'}`}>COSTA</p>
            </button>
          </div>
        </div>

        <div className="hidden lg:block relative">
          <div className="bg-white/40 backdrop-blur-md rounded-[3rem] p-12 border-4 border-white shadow-2xl">
            <h3 className="text-2xl font-black text-[#2A5C82] mb-6">¡Sabías que!</h3>
            <p className="text-lg text-gray-700 leading-relaxed font-medium">
              Ecuador tiene una gran variedad de dialectos. En la Sierra solemos usar palabras de origen Kichwa como <span className="text-[#FF8C00] font-bold">"guagua"</span> o <span className="text-[#FF8C00] font-bold">"achachay"</span>. 
              <br/><br/>
              En la Costa, nuestro hablar es más rápido y usamos expresiones como <span className="text-blue-600 font-bold">"vaina"</span> o <span className="text-blue-600 font-bold">"bacán"</span>.
            </p>
          </div>
          <div className="absolute -bottom-6 -right-6 text-8xl animate-pulse">💡</div>
        </div>
      </main>

      {showFeedback !== null && (
        <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 px-12 py-6 rounded-3xl shadow-2xl font-black text-2xl animate-in slide-in-from-bottom-10
          ${showFeedback ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}
        `}>
          {showFeedback ? "¡CORRECTO! 🎯" : "INTÉNTALO DE NUEVO 🔄"}
        </div>
      )}
    </div>
  );
}
