"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ParejasPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const grado = searchParams.get('grado') || '5';

  const [cartas, setCartas] = useState([
    { id: 1, texto: 'Feliz', emparejado: false, volteada: false, parejaId: 2 },
    { id: 2, texto: 'Contento', emparejado: false, volteada: false, parejaId: 1 },
    { id: 3, texto: 'Rápido', emparejado: false, volteada: false, parejaId: 4 },
    { id: 4, texto: 'Veloz', emparejado: false, volteada: false, parejaId: 3 },
    { id: 5, texto: 'Triste', emparejado: false, volteada: false, parejaId: 6 },
    { id: 6, texto: 'Apenado', emparejado: false, volteada: false, parejaId: 5 },
  ].sort(() => Math.random() - 0.5));

  const [seleccionadas, setSeleccionadas] = useState<number[]>([]);
  const [puntos, setPuntos] = useState(0);

  const voltearCarta = (index: number) => {
    if (seleccionadas.length >= 2 || cartas[index].volteada || cartas[index].emparejado) return;

    const nuevasCartas = [...cartas];
    nuevasCartas[index].volteada = true;
    setCartas(nuevasCartas);

    const nuevasSeleccionadas = [...seleccionadas, index];
    setSeleccionadas(nuevasSeleccionadas);

    if (nuevasSeleccionadas.length === 2) {
      setTimeout(() => verificarPareja(nuevasSeleccionadas), 1000);
    }
  };

  const verificarPareja = (indices: number[]) => {
    const [idx1, idx2] = indices;
    const carta1 = cartas[idx1];
    const carta2 = cartas[idx2];
    const nuevasCartas = [...cartas];

    if (carta1.parejaId === carta2.id) {
      nuevasCartas[idx1].emparejado = true;
      nuevasCartas[idx2].emparejado = true;
      setPuntos(puntos + 50);
    } else {
      nuevasCartas[idx1].volteada = false;
      nuevasCartas[idx2].volteada = false;
    }

    setCartas(nuevasCartas);
    setSeleccionadas([]);
  };

  const juegoTerminado = cartas.every(c => c.emparejado);

  return (
    <div className="p-4 md:p-8 w-full max-w-5xl mx-auto min-h-screen">
      <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <button onClick={() => router.push(`/juegos?grado=${grado}`)} className="text-[#2A5C82] hover:text-blue-800 mb-2 font-bold flex items-center gap-2">
            ← Volver a Juegos
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-[#4CAF50]">Parejas de Sinónimos 🃏</h1>
          <p className="text-gray-600 mt-2">Encuentra las palabras que significan lo mismo.</p>
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {cartas.map((carta, index) => (
            <div 
              key={index}
              onClick={() => voltearCarta(index)}
              className={`h-32 md:h-48 rounded-2xl cursor-pointer transition-all duration-300 transform ${carta.volteada || carta.emparejado ? 'rotate-y-180 bg-white border-2 border-[#4CAF50] shadow-md' : 'bg-[#2A5C82] shadow-lg hover:-translate-y-2'} flex items-center justify-center`}
              style={{ perspective: '1000px' }}
            >
              {carta.volteada || carta.emparejado ? (
                <span className="text-xl md:text-3xl font-bold text-[#1A202C]">{carta.texto}</span>
              ) : (
                <span className="text-4xl text-white opacity-50">?</span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <Card className="shadow-lg border-none bg-white text-center">
          <CardContent className="p-16">
            <div className="text-6xl mb-6">🏆</div>
            <h2 className="text-4xl font-bold text-[#2A5C82] mb-4">¡Nivel Completado!</h2>
            <p className="text-xl text-[#1A202C] mb-8">Tienes un ojo experto. Ganaste <span className="font-bold text-[#FFD700] text-2xl">{puntos} puntos</span>.</p>
            <Button size="lg" className="bg-[#4CAF50] hover:bg-green-600 text-white px-10 py-4 text-xl border-none" onClick={() => router.push(`/juegos?grado=${grado}`)}>
              Volver a la Arena
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
