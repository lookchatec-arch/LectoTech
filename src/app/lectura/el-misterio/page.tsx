"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export default function MisterioVolcanPage() {
  const router = useRouter();
  const [completado, setCompletado] = useState(false);

  return (
    <div className="p-4 md:p-8 w-full max-w-4xl mx-auto min-h-screen">
      <header className="mb-8">
        <button onClick={() => router.push('/dashboard')} className="text-[#2A5C82] hover:text-blue-800 mb-2 font-bold flex items-center gap-2">
          ← Volver al Mapa
        </button>
        <h1 className="text-3xl font-bold text-[#FFD700]">El Misterio del Volcán 🌋</h1>
      </header>

      {!completado ? (
        <Card className="bg-white border-2 border-[#FFD700] shadow-xl">
          <CardContent className="p-8 md:p-12">
            <div className="prose lg:prose-xl text-gray-800 space-y-6">
              <p className="font-medium text-xl leading-relaxed text-justify">
                Hace muchos años, en el centro de la Isla Fuego, existía un volcán que no escupía lava, sino <strong className="text-[#FF8C00]">letras brillantes</strong>. Los habitantes del pueblo cercano recogían estas letras cada vez que había una erupción para formar las palabras que darían nombre a las cosas nuevas que descubrían.
              </p>
              <p className="font-medium text-xl leading-relaxed text-justify">
                Un día, el volcán dejó de hacer erupción. El sabio del pueblo, un anciano llamado <strong>Ortografus</strong>, descubrió que el volcán estaba triste porque los aldeanos habían empezado a escribir con faltas de ortografía. Decidieron enviarle cartas perfectamente escritas y, de repente, ¡el volcán volvió a brillar con letras doradas!
              </p>
            </div>
            
            <div className="mt-12 text-center">
              <Button onClick={() => setCompletado(true)} className="bg-[#4CAF50] hover:bg-green-700 text-white font-bold py-4 px-12 text-xl rounded-xl shadow-lg">
                He terminado de leer ✔️
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-white border-2 border-[#4CAF50] shadow-xl text-center">
          <CardContent className="p-16">
            <div className="text-6xl mb-6">🌟</div>
            <h2 className="text-3xl font-bold text-[#4CAF50] mb-4">¡Lectura Completada!</h2>
            <p className="text-xl text-gray-600 mb-8">Has descubierto el secreto del volcán y ganado +20 puntos de sabiduría.</p>
            <Button onClick={() => router.push('/dashboard')} className="bg-[#FFD700] hover:bg-yellow-500 text-gray-900 border-none font-bold py-4 px-8 text-lg">
              Regresar al Mapa
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
