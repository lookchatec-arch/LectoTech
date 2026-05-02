"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter, useSearchParams } from 'next/navigation';

export default function JuegosPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const grado = searchParams.get('grado') || '5';

  const juegos = [
    { id: 1, titulo: "Sopa de Letras", emoji: "🔍", color: "#2A5C82", descripcion: "Encuentra el vocabulario oculto del último cuento.", ruta: `/juegos/sopa?grado=${grado}` },
    { id: 2, titulo: "Adivina la Palabra", emoji: "🤔", color: "#FF8C00", descripcion: "Completa la frase con la palabra correcta.", ruta: `/juegos/adivina?grado=${grado}` },
    { id: 3, titulo: "Parejas de Sinónimos", emoji: "🃏", color: "#4CAF50", descripcion: "Encuentra las cartas con el mismo significado.", ruta: `/juegos/parejas?grado=${grado}` },
    { id: 4, titulo: "Cazador de Verbos", emoji: "🏃‍♂️", color: "#FFD700", descripcion: "Atrapa todos los verbos antes de que se acabe el tiempo.", ruta: `/juegos/verbos?grado=${grado}` }
  ];

  return (
    <div className="p-4 md:p-8 w-full max-w-7xl mx-auto min-h-screen">
      <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <button onClick={() => router.push(`/dashboard?estudiante=explorador&grado=${grado}`)} className="text-[#2A5C82] hover:text-blue-800 mb-2 font-bold flex items-center gap-2">
            ← Volver al Mapa
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-[#4CAF50]">Arena de Juegos 🎮</h1>
          <p className="text-gray-600 mt-2">Nivel Adaptativo: {grado}to Básica</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
          <span className="text-2xl">🌟</span>
          <div>
            <p className="text-xs text-gray-500 font-bold uppercase">Puntos Actuales</p>
            <p className="text-xl font-bold text-[#FFD700]">120 pts</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {juegos.map((juego) => (
          <Card key={juego.id} className="hover:-translate-y-2 transition-transform duration-300 border-b-4 bg-white" style={{ borderBottomColor: juego.color }}>
            <CardContent className="flex flex-col items-center p-6 text-center h-full">
              <div 
                className="w-24 h-24 rounded-full flex items-center justify-center text-4xl mb-4 shadow-inner"
                style={{ backgroundColor: `${juego.color}20` }}
              >
                {juego.emoji}
              </div>
              <h3 className="text-lg font-bold mb-2 text-[#1A202C]">{juego.titulo}</h3>
              <p className="text-sm text-gray-500 mb-6 flex-grow">{juego.descripcion}</p>
              <Button 
                className="w-full text-white font-bold border-none" 
                style={{ backgroundColor: juego.color }}
                onClick={() => router.push(juego.ruta)}
              >
                Jugar Ahora
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 bg-blue-50 p-6 rounded-2xl border border-[#2A5C82] border-opacity-20 flex gap-6 items-center">
        <div className="text-5xl">🏆</div>
        <div>
          <h3 className="text-xl font-bold text-[#2A5C82]">Torneo de la Semana</h3>
          <p className="text-[#1A202C] mt-1">Acumula más de 500 puntos esta semana en la "Adivina la Palabra" para desbloquear una insignia dorada.</p>
        </div>
        <Button className="ml-auto bg-[#2A5C82] text-white whitespace-nowrap border-none">Ver Ranking</Button>
      </div>
    </div>
  );
}
