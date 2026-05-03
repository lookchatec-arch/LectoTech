"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SabiasQue } from '@/components/SabiasQue';

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [estudianteInfo, setEstudianteInfo] = useState({ nombre: 'Explorador', grado: '5' });

  useEffect(() => {
    const nombre = searchParams.get('estudiante');
    const grado = searchParams.get('grado');
    if (nombre && grado) {
      setEstudianteInfo({
        nombre: nombre.charAt(0).toUpperCase() + nombre.slice(1),
        grado: grado
      });
    }
  }, [searchParams]);

  // Nodos del mapa (Niveles)
  const niveles = [
    { id: 1, tipo: 'lectura', titulo: 'El Misterio del Volcán', icono: '🌋', color: 'bg-[#FFD700]', ruta: `/lectura/el-misterio?grado=${estudianteInfo.grado}`, completado: true },
    { id: 2, tipo: 'juego', titulo: 'Adivina la Palabra', icono: '🤔', color: 'bg-[#FF8C00]', ruta: `/juegos/adivina?grado=${estudianteInfo.grado}`, completado: true },
    { id: 3, tipo: 'lectura', titulo: 'El Bosque Encantado', icono: '🌲', color: 'bg-[#4CAF50]', ruta: `/biblioteca`, completado: true, actual: false },
    { id: 4, tipo: 'juego', titulo: 'Cazador de Verbos', icono: '🏃‍♂️', color: 'bg-[#2A5C82]', ruta: `/juegos/verbos?grado=${estudianteInfo.grado}`, completado: false, bloqueado: false },
    { id: 5, tipo: 'juego', titulo: 'Sopa de Letras', icono: '🔍', color: 'bg-[#E91E63]', ruta: `/juegos/sopa?grado=${estudianteInfo.grado}`, completado: false, bloqueado: false, actual: true },
    { id: 6, tipo: 'juego', titulo: 'Parejas de Sinónimos', icono: '🃏', color: 'bg-[#9C27B0]', ruta: `/juegos/parejas?grado=${estudianteInfo.grado}`, completado: false, bloqueado: false },
    { id: 7, tipo: 'taller', titulo: 'Taller de Escritura', icono: '✍️', color: 'bg-[#FF5722]', ruta: `/taller`, completado: false, bloqueado: false },
  ];

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto min-h-screen pb-24">
      {/* Header Fijo */}
      <header className="mb-12 flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100 sticky top-4 z-50">
        <div>
          <h1 className="text-2xl font-bold text-[#2A5C82]">Mapa de {estudianteInfo.nombre}</h1>
          <p className="text-gray-500 text-sm font-bold">{estudianteInfo.grado}to Básica</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌟</span>
          <span className="font-bold text-[#FFD700] text-xl">120</span>
        </div>
      </header>

      <SabiasQue />

      {/* Camino de Duolingo (Path) */}
      <div className="relative flex flex-col items-center gap-8 py-8">
        
        {/* Línea conectora de fondo */}
        <div className="absolute top-0 bottom-0 w-4 bg-gray-200 rounded-full z-0" style={{ left: 'calc(50% - 8px)' }}></div>
        
        {/* Progreso llenado (simulado hasta el nivel 3) */}
        <div className="absolute top-0 w-4 bg-[#FFD700] rounded-full z-0" style={{ left: 'calc(50% - 8px)', height: '40%' }}></div>

        {niveles.map((nivel, index) => {
          // Posicionar alternadamente izquierda/derecha para el efecto zig-zag de Duolingo
          const offset = index % 2 === 0 ? '-translate-x-12' : 'translate-x-12';
          
          return (
            <div key={nivel.id} className={`relative z-10 flex flex-col items-center ${offset} transition-transform hover:scale-105`}>
              {/* Tooltip con el nombre del nivel */}
              <div className="absolute -top-10 bg-gray-900 px-4 py-2 rounded-xl shadow-lg border-none whitespace-nowrap text-sm font-bold text-white opacity-0 hover:opacity-100 transition-opacity peer">
                {nivel.titulo}
                {nivel.bloqueado && " 🔒"}
              </div>

              {/* Botón Circular del Nivel */}
              <button 
                onClick={() => !nivel.bloqueado && router.push(nivel.ruta)}
                className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl shadow-xl border-b-8 active:border-b-0 active:translate-y-2 transition-all
                  ${nivel.color} 
                  ${nivel.bloqueado ? 'border-gray-400 bg-gray-200 grayscale contrast-125 cursor-not-allowed' : 
                    nivel.completado ? 'border-yellow-600' : 'border-green-700 ring-4 ring-green-300 animate-pulse'}
                `}
              >
                {nivel.icono}
              </button>

              {/* Estrellas si está completado */}
              {nivel.completado && (
                <div className="absolute -bottom-3 flex gap-1 bg-white px-2 py-1 rounded-full shadow-sm border border-gray-100">
                  <span className="text-xs">⭐</span><span className="text-xs">⭐</span><span className="text-xs">⭐</span>
                </div>
              )}
            </div>
          );
        })}

        {/* Cofre Final */}
        <div className="relative z-10 mt-8">
          <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center text-6xl shadow-2xl border-b-8 border-purple-800 animate-bounce">
            🎁
          </div>
        </div>

      </div>
    </div>
  );
}


