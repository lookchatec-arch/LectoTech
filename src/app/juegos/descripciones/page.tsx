"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export default function DescripcionesCientificasPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [score, setScore] = useState(0);

  const challenges = [
    {
      id: 1,
      image: "🌋",
      subject: "Volcán en Erupción",
      options: [
        { text: "Es una montaña que escupe fuego como un dragón enojado.", type: "literaria" },
        { text: "Apertura en la corteza terrestre por donde emerge magma y gases a alta temperatura.", type: "cientifica" }
      ],
      correct: "cientifica"
    },
    {
      id: 2,
      image: "💧",
      subject: "Ciclo del Agua",
      options: [
        { text: "Proceso de transformación y circulación del agua en la Tierra debido a la energía solar.", type: "cientifica" },
        { text: "El baile de las nubes que lloran para alimentar a la tierra sedienta.", type: "literaria" }
      ],
      correct: "cientifica"
    }
  ];

  const current = challenges[step - 1];

  const handleChoice = (type: string) => {
    if (type === current.correct) {
      setScore(score + 10);
    }
    if (step < challenges.length) {
      setStep(step + 1);
    } else {
      setStep(challenges.length + 1);
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50 p-4 md:p-8 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white rounded-[3rem] shadow-2xl overflow-hidden border-8 border-emerald-100 flex flex-col md:flex-row">
        
        {/* Left Panel: Laboratory Style */}
        <div className="w-full md:w-80 bg-emerald-600 p-8 text-white flex flex-col justify-between">
          <div>
            <div className="text-4xl mb-4">🧪</div>
            <h1 className="text-2xl font-black uppercase tracking-tighter leading-none">LABORATORIO DE CIENCIA</h1>
            <p className="text-emerald-200 text-xs font-bold mt-2 uppercase tracking-widest">Módulo de Objetividad</p>
          </div>
          
          <div className="bg-white/10 p-6 rounded-2xl border border-white/20">
            <p className="text-xs font-black uppercase tracking-widest mb-2 opacity-50">Tu Progreso</p>
            <p className="text-4xl font-black">{score} <span className="text-sm opacity-50">PTS</span></p>
          </div>
        </div>

        {/* Right Panel: Interactive Area */}
        <div className="flex-1 p-8 md:p-12">
          {step <= challenges.length ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="text-center">
                <div className="text-8xl mb-6 animate-bounce">{current.image}</div>
                <h2 className="text-3xl font-black text-[#2A5C82]">¿Cómo describirías esto científicamente?</h2>
                <p className="text-gray-400 font-bold uppercase text-xs mt-2">Sujeto: {current.subject}</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {current.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleChoice(opt.type)}
                    className="p-8 rounded-[2.5rem] bg-gray-50 border-2 border-gray-100 hover:border-emerald-500 hover:bg-emerald-50 transition-all text-left group"
                  >
                    <p className="text-xl font-bold text-gray-700 group-hover:text-emerald-700 leading-relaxed">
                      {opt.text}
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${opt.type === 'cientifica' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'}`}>
                        {opt.type === 'cientifica' ? 'Enfoque Técnico' : 'Enfoque Artístico'}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center space-y-8 animate-in zoom-in duration-500 py-12">
               <div className="text-8xl">🔬</div>
               <h2 className="text-4xl font-black text-[#2A5C82]">¡Científico Graduado!</h2>
               <p className="text-gray-600 font-medium max-w-sm mx-auto">
                 Has aprendido a diferenciar la descripción literaria de la descripción científica. La precisión es tu mejor herramienta.
               </p>
               <Button onClick={() => router.back()} className="w-full bg-emerald-600 hover:bg-emerald-700 py-6 text-xl rounded-2xl shadow-xl">
                 Volver al Dashboard
               </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
