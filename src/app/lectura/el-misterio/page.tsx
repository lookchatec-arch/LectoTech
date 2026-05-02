"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export default function LecturaMisterioPage() {
  const router = useRouter();
  const [progreso, setProgreso] = useState(0);

  const avanzarLectura = () => {
    if (progreso < 100) setProgreso(progreso + 25);
    else alert("¡Felicidades! Has completado la lectura.");
  };

  return (
    <div className="p-4 md:p-8 w-full max-w-5xl mx-auto min-h-screen bg-[#F9F7F1]">
      <header className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <button onClick={() => router.push('/dashboard')} className="text-[#2A5C82] hover:text-blue-800 font-bold flex items-center gap-2">
          ← Salir de la Lectura
        </button>
        <div className="flex items-center gap-4">
          <div className="w-48 bg-gray-200 rounded-full h-3">
            <div className="bg-[#4CAF50] h-3 rounded-full transition-all duration-500" style={{ width: `${progreso}%` }}></div>
          </div>
          <span className="text-sm font-bold text-gray-500">{progreso}%</span>
        </div>
      </header>

      <Card className="shadow-lg border-none bg-white">
        <CardContent className="p-10 md:p-16">
          <div className="text-center mb-10">
            <div className="w-32 h-32 bg-[#FFD700] rounded-full mx-auto mb-6 flex items-center justify-center text-5xl shadow-inner">
              🌋
            </div>
            <h1 className="text-4xl font-bold text-[#2A5C82] mb-4">El Misterio del Volcán</h1>
            <p className="text-gray-500 font-medium">Por: Autor Desconocido • Tiempo estimado: 10 min</p>
          </div>

          <div className="prose prose-lg max-w-none text-gray-800 leading-loose">
            <p className="text-xl mb-6">
              Había una vez, en un pequeño pueblo llamado Cumbre Dorada, un volcán que no escupía lava, sino nubes de colores. Todos los martes a las tres de la tarde, el cielo se teñía de violeta, verde o amarillo.
            </p>
            {progreso >= 25 && (
              <p className="text-xl mb-6 animate-in fade-in slide-in-from-bottom-4">
                Nadie sabía por qué ocurría esto, hasta que un día, un niño llamado Leo decidió escalar la montaña mágica. Llevaba en su mochila solo una lupa, un cuaderno y tres sándwiches de mermelada.
              </p>
            )}
            {progreso >= 50 && (
              <p className="text-xl mb-6 animate-in fade-in slide-in-from-bottom-4">
                A mitad de camino, encontró una cueva oculta tras unos arbustos gigantes. De adentro, provenía un sonido rítmico: ¡Puf! ¡Puf! ¡Puf! Leo, con el corazón latiendo a mil por hora, se asomó lentamente.
              </p>
            )}
            {progreso >= 75 && (
              <p className="text-xl mb-6 animate-in fade-in slide-in-from-bottom-4">
                Para su sorpresa, no había un monstruo de fuego. Había un pequeño dragón usando una enorme máquina de hacer algodón de azúcar. ¡El misterio de las nubes de colores había sido resuelto!
              </p>
            )}
          </div>

          <div className="mt-12 text-center">
            {progreso < 100 ? (
              <Button onClick={avanzarLectura} className="bg-[#2A5C82] hover:bg-blue-800 text-white px-8 py-3 text-lg rounded-full shadow-md">
                Siguiente Párrafo ↓
              </Button>
            ) : (
              <Button onClick={() => router.push('/juegos')} className="bg-[#FF8C00] hover:bg-orange-600 text-white px-8 py-3 text-lg rounded-full shadow-md animate-bounce">
                ¡Ir al Quiz de Comprensión!
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
