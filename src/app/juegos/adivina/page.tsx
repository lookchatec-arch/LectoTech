"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export default function AdivinaPage() {
  const router = useRouter();

  return (
    <div className="p-4 md:p-8 w-full max-w-4xl mx-auto min-h-screen">
      <header className="mb-8">
        <button onClick={() => router.push('/dashboard')} className="text-[#2A5C82] hover:text-blue-800 mb-2 font-bold flex items-center gap-2">
          ← Volver al Mapa
        </button>
        <h1 className="text-3xl font-bold text-[#FF8C00]">Adivina la Palabra 🤔</h1>
      </header>

      <Card className="bg-white border-2 border-[#FF8C00] shadow-xl text-center">
        <CardContent className="p-16">
          <div className="text-6xl mb-6">🚧</div>
          <h2 className="text-2xl font-bold text-[#2A5C82] mb-4">Actividad en Construcción</h2>
          <p className="text-gray-600 mb-8">Esta actividad ha sido desbloqueada para la siguiente fase. ¡Pronto podrás jugar adivinanzas!</p>
          <Button onClick={() => router.push('/dashboard')} className="bg-[#FF8C00] hover:bg-orange-600 text-white font-bold py-4 px-8 text-lg">
            Regresar al Mapa
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
