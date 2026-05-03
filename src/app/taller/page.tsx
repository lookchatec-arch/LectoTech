"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export default function TallerPage() {
  const router = useRouter();
  const [texto, setTexto] = useState("");
  const [enviado, setEnviado] = useState(false);

  const enviarTarea = () => {
    if (texto.trim().length > 10) {
      setEnviado(true);
    }
  };

  return (
    <div className="p-4 md:p-8 w-full max-w-4xl mx-auto min-h-screen">
      <header className="mb-8">
        <button onClick={() => router.push('/dashboard')} className="text-[#2A5C82] hover:text-blue-800 mb-2 font-bold flex items-center gap-2">
          ← Volver al Mapa
        </button>
        <h1 className="text-3xl font-bold text-[#FF5722]">Taller de Escritura ✍️</h1>
        <p className="text-gray-600 mt-2">¡Es tu turno de crear! Escribe una pequeña historia sobre un bosque mágico.</p>
      </header>

      {!enviado ? (
        <Card className="bg-white border-2 border-[#FF5722] shadow-xl">
          <CardContent className="p-6">
            <textarea 
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              className="w-full h-64 p-4 border-2 border-gray-200 rounded-xl focus:border-[#FF5722] outline-none resize-none text-lg"
              placeholder="Había una vez en un bosque encantado..."
            ></textarea>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-gray-500 font-bold">{texto.length} caracteres</span>
              <Button onClick={enviarTarea} className="bg-[#FF5722] hover:bg-orange-800 text-white font-bold py-3 px-8 text-lg rounded-xl">
                Enviar Historia 🚀
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-white border-2 border-[#4CAF50] shadow-xl text-center">
          <CardContent className="p-16">
            <div className="text-6xl mb-6">🏆</div>
            <h2 className="text-2xl font-bold text-[#4CAF50] mb-4">¡Historia Enviada!</h2>
            <p className="text-gray-600 mb-8">Tu profesor revisará tu increíble creatividad pronto. Has ganado +50 puntos.</p>
            <Button onClick={() => router.push('/dashboard')} className="bg-[#4CAF50] hover:bg-green-700 text-white font-bold py-4 px-8 text-lg">
              Regresar al Mapa
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
