"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

export default function BibliotecaPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const grado = searchParams.get('grado') || '5';
  const [filtroActivo, setFiltroActivo] = useState('Todos');

  const libros = [
    { id: 1, titulo: "El Misterio del Volcán", autor: "Autor Desconocido", tiempo: "10 min", imagen: "/images/volcan_misterio_1777709105458.png", categoria: "Aventura", ruta: `/lectura/el-misterio?grado=${grado}` },
    { id: 2, titulo: "El Castillo de Cristal", autor: "Prof. Martínez", tiempo: "15 min", imagen: "/images/castillo_cristal_1777709122423.png", categoria: "Fantasía", ruta: `/lectura/el-misterio?grado=${grado}` },
    { id: 3, titulo: "El Bosque Encantado", autor: "Ana Gómez", tiempo: "5 min", imagen: "/images/bosque_encantado_1777709136330.png", categoria: "Fantasía", ruta: `/lectura/el-misterio?grado=${grado}` },
  ];

  const filtros = ['Todos', 'Aventura', 'Fantasía', '5 min', '10 min', '15 min'];

  const librosFiltrados = libros.filter(libro => {
    if (filtroActivo === 'Todos') return true;
    if (['Aventura', 'Fantasía'].includes(filtroActivo)) return libro.categoria === filtroActivo;
    return libro.tiempo === filtroActivo;
  });

  return (
    <div className="p-4 md:p-8 w-full max-w-7xl mx-auto min-h-screen">
      <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <button onClick={() => router.push(`/dashboard?estudiante=explorador&grado=${grado}`)} className="text-[#2A5C82] hover:text-blue-800 mb-2 font-bold flex items-center gap-2">
            ← Volver al Mapa
          </button>
          <h1 className="text-3xl md:text-5xl font-bold text-[#2A5C82]">Biblioteca Mágica 📚</h1>
          <p className="text-gray-600 mt-2 text-lg">Descubre nuevas historias adaptadas a tu nivel.</p>
        </div>
      </header>

      {/* Filtros */}
      <div className="flex flex-wrap gap-3 mb-8">
        {filtros.map(filtro => (
          <button 
            key={filtro}
            onClick={() => setFiltroActivo(filtro)}
            className={`px-5 py-2 rounded-full font-bold transition-all shadow-sm ${
              filtroActivo === filtro 
                ? 'bg-[#2A5C82] text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {filtro}
          </button>
        ))}
      </div>

      {/* Grid de Libros */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {librosFiltrados.map((libro) => (
          <Card key={libro.id} className="hover:-translate-y-2 transition-transform duration-300 bg-white border-2 border-transparent hover:border-[#4CAF50] overflow-hidden group shadow-md">
            <div className="relative h-48 w-full bg-gray-200 overflow-hidden">
              <Image 
                src={libro.imagen} 
                alt={libro.titulo} 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-xs font-bold text-[#FF8C00] shadow-md flex items-center gap-1">
                ⏱️ {libro.tiempo}
              </div>
              <div className="absolute top-3 left-3 bg-[#4CAF50] px-3 py-1 rounded-full text-xs font-bold text-white shadow-md">
                {libro.categoria}
              </div>
            </div>
            <CardContent className="p-6 flex flex-col gap-4">
              <div>
                <h3 className="text-xl font-bold text-[#1A202C]">{libro.titulo}</h3>
                <p className="text-sm text-gray-500">Por {libro.autor}</p>
              </div>
              <Button 
                className="w-full text-white font-bold bg-[#2A5C82] hover:bg-blue-800 border-none shadow-md mt-auto" 
                onClick={() => router.push(libro.ruta)}
              >
                Leer Ahora
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
