"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function ProfesorPage() {
  const [activeTab, setActiveTab] = useState<'panel' | 'clases' | 'actividades' | 'perfil'>('panel');
  const statsRef = useRef<HTMLDivElement>(null);
  
  // Perfil State
  const [perfil, setPerfil] = useState({ nombre: 'Profesor Demo', foto: '', email: 'profe@escuela.com' });

  // Clases y Estudiantes State
  const [clases, setClases] = useState([{ id: 1, nombre: '5to Básica', codigo: 'DEMO-5A' }]);
  const [estudiantes, setEstudiantes] = useState<any[]>([
    { id: 1, nombre: 'Mateo Rojas', clase: '5to Básica', avance: 85 },
    { id: 2, nombre: 'Lucía Silva', clase: '5to Básica', avance: 40 },
    { id: 3, nombre: 'Ana Gómez', clase: '6to Básica', avance: 90 },
  ]);

  useEffect(() => {
    const saved = localStorage.getItem('lectotech_estudiantes');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.length > 0) {
          setEstudiantes((prev) => {
            const nuevos = parsed.filter((p: any) => !prev.some(e => e.nombre === p.nombre));
            return [...prev, ...nuevos];
          });
        }
      } catch (e) {
        console.error("Error reading localStorage", e);
      }
    }
  }, []);

  // Actividades State
  const [actividades, setActividades] = useState([
    { id: 1, tipo: 'Lectura', titulo: 'El Volcán Misterioso', clase: '5to Básica' }
  ]);
  const [nuevaActividad, setNuevaActividad] = useState({ tipo: 'Lectura', titulo: '', clase: '5to Básica' });

  // Funciones Estudiantes
  const eliminarEstudiante = (id: number) => {
    if(confirm('¿Estás seguro de eliminar a este estudiante?')) {
      setEstudiantes(estudiantes.filter(e => e.id !== id));
    }
  };

  // Exportar a PDF
  const exportarPDF = async () => {
    if (!statsRef.current) return;
    const canvas = await html2canvas(statsRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('reporte_estadisticas_alumnos.pdf');
  };

  const handlePerfilUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setPerfil({...perfil, foto: url});
    }
  };

  const agregarActividad = (e: React.FormEvent) => {
    e.preventDefault();
    if(nuevaActividad.titulo) {
      setActividades([...actividades, { id: Date.now(), ...nuevaActividad }]);
      setNuevaActividad({...nuevaActividad, titulo: ''});
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto min-h-screen pb-24">
      <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#2A5C82] text-white flex items-center justify-center text-2xl overflow-hidden border-2 border-white shadow-md">
            {perfil.foto ? <img src={perfil.foto} alt="Perfil" className="w-full h-full object-cover"/> : '👨‍🏫'}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[#2A5C82]">Consola Analítica - {perfil.nombre}</h1>
            <p className="text-gray-600 mt-1 text-sm md:text-base">Gestiona tus clases, actividades y monitorea el progreso lector.</p>
          </div>
        </div>
        
        <div className="flex gap-2 bg-gray-100 p-1 rounded-xl shadow-sm overflow-x-auto w-full md:w-auto">
          {['panel', 'clases', 'actividades', 'perfil'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 rounded-lg font-bold transition-all capitalize whitespace-nowrap ${activeTab === tab ? 'bg-white text-[#2A5C82] shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
            >
              {tab === 'clases' ? 'Estudiantes' : tab}
            </button>
          ))}
        </div>
      </header>

      {/* PESTAÑA: PANEL DE CONTROL */}
      {activeTab === 'panel' && (
        <div className="animate-in fade-in duration-300">
          <div className="flex justify-end mb-4">
            <Button onClick={exportarPDF} className="bg-[#FF8C00] hover:bg-orange-600 text-white shadow-md">
              📄 Descargar Reporte PDF
            </Button>
          </div>
          
          <div ref={statsRef} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-[#2A5C82] mb-6">Estadísticas Generales</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-[#2A5C82] text-white border-none shadow-md hover:-translate-y-1 transition-transform">
                <CardContent className="py-6 text-center">
                  <h3 className="text-blue-100 font-medium">Estudiantes Activos</h3>
                  <p className="text-4xl font-bold mt-2">{estudiantes.length}</p>
                </CardContent>
              </Card>
              <Card className="bg-[#4CAF50] text-white border-none shadow-md hover:-translate-y-1 transition-transform">
                <CardContent className="py-6 text-center">
                  <h3 className="text-green-100 font-medium">Lecturas Completadas</h3>
                  <p className="text-4xl font-bold mt-2">142</p>
                </CardContent>
              </Card>
              <Card className="bg-[#FFD700] text-gray-900 border-none shadow-md hover:-translate-y-1 transition-transform">
                <CardContent className="py-6 text-center">
                  <h3 className="text-yellow-800 font-medium">Avance Promedio</h3>
                  <p className="text-4xl font-bold mt-2">71%</p>
                </CardContent>
              </Card>
              <Card className="bg-[#FF8C00] text-white border-none shadow-md hover:-translate-y-1 transition-transform">
                <CardContent className="py-6 text-center">
                  <h3 className="text-orange-100 font-medium">Actividades Creadas</h3>
                  <p className="text-4xl font-bold mt-2">{actividades.length}</p>
                </CardContent>
              </Card>
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-4">Progreso Individual</h3>
            <div className="space-y-4">
              {estudiantes.map((est) => (
                <div key={est.id} className="flex flex-col md:flex-row md:justify-between md:items-center p-4 border rounded-xl bg-gray-50 gap-4">
                  <div className="flex flex-col w-full md:w-1/3">
                    <span className="font-bold text-lg">{est.nombre}</span>
                    <span className="text-sm text-gray-500">{est.clase}</span>
                  </div>
                  <div className="w-full md:w-1/2 bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div className={`h-full ${est.avance > 70 ? 'bg-[#4CAF50]' : 'bg-[#FF8C00]'}`} style={{ width: `${est.avance}%` }}></div>
                  </div>
                  <div className="w-full md:w-1/6 text-right font-bold text-[#2A5C82]">
                    {est.avance}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PESTAÑA: ESTUDIANTES / CLASES */}
      {activeTab === 'clases' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-300">
          <Card>
            <CardHeader className="bg-blue-50">
              <h2 className="text-xl font-bold text-[#2A5C82]">🏫 Códigos de Clases</h2>
            </CardHeader>
            <CardContent className="py-6">
              <p className="text-sm text-gray-600 mb-4">Comparte estos códigos con tus estudiantes para que puedan ingresar a tu clase desde el inicio.</p>
              <div className="space-y-3">
                {clases.map((c) => (
                  <div key={c.id} className="flex justify-between items-center p-4 border rounded-lg bg-gray-50 shadow-sm">
                    <span className="font-bold">{c.nombre}</span>
                    <code className="bg-[#2A5C82] text-white px-4 py-2 rounded-md font-mono font-bold tracking-widest text-lg shadow-inner">{c.codigo}</code>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-red-50">
              <h2 className="text-xl font-bold text-red-800">👩‍🎓 Estudiantes Matriculados</h2>
            </CardHeader>
            <CardContent className="py-6">
              <ul className="space-y-3">
                {estudiantes.map((est) => (
                  <li key={est.id} className="flex justify-between items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                    <div>
                      <p className="font-bold text-gray-800">{est.nombre}</p>
                      <p className="text-xs text-gray-500 font-bold bg-gray-200 px-2 py-1 rounded-full inline-block mt-1">{est.clase}</p>
                    </div>
                    <button 
                      onClick={() => eliminarEstudiante(est.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-100 p-3 rounded-full transition-colors font-bold flex items-center gap-2"
                      title="Eliminar estudiante"
                    >
                      <span className="text-xl">🗑️</span> <span className="hidden md:inline">Remover</span>
                    </button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}

      {/* PESTAÑA: ACTIVIDADES */}
      {activeTab === 'actividades' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-300">
          <Card>
            <CardHeader className="bg-[#4CAF50] text-white rounded-t-2xl">
              <h2 className="text-xl font-bold">➕ Asignar Nueva Actividad</h2>
            </CardHeader>
            <CardContent className="py-6">
              <form onSubmit={agregarActividad} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Tipo de Actividad</label>
                  <select 
                    value={nuevaActividad.tipo}
                    onChange={(e) => setNuevaActividad({...nuevaActividad, tipo: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#4CAF50] outline-none font-medium"
                  >
                    <option value="Lectura">📖 Lectura Comprensiva</option>
                    <option value="Juego Verbos">🏃‍♂️ Juego de Verbos</option>
                    <option value="Juego Sinónimos">🃏 Parejas de Sinónimos</option>
                    <option value="Cuestionario">📝 Preguntas y Respuestas</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Título / Nombre</label>
                  <input 
                    type="text" 
                    required
                    value={nuevaActividad.titulo}
                    onChange={(e) => setNuevaActividad({...nuevaActividad, titulo: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#4CAF50] outline-none"
                    placeholder="Ej. Leer Cap. 1 o Resolver Quiz"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Asignar a la Clase</label>
                  <select 
                    value={nuevaActividad.clase}
                    onChange={(e) => setNuevaActividad({...nuevaActividad, clase: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#4CAF50] outline-none font-medium"
                  >
                    {clases.map(c => <option key={c.id} value={c.nombre}>{c.nombre}</option>)}
                  </select>
                </div>
                <Button type="submit" className="bg-[#4CAF50] hover:bg-green-600 py-4 mt-2 text-lg">Asignar Actividad a Alumnos</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-gray-100">
              <h2 className="text-xl font-bold text-gray-800">📋 Actividades Vigentes</h2>
            </CardHeader>
            <CardContent className="py-6">
              {actividades.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No hay actividades asignadas.</p>
              ) : (
                <div className="space-y-4">
                  {actividades.map(act => (
                    <div key={act.id} className="p-4 border border-l-4 border-l-[#FF8C00] rounded-xl shadow-sm bg-white hover:-translate-y-1 transition-transform">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-xl text-gray-800">{act.titulo}</h3>
                          <p className="text-sm text-[#FF8C00] font-bold mt-1 uppercase">{act.tipo}</p>
                        </div>
                        <span className="bg-[#2A5C82] text-white text-xs px-3 py-1 rounded-full font-bold">{act.clase}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* PESTAÑA: PERFIL */}
      {activeTab === 'perfil' && (
        <div className="max-w-2xl mx-auto animate-in fade-in duration-300">
          <Card>
            <CardHeader className="bg-gradient-to-r from-[#2A5C82] to-blue-500 text-white rounded-t-2xl">
              <h2 className="text-xl font-bold">Configuración de Perfil</h2>
            </CardHeader>
            <CardContent className="py-8 flex flex-col items-center">
              <div className="relative mb-8">
                <div className="w-40 h-40 rounded-full bg-gray-200 border-4 border-[#2A5C82] shadow-xl overflow-hidden flex items-center justify-center">
                  {perfil.foto ? <img src={perfil.foto} className="w-full h-full object-cover"/> : <span className="text-6xl">👨‍🏫</span>}
                </div>
                <label className="absolute bottom-2 right-2 bg-[#FF8C00] hover:bg-orange-600 p-3 rounded-full cursor-pointer shadow-lg text-white transition-transform hover:scale-110 flex items-center justify-center">
                  <span className="text-xl">📷</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handlePerfilUpload}/>
                </label>
              </div>

              <div className="w-full space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Nombre Completo del Docente</label>
                  <input 
                    type="text" 
                    value={perfil.nombre}
                    onChange={(e) => setPerfil({...perfil, nombre: e.target.value})}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#2A5C82] outline-none text-lg font-medium text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Correo Electrónico (Institucional)</label>
                  <input 
                    type="email" 
                    value={perfil.email}
                    onChange={(e) => setPerfil({...perfil, email: e.target.value})}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#2A5C82] outline-none text-lg text-gray-500 bg-gray-50"
                    disabled
                  />
                  <p className="text-xs text-gray-500 mt-2 font-medium">El correo no puede modificarse por razones de seguridad.</p>
                </div>
                <Button className="w-full bg-[#2A5C82] hover:bg-blue-800 py-5 text-xl font-bold shadow-md mt-6 rounded-xl">
                  💾 Guardar Cambios
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

    </div>
  );
}
