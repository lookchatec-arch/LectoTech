"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function ProfesorPage() {
  const [activeTab, setActiveTab] = useState<'panel' | 'clases'>('panel');
  
  // Estados para simular la agregación
  const [clases, setClases] = useState(['5to Básica', '6to Básica', '7mo Básica']);
  const [nuevaClase, setNuevaClase] = useState('');
  
  const [estudiantes, setEstudiantes] = useState([
    { nombre: 'Mateo Rojas', clase: '5to Básica' },
    { nombre: 'Lucía Silva', clase: '5to Básica' },
    { nombre: 'Ana Gómez', clase: '6to Básica' },
    { nombre: 'Carlos Ruiz', clase: '6to Básica' },
    { nombre: 'Diego Torres', clase: '7mo Básica' },
    { nombre: 'Sofía Castro', clase: '7mo Básica' }
  ]);
  const [nuevoEstudiante, setNuevoEstudiante] = useState('');
  const [claseSeleccionada, setClaseSeleccionada] = useState('5to Básica');

  const handleAgregarClase = (e: React.FormEvent) => {
    e.preventDefault();
    if (nuevaClase.trim()) {
      setClases([...clases, nuevaClase]);
      setNuevaClase('');
    }
  };

  const handleAgregarEstudiante = (e: React.FormEvent) => {
    e.preventDefault();
    if (nuevoEstudiante.trim()) {
      setEstudiantes([...estudiantes, { nombre: nuevoEstudiante, clase: claseSeleccionada }]);
      setNuevoEstudiante('');
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-[#2A5C82]">Consola Analítica - Docente</h1>
          <p className="text-gray-600 mt-2">Gestiona tus clases y monitorea el progreso lector.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveTab('panel')}
            className={`px-6 py-2 rounded-t-xl font-bold transition-colors ${activeTab === 'panel' ? 'bg-[#2A5C82] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Panel de Control
          </button>
          <button 
            onClick={() => setActiveTab('clases')}
            className={`px-6 py-2 rounded-t-xl font-bold transition-colors ${activeTab === 'clases' ? 'bg-[#2A5C82] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Gestión de Clases
          </button>
        </div>
      </header>

      {/* PESTAÑA: PANEL DE CONTROL */}
      {activeTab === 'panel' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card style={{ backgroundColor: '#2A5C82' }} className="text-white border-none shadow-md">
              <CardContent className="py-6">
                <h3 className="text-blue-100 font-medium">Estudiantes Activos</h3>
                <p className="text-4xl font-bold mt-2">{estudiantes.length}/30</p>
              </CardContent>
            </Card>
            <Card style={{ backgroundColor: '#4CAF50' }} className="text-white border-none shadow-md">
              <CardContent className="py-6">
                <h3 className="text-green-100 font-medium">Lecturas Completadas</h3>
                <p className="text-4xl font-bold mt-2">142</p>
              </CardContent>
            </Card>
            <Card style={{ backgroundColor: '#FFD700' }} className="text-gray-900 border-none shadow-md">
              <CardContent className="py-6">
                <h3 className="text-yellow-800 font-medium">Tiempo Promedio</h3>
                <p className="text-4xl font-bold mt-2">18 min</p>
              </CardContent>
            </Card>
            <Card style={{ backgroundColor: '#FF8C00' }} className="text-white border-none shadow-md">
              <CardContent className="py-6">
                <h3 className="text-orange-100 font-medium">Alertas</h3>
                <p className="text-4xl font-bold mt-2">2</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-bold text-gray-800">Actividad Reciente</h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex justify-between items-center p-4 border rounded-xl hover:bg-gray-50">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-[#FFD700] flex items-center justify-center text-xl">
                            👦
                          </div>
                          <div>
                            <p className="font-bold">Estudiante {i}</p>
                            <p className="text-sm text-gray-500">Completó "El Misterio del Volcán"</p>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-[#4CAF50]">85% Comprensión</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card className="border-2 border-[#2A5C82]">
                <CardHeader className="bg-blue-50">
                  <h2 className="text-xl font-bold text-[#2A5C82]">Acciones Rápidas</h2>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 py-4">
                  <Button className="w-full">📚 Asignar Lectura</Button>
                  <Button className="w-full bg-[#FF8C00] hover:bg-orange-600 text-white">📝 Generar Quiz</Button>
                  <Button className="w-full bg-[#4CAF50] hover:bg-green-600 text-white">✅ Revisar Textos</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* PESTAÑA: GESTIÓN DE CLASES */}
      {activeTab === 'clases' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* AGREGAR CLASE */}
            <Card>
              <CardHeader className="bg-blue-50">
                <h2 className="text-xl font-bold text-[#2A5C82]">🏫 Crear Nueva Clase</h2>
              </CardHeader>
              <CardContent className="py-6">
                <form onSubmit={handleAgregarClase} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la Clase (ej. 7mo Básica "C")</label>
                    <input 
                      type="text" 
                      value={nuevaClase}
                      onChange={(e) => setNuevaClase(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A5C82] focus:border-transparent outline-none"
                      placeholder="Escribe el nombre aquí..."
                    />
                  </div>
                  <Button type="submit" className="w-full">Agregar Clase</Button>
                </form>

                <div className="mt-8">
                  <h3 className="font-bold text-gray-800 mb-3">Tus Clases Actuales</h3>
                  <div className="flex flex-wrap gap-3">
                    {clases.map((clase, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => window.location.href = `/profesor/clase/${clase.toLowerCase().replace(/ /g, '-')}`}
                        className="bg-white hover:bg-blue-50 px-5 py-3 rounded-xl text-sm font-bold border-2 border-gray-200 hover:border-[#2A5C82] hover:text-[#2A5C82] transition-all shadow-sm flex items-center gap-2 text-gray-700"
                      >
                        🏫 {clase}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AGREGAR ESTUDIANTE */}
            <Card>
              <CardHeader className="bg-green-50">
                <h2 className="text-xl font-bold text-[#4CAF50]">👩‍🎓 Matricular Estudiante</h2>
              </CardHeader>
              <CardContent className="py-6">
                <form onSubmit={handleAgregarEstudiante} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Estudiante</label>
                    <input 
                      type="text" 
                      value={nuevoEstudiante}
                      onChange={(e) => setNuevoEstudiante(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none"
                      placeholder="Ej. Juan Pérez"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Asignar a Clase</label>
                    <select 
                      value={claseSeleccionada}
                      onChange={(e) => setClaseSeleccionada(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none bg-white"
                    >
                      {clases.map((clase, idx) => (
                        <option key={idx} value={clase}>{clase}</option>
                      ))}
                    </select>
                  </div>
                  <Button type="submit" className="w-full bg-[#4CAF50] hover:bg-green-600 text-white">Agregar Estudiante</Button>
                </form>

                <div className="mt-8">
                  <h3 className="font-bold text-gray-800 mb-3">Últimos Estudiantes Añadidos</h3>
                  <ul className="space-y-2">
                    {estudiantes.slice(-3).reverse().map((est, idx) => (
                      <li key={idx} className="flex justify-between p-2 bg-gray-50 rounded-lg border border-gray-100">
                        <span className="font-medium">{est.nombre}</span>
                        <span className="text-sm text-gray-500">{est.clase}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      )}
    </div>
  );
}
