"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter, useSearchParams } from 'next/navigation';

const ADIVINANZAS_5TO = [
  {
    id: 1,
    pista: "Es pequeño, peludo, suave; tan blando por fuera, que se diría todo de algodón, que no lleva huesos.",
    opciones: ["Un gato", "Platero (un burro)", "Un conejo", "Una oveja"],
    correcta: "Platero (un burro)",
    imagen: "🐴"
  },
  {
    id: 2,
    pista: "Solo los espejos de azabache de sus ojos son duros cual dos escarabajos de cristal negro.",
    opciones: ["Un perro", "Un cuervo", "Platero", "Un gato montés"],
    correcta: "Platero",
    imagen: "👀"
  }
];

export default function AdivinaPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const grado = searchParams.get('grado');
  
  const [paso, setPaso] = useState(0);
  const [puntos, setPuntos] = useState(0);
  const [finalizado, setFinalizado] = useState(false);
  const [feedback, setFeedback] = useState<{ msg: string, success: boolean } | null>(null);

  const adivinanzas = grado === '5' ? ADIVINANZAS_5TO : [];

  const handleRespuesta = (opcion: string) => {
    if (opcion === adivinanzas[paso].correcta) {
      setFeedback({ msg: "¡Excelente! Has captado la esencia literaria.", success: true });
      setPuntos(puntos + 10);
    } else {
      setFeedback({ msg: "¡Casi! Relee la descripción con atención.", success: false });
    }

    setTimeout(() => {
      setFeedback(null);
      if (paso < adivinanzas.length - 1) {
        setPaso(paso + 1);
      } else {
        setFinalizado(true);
      }
    }, 2000);
  };

  if (grado !== '5') {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold">Actividad no disponible para este grado.</h1>
        <Button onClick={() => router.push('/dashboard')} className="mt-4">Volver</Button>
      </div>
    );
  }

  if (finalizado) {
    return (
      <div className="min-h-screen bg-[var(--color-paper-cream)] p-8 flex items-center justify-center">
        <Card className="max-w-md w-full p-12 text-center rounded-[3rem] shadow-2xl border-4 border-white">
          <div className="text-8xl mb-6">🏆</div>
          <h2 className="text-3xl font-black text-[#2A5C82] mb-4">¡Reto Superado!</h2>
          <p className="text-xl text-gray-600 mb-8">Has demostrado ser un gran lector de descripciones literarias.</p>
          <div className="bg-yellow-50 p-6 rounded-2xl mb-8">
            <p className="text-sm font-bold text-yellow-600 uppercase">Puntaje Total</p>
            <p className="text-5xl font-black text-[#FFD700]">{puntos} 🌟</p>
          </div>
          <Button onClick={() => router.push('/dashboard')} className="w-full bg-[#4CAF50] hover:bg-green-600 py-6 text-xl rounded-2xl shadow-lg transition-transform hover:scale-105">
            Regresar al Mapa
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F4F8] p-4 md:p-8">
      <header className="max-w-4xl mx-auto mb-12 flex justify-between items-center">
        <button onClick={() => router.push('/dashboard')} className="text-[#2A5C82] font-black hover:underline flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm">
          ← Mapa
        </button>
        <div className="bg-white px-6 py-2 rounded-full shadow-sm border-2 border-orange-100 flex items-center gap-3">
          <span className="font-black text-[#FF8C00]">Nivel {paso + 1} de {adivinanzas.length}</span>
          <div className="w-32 h-3 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#FF8C00] transition-all duration-500" 
              style={{ width: `${((paso + 1) / adivinanzas.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto">
        <Card className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border-none relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-red-400"></div>
          
          <CardContent className="p-8 md:p-16">
            <div className="text-center mb-12">
              <div className="text-7xl mb-6 animate-bounce">🤔</div>
              <h1 className="text-3xl font-black text-[#2A5C82] mb-4">¿Quién es el Personaje?</h1>
              <p className="text-gray-500 font-medium">Lee la descripción literaria y elige la opción correcta</p>
            </div>

            <div className="bg-blue-50 p-8 rounded-3xl border-2 border-blue-100 mb-12 relative">
              <div className="absolute -top-4 -left-4 bg-blue-600 text-white p-2 rounded-lg text-2xl shadow-lg">📖</div>
              <p className="text-xl md:text-2xl font-serif italic text-gray-700 leading-relaxed text-center">
                "{adivinanzas[paso].pista}"
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {adivinanzas[paso].opciones.map((opcion, i) => (
                <button
                  key={i}
                  onClick={() => handleRespuesta(opcion)}
                  disabled={!!feedback}
                  className={`p-6 rounded-2xl font-bold text-lg transition-all text-left flex items-center gap-4 border-2
                    ${feedback?.success && opcion === adivinanzas[paso].correcta ? 'bg-green-100 border-green-500 text-green-700' : 
                      feedback?.msg && opcion === adivinanzas[paso].correcta ? 'bg-green-50 border-green-200 text-green-600' :
                      feedback && opcion !== adivinanzas[paso].correcta ? 'opacity-50 grayscale' :
                      'bg-white border-gray-100 hover:border-[#4CAF50] hover:bg-green-50 text-gray-700 hover:text-[#4CAF50] shadow-sm'}
                  `}
                >
                  <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm">{String.fromCharCode(65 + i)}</span>
                  {opcion}
                </button>
              ))}
            </div>

            {feedback && (
              <div className={`mt-8 p-6 rounded-2xl text-center animate-in zoom-in duration-300 font-bold text-xl
                ${feedback.success ? 'bg-green-500 text-white shadow-lg' : 'bg-red-500 text-white shadow-lg'}
              `}>
                {feedback.success ? '✨ ' : '❌ '}{feedback.msg}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
