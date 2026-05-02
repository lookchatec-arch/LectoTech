"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export default function TallerPage() {
  const router = useRouter();
  const [titulo, setTitulo] = useState('');
  const [historia, setHistoria] = useState('');

  return (
    <div className="p-4 md:p-8 w-full max-w-7xl mx-auto min-h-screen">
      <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <button onClick={() => router.push('/dashboard')} className="text-[#2A5C82] hover:text-blue-800 mb-2 font-bold flex items-center gap-2">
            ← Volver al Mapa
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-[#FF8C00]">Taller de Escritura ✍️</h1>
          <p className="text-gray-600 mt-2">¡Deja volar tu imaginación y crea tu propio cuento!</p>
        </div>
        <Button className="bg-[#4CAF50] hover:bg-green-600 text-white font-bold" onClick={() => alert('¡Historia guardada y enviada al profesor!')}>
          💾 Guardar y Enviar
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="h-full shadow-md border-t-4 border-[#FF8C00]">
            <CardContent className="p-6">
              <input
                type="text"
                placeholder="Escribe el título de tu historia aquí..."
                className="w-full text-3xl font-bold text-[#2A5C82] border-none outline-none mb-6 placeholder-gray-300 bg-transparent"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
              <div className="h-px w-full bg-gray-100 mb-6"></div>
              <textarea
                placeholder="Había una vez..."
                className="w-full h-96 resize-none text-lg leading-relaxed text-gray-700 border-none outline-none placeholder-gray-300 bg-transparent"
                value={historia}
                onChange={(e) => setHistoria(e.target.value)}
              ></textarea>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card className="bg-orange-50 border-orange-200 shadow-sm">
            <CardHeader>
              <h3 className="font-bold text-[#FF8C00] flex items-center gap-2">
                💡 Ideas para inspirarte
              </h3>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-3 text-gray-700 text-sm">
                <li>Un dragón que le teme al fuego.</li>
                <li>Un viaje al centro de un reloj gigante.</li>
                <li>El día que las nubes se volvieron de algodón de azúcar.</li>
              </ul>
              <Button variant="outline" className="w-full mt-4 border-[#FF8C00] text-[#FF8C00] hover:bg-orange-100">
                Dame otra idea
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="font-bold text-gray-800">Caja de Herramientas</h3>
            </CardHeader>
            <CardContent className="flex gap-2 flex-wrap">
              <button className="px-3 py-1 bg-gray-100 rounded text-sm hover:bg-gray-200">Negrita</button>
              <button className="px-3 py-1 bg-gray-100 rounded text-sm hover:bg-gray-200">Cursiva</button>
              <button className="px-3 py-1 bg-gray-100 rounded text-sm hover:bg-gray-200">Subrayado</button>
              <button className="px-3 py-1 bg-gray-100 rounded text-sm hover:bg-gray-200">Agregar Imagen 🖼️</button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
