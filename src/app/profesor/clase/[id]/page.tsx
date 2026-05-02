"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export default function ClasePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const claseNombre = params.id.replace('-', ' ').toUpperCase();
  const [activeTab, setActiveTab] = useState<'tablon' | 'estudiantes'>('tablon');

  const asignaciones = [
    { id: 1, tipo: 'Juego', titulo: 'Cazador de Verbos', fecha: 'Hoy, 10:00 AM', entregas: '4/6' },
    { id: 2, tipo: 'Lectura', titulo: 'El Misterio del Volcán', fecha: 'Ayer, 14:30 PM', entregas: '6/6' },
  ];

  const estudiantes = [
    { nombre: 'Mateo Rojas', puntos: 350, ultimaActividad: 'Cazador de Verbos (Completado)' },
    { nombre: 'Ana Gómez', puntos: 420, ultimaActividad: 'Parejas de Sinónimos (Completado)' },
    { nombre: 'Diego Torres', puntos: 120, ultimaActividad: 'Pendiente' },
  ];

  return (
    <div className="p-4 md:p-8 w-full max-w-6xl mx-auto min-h-screen bg-gray-50">
      <header className="mb-8">
        <button onClick={() => router.push('/profesor')} className="text-gray-500 hover:text-[#2A5C82] mb-4 font-bold flex items-center gap-2">
          ← Volver a Mis Clases
        </button>
        
        <div className="bg-[#2A5C82] rounded-2xl p-8 shadow-lg text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/3"></div>
          <h1 className="text-4xl font-bold mb-2">{claseNombre}</h1>
          <p className="opacity-80">Código de clase: X7K9-M2</p>
        </div>
      </header>

      {/* Tabs estilo Classroom */}
      <div className="flex gap-2 border-b border-gray-200 mb-8">
        <button 
          onClick={() => setActiveTab('tablon')}
          className={`px-8 py-3 font-bold transition-colors border-b-4 ${activeTab === 'tablon' ? 'border-[#4CAF50] text-[#4CAF50]' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
        >
          Tablón de Actividades
        </button>
        <button 
          onClick={() => setActiveTab('estudiantes')}
          className={`px-8 py-3 font-bold transition-colors border-b-4 ${activeTab === 'estudiantes' ? 'border-[#4CAF50] text-[#4CAF50]' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
        >
          Personas ({estudiantes.length})
        </button>
      </div>

      {activeTab === 'tablon' ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <h3 className="font-bold text-gray-800 mb-2">Próximas entregas</h3>
                <p className="text-sm text-gray-500 mb-4">¡Yuju! No hay tareas para revisar próximamente.</p>
                <Button variant="outline" className="w-full text-[#2A5C82] border-[#2A5C82] text-xs">Ver todo</Button>
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-3 flex flex-col gap-4">
            <Card className="bg-white border border-gray-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center gap-4 text-gray-500">
                <div className="w-10 h-10 rounded-full bg-[#FF8C00] flex items-center justify-center text-white">👨‍🏫</div>
                <span className="flex-grow font-medium">Anuncia algo a tu clase o asigna una actividad...</span>
                <Button className="bg-[#4CAF50] hover:bg-green-600 text-white border-none shadow-sm">Asignar Misión</Button>
              </CardContent>
            </Card>

            {asignaciones.map(asig => (
              <Card key={asig.id} className="bg-white border border-gray-200 shadow-sm hover:border-[#2A5C82] transition-colors cursor-pointer">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${asig.tipo === 'Juego' ? 'bg-orange-100' : 'bg-blue-100'}`}>
                    {asig.tipo === 'Juego' ? '🎮' : '📚'}
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-[#1A202C]">{asig.titulo}</h4>
                    <p className="text-xs text-gray-500">{asig.fecha}</p>
                  </div>
                  <div className="text-right border-l pl-4 border-gray-100">
                    <p className="text-2xl font-bold text-[#2A5C82]">{asig.entregas}</p>
                    <p className="text-xs text-gray-500 font-bold uppercase">Entregas</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="border-b border-gray-100 flex justify-between flex-row items-center">
            <h2 className="text-xl font-bold text-[#2A5C82]">Alumnos</h2>
            <Button variant="outline" className="text-sm">Invitar Alumnos</Button>
          </CardHeader>
          <CardContent className="p-0">
            {estudiantes.map((est, i) => (
              <div key={i} className="flex items-center justify-between p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
                    {est.nombre.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{est.nombre}</p>
                    <p className="text-xs text-gray-500">{est.ultimaActividad}</p>
                  </div>
                </div>
                <div className="font-bold text-[#FFD700] bg-yellow-50 px-3 py-1 rounded-full text-sm">
                  {est.puntos} pts
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
