"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter, useSearchParams } from 'next/navigation';

export default function VerbosPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const grado = searchParams.get('grado') || '5';

  const [palabras, setPalabras] = useState<{ id: number, texto: string, esVerbo: boolean, estado: 'normal' | 'correcto' | 'incorrecto' }[]>([]);
  const [puntos, setPuntos] = useState(0);
  const [tiempo, setTiempo] = useState(45);
  const [juegoActivo, setJuegoActivo] = useState(false);
  const [juegoTerminado, setJuegoTerminado] = useState(false);

  const bancoPalabras = [
    { texto: 'Correr', esVerbo: true }, { texto: 'Mesa', esVerbo: false },
    { texto: 'Saltar', esVerbo: true }, { texto: 'Lindo', esVerbo: false },
    { texto: 'Escribir', esVerbo: true }, { texto: 'Casa', esVerbo: false },
    { texto: 'Pensar', esVerbo: true }, { texto: 'Rojo', esVerbo: false },
    { texto: 'Volar', esVerbo: true }, { texto: 'Rápido', esVerbo: false },
    { texto: 'Comer', esVerbo: true }, { texto: 'Feliz', esVerbo: false },
    { texto: 'Leer', esVerbo: true }, { texto: 'Gato', esVerbo: false },
    { texto: 'Dormir', esVerbo: true }, { texto: 'Sol', esVerbo: false },
    { texto: 'Jugar', esVerbo: true }, { texto: 'Alto', esVerbo: false },
    { texto: 'Cantar', esVerbo: true }, { texto: 'Azul', esVerbo: false },
    { texto: 'Reír', esVerbo: true }, { texto: 'Libro', esVerbo: false },
    { texto: 'Llorar', esVerbo: true }, { texto: 'Pelota', esVerbo: false },
    { texto: 'Bailar', esVerbo: true }, { texto: 'Árbol', esVerbo: false },
    { texto: 'Pintar', esVerbo: true }, { texto: 'Reloj', esVerbo: false },
    { texto: 'Mirar', esVerbo: true }, { texto: 'Cielo', esVerbo: false }
  ];

  const iniciarJuego = () => {
    setJuegoActivo(true);
    setJuegoTerminado(false);
    setPuntos(0);
    setTiempo(45);
    generarPalabras();
  };

  const generarPalabras = () => {
    // Escoger 12 palabras aleatorias para la cuadrícula
    const seleccion = [...bancoPalabras].sort(() => 0.5 - Math.random()).slice(0, 12).map((p, i) => ({
      id: i,
      ...p,
      estado: 'normal' as 'normal' | 'correcto' | 'incorrecto'
    }));
    setPalabras(seleccion);
  };

  useEffect(() => {
    let intervalo: NodeJS.Timeout;
    if (juegoActivo && tiempo > 0) {
      intervalo = setInterval(() => {
        setTiempo((t) => t - 1);
      }, 1000);
    } else if (tiempo === 0 && juegoActivo) {
      setJuegoActivo(false);
      setJuegoTerminado(true);
    }
    return () => clearInterval(intervalo);
  }, [juegoActivo, tiempo]);

  const atraparPalabra = (index: number) => {
    if (!juegoActivo) return;
    
    const nuevasPalabras = [...palabras];
    const palabra = nuevasPalabras[index];

    if (palabra.estado !== 'normal') return;

    if (palabra.esVerbo) {
      palabra.estado = 'correcto';
      setPuntos(puntos + 10);
      
      // Crear efecto visual global de chispas o felicitación rápida opcional
      const quedanVerbos = nuevasPalabras.some(p => p.esVerbo && p.estado === 'normal');
      if (!quedanVerbos) {
        setTimeout(() => generarPalabras(), 800);
      }
    } else {
      palabra.estado = 'incorrecto';
      setPuntos(puntos >= 5 ? puntos - 5 : 0);
      // Quitar el estado incorrecto después de un segundo para permitir que desaparezca el rojo
      setTimeout(() => {
        setPalabras(prev => {
          const revertidas = [...prev];
          if(revertidas[index] && revertidas[index].estado === 'incorrecto'){
            revertidas[index].estado = 'normal';
          }
          return revertidas;
        });
      }, 500);
    }

    setPalabras(nuevasPalabras);
  };

  return (
    <div className="p-4 md:p-8 w-full max-w-5xl mx-auto min-h-screen">
      <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <button onClick={() => router.push(`/dashboard`)} className="text-[#2A5C82] hover:text-blue-800 mb-2 font-bold flex items-center gap-2">
            ← Volver al Mapa
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-[#FFD700]">Cazador de Verbos 🏃‍♂️</h1>
          <p className="text-gray-600 mt-2">¡Atrapa todos los verbos antes de que el tiempo termine!</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
            <span className="text-2xl">⏱️</span>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase">Tiempo</p>
              <p className={`text-xl font-bold ${tiempo <= 10 ? 'text-red-500 animate-pulse' : 'text-[#2A5C82]'}`}>{tiempo}s</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
            <span className="text-2xl">🌟</span>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase">Puntos</p>
              <p className="text-xl font-bold text-[#FFD700]">{puntos} pts</p>
            </div>
          </div>
        </div>
      </header>

      {/* Definimos animaciones en línea para el temblor y las chispas */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px) rotate(-2deg); }
          50% { transform: translateX(5px) rotate(2deg); }
          75% { transform: translateX(-5px) rotate(-2deg); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
        @keyframes pop {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1.05); }
        }
        .animate-pop {
          animation: pop 0.3s ease-out forwards;
        }
        .sparkles {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: radial-gradient(circle, #fff 10%, transparent 20%), radial-gradient(circle, #FFD700 10%, transparent 20%);
          background-size: 20px 20px;
          background-position: 0 0, 10px 10px;
          opacity: 0.5;
          animation: sparkleAnim 1s linear infinite;
        }
        @keyframes sparkleAnim {
          0% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
          100% { opacity: 0; transform: scale(1.5); }
        }
      `}} />

      {!juegoActivo && !juegoTerminado && (
        <Card className="text-center bg-white border-2 border-[#FFD700]">
          <CardContent className="p-16">
            <h2 className="text-2xl font-bold text-[#1A202C] mb-6">¿Listo para la cacería?</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">Selecciona únicamente las palabras que representen una acción (verbos). Si tocas una palabra incorrecta, perderás puntos.</p>
            <Button size="lg" className="bg-[#FFD700] hover:bg-yellow-500 text-gray-900 font-bold px-12 py-6 text-xl shadow-lg border-none" onClick={iniciarJuego}>
              Empezar Juego
            </Button>
          </CardContent>
        </Card>
      )}

      {juegoActivo && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {palabras.map((palabra, index) => (
            <Button
              key={palabra.id}
              onClick={() => atraparPalabra(index)}
              className={`h-24 md:h-32 text-xl font-bold transition-all border-none shadow-md relative overflow-hidden group
                ${palabra.estado === 'normal' ? 'bg-[#2A5C82] hover:bg-blue-800 text-white hover:scale-105' : ''}
                ${palabra.estado === 'correcto' ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#1A202C] ring-4 ring-yellow-200 animate-pop cursor-default' : ''}
                ${palabra.estado === 'incorrecto' ? 'bg-red-500 text-white animate-shake' : ''}
              `}
            >
              {palabra.estado === 'correcto' && (
                <div className="sparkles absolute inset-0 pointer-events-none"></div>
              )}
              <span className="relative z-10 drop-shadow-md">
                {palabra.estado === 'correcto' ? `✨ ${palabra.texto} ✨` : palabra.texto}
              </span>
            </Button>
          ))}
        </div>
      )}

      {juegoTerminado && (
        <Card className="shadow-lg border-none bg-white text-center">
          <CardContent className="p-16">
            <div className="text-6xl mb-6">🏆</div>
            <h2 className="text-4xl font-bold text-[#2A5C82] mb-4">¡Tiempo Agotado!</h2>
            <p className="text-xl text-[#1A202C] mb-8">Has conseguido <span className="font-bold text-[#FFD700] text-2xl">{puntos} puntos</span> atrapando verbos.</p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-[#FFD700] hover:bg-yellow-500 text-gray-900 border-none font-bold shadow-md" onClick={iniciarJuego}>
                Jugar de Nuevo
              </Button>
              <Button size="lg" className="bg-[#4CAF50] hover:bg-green-600 text-white border-none shadow-md" onClick={() => router.push(`/dashboard`)}>
                Volver al Mapa
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
