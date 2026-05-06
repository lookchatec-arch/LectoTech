"use client";

"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export default function DueloCoplasPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const challenges = [
    {
      id: 1,
      copla: "En el balcón de mi casa,\ntengo una flor amarilla,\nsi no me das un besito,\nme sentaré en la...",
      options: ["Silla", "Mesa", "Ventana", "Puerta"],
      correct: "Silla",
      feedback: "¡Excelente! La rima asonante/consonante es clave en las coplas."
    },
    {
      id: 2,
      copla: "El amor es un bicho,\nque cuando te pica,\nte deja el corazón,\ncomo una...",
      options: ["Canica", "Piedra", "Nube", "Flor"],
      correct: "Canica",
      feedback: "¡Muy bien! Los juegos de palabras son típicos del ingenio popular."
    },
    {
      id: 3,
      copla: "Al pasar por tu ventana,\nme tiraste un limón,\nel limón cayó al suelo,\ny el jugo en mi...",
      options: ["Corazón", "Zapatón", "Pantalón", "Camisón"],
      correct: "Corazón",
      feedback: "¡Perfecto! Has captado la esencia del sentimiento en la copla."
    }
  ];

  const currentChallenge = challenges[step - 1];

  const handleSelect = (option: string) => {
    setSelectedAnswer(option);
    if (option === currentChallenge.correct) {
      setScore(score + 10);
    }
    setShowResult(true);
  };

  const nextStep = () => {
    if (step < challenges.length) {
      setStep(step + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setStep(challenges.length + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF851B] to-[#FF4136] p-4 md:p-8 flex items-center justify-center font-sans">
      <div className="max-w-2xl w-full bg-white rounded-[3rem] shadow-2xl overflow-hidden relative border-8 border-white/20">
        
        {/* Header */}
        <div className="bg-[#FF851B] p-6 text-white text-center">
          <button 
            onClick={() => router.back()}
            className="absolute top-6 left-6 bg-white/20 hover:bg-white/40 p-2 rounded-xl transition-all"
          >
            ⬅️
          </button>
          <h1 className="text-3xl font-black italic tracking-tighter">DUELO DE COPLAS</h1>
          <p className="text-orange-100 font-bold uppercase text-xs tracking-widest mt-1">Nivel 1: El Arte del Ingenio</p>
        </div>

        <div className="p-8 md:p-12">
          {step <= challenges.length ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Progreso */}
              <div className="flex justify-between items-center text-xs font-black text-gray-400 uppercase tracking-widest">
                <span>Reto {step} de {challenges.length}</span>
                <span className="text-orange-500">{score} PUNTOS 🌟</span>
              </div>

              {/* Copla */}
              <div className="bg-orange-50 p-8 rounded-[2.5rem] border-2 border-orange-100 text-center">
                <p className="text-2xl md:text-3xl font-black text-[#2A5C82] leading-relaxed whitespace-pre-wrap italic">
                  "{currentChallenge.copla}"
                </p>
              </div>

              {/* Opciones */}
              <div className="grid grid-cols-2 gap-4">
                {currentChallenge.options.map((opt) => (
                  <button
                    key={opt}
                    disabled={showResult}
                    onClick={() => handleSelect(opt)}
                    className={`p-6 rounded-2xl font-black text-lg transition-all transform hover:scale-105 active:scale-95 border-b-4
                      ${showResult 
                        ? (opt === currentChallenge.correct ? 'bg-green-500 text-white border-green-700' : (opt === selectedAnswer ? 'bg-red-500 text-white border-red-700' : 'bg-gray-100 text-gray-400 border-gray-200'))
                        : 'bg-white text-gray-700 border-gray-200 hover:border-orange-500 hover:text-orange-600 shadow-sm'
                      }
                    `}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {showResult && (
                <div className="animate-in zoom-in duration-300 text-center space-y-4">
                  <p className={`font-black text-xl ${selectedAnswer === currentChallenge.correct ? 'text-green-600' : 'text-red-500'}`}>
                    {selectedAnswer === currentChallenge.correct ? '¡BRAVO! 🎉' : '¡Casi! 😅'}
                  </p>
                  <p className="text-gray-500 font-medium">{currentChallenge.feedback}</p>
                  <Button onClick={nextStep} className="w-full bg-[#FF851B] hover:bg-orange-600 py-6 text-xl rounded-2xl shadow-lg">
                    Siguiente Copla ➡️
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center space-y-8 animate-in zoom-in duration-500 py-12">
              <div className="text-9xl">🏆</div>
              <h2 className="text-4xl font-black text-[#2A5C82]">¡Mestre de Coplas!</h2>
              <div className="bg-orange-50 p-6 rounded-3xl inline-block border-2 border-orange-100">
                <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Puntaje Final</p>
                <p className="text-6xl font-black text-[#FF851B]">{score} 🌟</p>
              </div>
              <p className="text-gray-600 text-lg font-medium max-w-sm mx-auto">
                Has demostrado un ingenio increíble. ¡Las tradiciones orales viven en ti!
              </p>
              <Button onClick={() => router.back()} className="w-full bg-[#2A5C82] hover:bg-blue-900 py-6 text-xl rounded-2xl shadow-xl">
                Volver al Dashboard
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
