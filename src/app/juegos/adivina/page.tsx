"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AdivinaPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const grado = searchParams.get('grado') || '5';

  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntos, setPuntos] = useState(0);
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState<string | null>(null);
  const [esCorrecto, setEsCorrecto] = useState<boolean | null>(null);

  // Niveles de dificultad dinámicos
  const preguntasPorGrado = {
    '5': [
      { frase: "El pájaro cantó una hermosa ___ en el árbol.", opciones: ["melodía", "piedra", "nube"], correcta: "melodía" },
      { frase: "El niño estaba muy ___ al recibir su regalo.", opciones: ["triste", "feliz", "enojado"], correcta: "feliz" },
      { frase: "La ___ brillaba intensamente en el cielo nocturno.", opciones: ["luna", "zapato", "mesa"], correcta: "luna" }
    ],
    '6': [
      { frase: "El detective encontró una pista que resultó ser ___ para resolver el caso.", opciones: ["crucial", "aburrida", "invisible"], correcta: "crucial" },
      { frase: "La antigua mansión tenía un ambiente muy ___ durante la tormenta.", opciones: ["lúgubre", "festivo", "colorido"], correcta: "lúgubre" },
      { frase: "El científico hizo un descubrimiento ___ que cambió la historia.", opciones: ["trascendental", "insignificante", "lento"], correcta: "trascendental" }
    ],
    '7': [
      { frase: "La elocuencia del orador logró ___ a la multitud enfurecida.", opciones: ["apaciguar", "exacerbar", "ignorar"], correcta: "apaciguar" },
      { frase: "Su comportamiento errático fue un claro indicio de su estado de ___ emocional.", opciones: ["vulnerabilidad", "fortaleza", "indiferencia"], correcta: "vulnerabilidad" },
      { frase: "El autor utilizó una ___ brillante para describir la soledad del protagonista.", opciones: ["metáfora", "ecuación", "entrevista"], correcta: "metáfora" }
    ]
  };

  const preguntas = preguntasPorGrado[grado as keyof typeof preguntasPorGrado] || preguntasPorGrado['5'];

  const verificarRespuesta = (opcion: string) => {
    if (respuestaSeleccionada) return; // Evitar múltiples clics
    setRespuestaSeleccionada(opcion);
    
    if (opcion === preguntas[preguntaActual].correcta) {
      setEsCorrecto(true);
      setPuntos(puntos + 20);
    } else {
      setEsCorrecto(false);
    }

    setTimeout(() => {
      if (preguntaActual < preguntas.length - 1) {
        setPreguntaActual(preguntaActual + 1);
        setRespuestaSeleccionada(null);
        setEsCorrecto(null);
      } else {
        setJuegoTerminado(true);
      }
    }, 1500);
  };

  return (
    <div className="p-4 md:p-8 w-full max-w-5xl mx-auto min-h-screen">
      <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <button onClick={() => router.push(`/juegos?grado=${grado}`)} className="text-[#2A5C82] hover:text-blue-800 mb-2 font-bold flex items-center gap-2">
            ← Volver a Juegos
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-[#FF8C00]">Adivina la Palabra 🤔</h1>
          <p className="text-gray-600 mt-2">Dificultad adaptada para: {grado}to Básica</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
          <span className="text-2xl">🌟</span>
          <div>
            <p className="text-xs text-gray-500 font-bold uppercase">Puntos Ganados</p>
            <p className="text-xl font-bold text-[#FFD700]">{puntos} pts</p>
          </div>
        </div>
      </header>

      {!juegoTerminado ? (
        <Card className="shadow-lg border-2 border-[#FF8C00] bg-white">
          <CardContent className="p-10 text-center">
            <div className="mb-8 text-gray-500 font-bold uppercase tracking-widest text-sm">
              Pregunta {preguntaActual + 1} de {preguntas.length}
            </div>
            
            <h2 className="text-3xl font-bold text-[#1A202C] mb-12 leading-relaxed">
              {preguntas[preguntaActual].frase.split('___').map((part, index) => (
                <React.Fragment key={index}>
                  {part}
                  {index === 0 && (
                    <span className={`inline-block px-4 py-1 mx-2 border-b-4 ${respuestaSeleccionada ? (esCorrecto ? 'border-[#4CAF50] text-[#4CAF50]' : 'border-red-500 text-red-500') : 'border-[#FF8C00] text-[#FF8C00]'} min-w-[100px]`}>
                      {respuestaSeleccionada || '?'}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {preguntas[preguntaActual].opciones.map((opcion, idx) => (
                <Button 
                  key={idx} 
                  size="lg"
                  className={`text-xl py-6 shadow-md transition-all ${
                    respuestaSeleccionada === opcion 
                      ? (esCorrecto ? 'bg-[#4CAF50] hover:bg-[#4CAF50] border-none' : 'bg-red-500 hover:bg-red-500 border-none') 
                      : 'bg-white text-[#2A5C82] border-2 border-[#2A5C82] hover:bg-blue-50'
                  } ${respuestaSeleccionada && respuestaSeleccionada !== opcion ? 'opacity-50' : ''}`}
                  onClick={() => verificarRespuesta(opcion)}
                  disabled={respuestaSeleccionada !== null}
                >
                  {opcion}
                </Button>
              ))}
            </div>

            {respuestaSeleccionada && (
              <div className={`mt-8 text-2xl font-bold animate-bounce ${esCorrecto ? 'text-[#4CAF50]' : 'text-red-500'}`}>
                {esCorrecto ? '¡Excelente! +20 puntos' : '¡Casi! La próxima será.'}
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card className="shadow-lg border-none bg-white text-center">
          <CardContent className="p-16">
            <div className="text-6xl mb-6">🏆</div>
            <h2 className="text-4xl font-bold text-[#2A5C82] mb-4">¡Juego Terminado!</h2>
            <p className="text-xl text-[#1A202C] mb-8">Has conseguido <span className="font-bold text-[#FFD700] text-2xl">{puntos} puntos</span> de vocabulario.</p>
            <Button size="lg" className="bg-[#4CAF50] hover:bg-green-600 text-white px-10 py-4 text-xl border-none" onClick={() => router.push('/juegos')}>
              Volver a la Arena
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
