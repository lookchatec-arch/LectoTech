"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { supabase } from '@/lib/supabaseClient';

export default function ProfesorPage() {
  const [activeTab, setActiveTab] = useState<'panel' | 'clases' | 'actividades' | 'perfil'>('panel');
  const statsRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  
  // Perfil State
  const [perfil, setPerfil] = useState({ id: '', nombre: 'Profesor', foto: '', email: '' });

  // Clases y Estudiantes State
  const [clases] = useState([
    { id: 1, nombre: '5to Básica', codigo: '5TO-CLASE' },
    { id: 2, nombre: '6to Básica', codigo: '6TO-CLASE' },
    { id: 3, nombre: '7mo Básica', codigo: '7MO-CLASE' }
  ]);
  const [selectedClaseCode, setSelectedClaseCode] = useState<string | null>(null);
  const [estudiantes, setEstudiantes] = useState<any[]>([]);

  // Libros y Actividades State
  const [librosAsignados, setLibrosAsignados] = useState<any[]>([]);
  const [nuevoLibro, setNuevoLibro] = useState({ titulo: '', claseDestino: '5TO-CLASE', archivo: null as File | null });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      setPerfil({
        id: user.id,
        nombre: profile?.full_name || user.user_metadata?.full_name || 'Profesor',
        email: user.email || '',
        foto: profile?.avatar_url || ''
      });

      // Cargar todos los perfiles de estudiantes
      const { data: profiles } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'estudiante');
      
      if (profiles) setEstudiantes(profiles);
      
      fetchLibros(user.id);
    }
  };

  const fetchLibros = async (teacherId: string) => {
    const { data } = await supabase
      .from('library_books')
      .select('*')
      .eq('teacher_id', teacherId);
    if (data) setLibrosAsignados(data);
  };

  const handlePerfilUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${perfil.id}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      setLoading(true);
      const { error: uploadError } = await supabase.storage
        .from('avatares')
        .upload(filePath, file);

      if (uploadError) {
        alert("Error subiendo foto: " + uploadError.message);
      } else {
        const { data: { publicUrl } } = supabase.storage.from('avatares').getPublicUrl(filePath);
        
        await supabase.from('profiles').upsert({
          id: perfil.id,
          avatar_url: publicUrl,
          updated_at: new Date()
        });
        
        setPerfil({ ...perfil, foto: publicUrl });
      }
      setLoading(false);
    }
  };

  const handleUploadBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoLibro.archivo || !nuevoLibro.titulo) return;

    // Verificar si hay estudiantes en la clase antes de subir
    const tieneEstudiantes = estudiantes.some(est => est.clase === nuevoLibro.claseDestino);
    if (!tieneEstudiantes) {
      alert(`No existen estudiantes matriculados todavía en ${nuevoLibro.claseDestino}.`);
      return;
    }

    setLoading(true);
    const file = nuevoLibro.archivo;
    const filePath = `books/${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from('biblioteca')
      .upload(filePath, file);

    if (uploadError) {
      alert("Error subiendo PDF: " + uploadError.message);
    } else {
      const { data: { publicUrl } } = supabase.storage.from('biblioteca').getPublicUrl(filePath);

      const { error: dbError } = await supabase.from('library_books').insert({
        teacher_id: perfil.id,
        class_code: nuevoLibro.claseDestino, // Ahora asignamos por clase
        title: nuevoLibro.titulo,
        pdf_url: publicUrl
      });

      if (dbError) alert("Error guardando en BD: " + dbError.message);
      else {
        alert("¡Libro asignado con éxito a toda la clase!");
        setNuevoLibro({ ...nuevoLibro, titulo: '', archivo: null });
        fetchLibros(perfil.id);
      }
    }
    setLoading(false);
  };

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

  const estudiantesFiltrados = selectedClaseCode 
    ? estudiantes.filter(est => est.clase === selectedClaseCode)
    : [];

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto min-h-screen pb-24">
      <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#2A5C82] text-white flex items-center justify-center text-2xl overflow-hidden border-2 border-white shadow-md">
            {perfil.foto ? <img src={perfil.foto} alt="Perfil" className="w-full h-full object-cover"/> : '👨‍🏫'}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[#2A5C82]">Consola Analítica - {perfil.nombre}</h1>
            <p className="text-gray-600 mt-1 text-sm md:text-base">Gestiona tus clases y sube libros a la biblioteca.</p>
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
              <Card className="bg-[#2A5C82] text-white border-none shadow-md">
                <CardContent className="py-6 text-center">
                  <h3 className="text-blue-100 font-medium">Estudiantes Registrados</h3>
                  <p className="text-4xl font-bold mt-2">{estudiantes.length || 0}</p>
                </CardContent>
              </Card>
              <Card className="bg-[#4CAF50] text-white border-none shadow-md">
                <CardContent className="py-6 text-center">
                  <h3 className="text-green-100 font-medium">Libros Publicados</h3>
                  <p className="text-4xl font-bold mt-2">{librosAsignados.length}</p>
                </CardContent>
              </Card>
              <Card className="bg-[#FFD700] text-gray-900 border-none shadow-md">
                <CardContent className="py-6 text-center">
                  <h3 className="text-yellow-800 font-medium">Efectividad</h3>
                  <p className="text-4xl font-bold mt-2">100%</p>
                </CardContent>
              </Card>
              <Card className="bg-[#FF8C00] text-white border-none shadow-md">
                <CardContent className="py-6 text-center">
                  <h3 className="text-orange-100 font-medium">Mensajes</h3>
                  <p className="text-4xl font-bold mt-2">0</p>
                </CardContent>
              </Card>
            </div>
            <p className="text-gray-500 italic text-center">Bienvenido al nuevo sistema conectado con Supabase.</p>
          </div>
        </div>
      )}

      {/* PESTAÑA: ESTUDIANTES */}
      {activeTab === 'clases' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-300">
          <Card className="lg:col-span-1">
            <CardHeader className="bg-blue-50">
              <h2 className="text-xl font-bold text-[#2A5C82]">🏫 Selecciona Clase</h2>
            </CardHeader>
            <CardContent className="py-6 space-y-3">
              {clases.map((c) => (
                <button 
                  key={c.id}
                  onClick={() => setSelectedClaseCode(c.codigo)}
                  className={`w-full p-4 border rounded-xl flex justify-between items-center transition-all ${selectedClaseCode === c.codigo ? 'bg-[#2A5C82] text-white scale-105 shadow-md' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
                >
                  <span className="font-bold">{c.nombre}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${selectedClaseCode === c.codigo ? 'bg-white text-[#2A5C82]' : 'bg-gray-200'}`}>
                    {estudiantes.filter(e => e.clase === c.codigo).length} alumnos
                  </span>
                </button>
              ))}
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader className="bg-white border-b">
              <h2 className="text-xl font-bold text-gray-800">
                {selectedClaseCode ? `Alumnos en ${selectedClaseCode}` : 'Selecciona una clase para ver alumnos'}
              </h2>
            </CardHeader>
            <CardContent className="py-6">
              {!selectedClaseCode ? (
                <div className="text-center py-12 text-gray-400">
                  <span className="text-6xl mb-4 block">🖱️</span>
                  Haz clic en un código de clase a la izquierda.
                </div>
              ) : estudiantesFiltrados.length === 0 ? (
                <div className="text-center py-12 text-orange-500 font-bold bg-orange-50 rounded-2xl border border-orange-100">
                  <span className="text-5xl mb-4 block">⚠️</span>
                  No hay estudiantes registrados todavía en esta clase.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {estudiantesFiltrados.map(est => (
                    <div key={est.id} className="p-4 border rounded-xl bg-gray-50 flex items-center gap-4 shadow-sm">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-xl overflow-hidden">
                        {est.avatar_url ? <img src={est.avatar_url} className="w-full h-full object-cover" /> : '👤'}
                      </div>
                      <div>
                        <p className="font-bold text-[#2A5C82]">{est.full_name}</p>
                        <p className="text-xs text-gray-500">{est.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* PESTAÑA: ACTIVIDADES / BIBLIOTECA */}
      {activeTab === 'actividades' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-300">
          <Card>
            <CardHeader className="bg-[#4CAF50] text-white rounded-t-2xl">
              <h2 className="text-xl font-bold">📚 Asignar Libro por Clase</h2>
            </CardHeader>
            <CardContent className="py-6">
              <form onSubmit={handleUploadBook} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Título del Libro</label>
                  <input 
                    type="text" required value={nuevoLibro.titulo}
                    onChange={(e) => setNuevoLibro({...nuevoLibro, titulo: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Ej. Guía de Lectura 5to"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Asignar a Clase:</label>
                  <select 
                    value={nuevoLibro.claseDestino}
                    onChange={(e) => setNuevoLibro({...nuevoLibro, claseDestino: e.target.value})}
                    className="w-full p-3 border rounded-lg font-bold text-[#2A5C82]"
                  >
                    {clases.map(c => <option key={c.id} value={c.codigo}>{c.nombre} ({c.codigo})</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Archivo PDF</label>
                  <input 
                    type="file" required accept="application/pdf"
                    onChange={(e) => setNuevoLibro({...nuevoLibro, archivo: e.target.files?.[0] || null})}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <Button type="submit" disabled={loading} className="bg-[#4CAF50] hover:bg-green-600 py-4 mt-2">
                  {loading ? 'Subiendo...' : 'Publicar Libro para la Clase'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-gray-100">
              <h2 className="text-xl font-bold text-gray-800">📋 Libros Publicados</h2>
            </CardHeader>
            <CardContent className="py-6">
              {librosAsignados.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No has subido libros aún.</p>
              ) : (
                <div className="space-y-4">
                  {librosAsignados.map(lib => (
                    <div key={lib.id} className="p-4 border border-l-4 border-l-[#4CAF50] rounded-xl bg-white flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-gray-800">{lib.title}</h3>
                        <p className="text-xs text-[#4CAF50] font-bold">Clase: {lib.class_code}</p>
                      </div>
                      <a href={lib.pdf_url} target="_blank" rel="noreferrer" className="text-blue-500 font-bold text-sm hover:underline">Ver PDF</a>
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
                  <span className="text-xl">{loading ? '⌛' : '📷'}</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handlePerfilUpload} disabled={loading}/>
                </label>
              </div>

              <div className="w-full space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Nombre del Docente</label>
                  <input 
                    type="text" 
                    value={perfil.nombre}
                    onChange={(e) => setPerfil({...perfil, nombre: e.target.value})}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#2A5C82] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Correo</label>
                  <input type="email" value={perfil.email} disabled className="w-full p-4 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-400" />
                </div>
                <Button 
                  onClick={async () => {
                    setLoading(true);
                    await supabase.from('profiles').upsert({ id: perfil.id, full_name: perfil.nombre });
                    alert("Perfil actualizado!");
                    setLoading(false);
                  }}
                  className="w-full bg-[#2A5C82] py-5 text-xl font-bold"
                >
                  {loading ? 'Guardando...' : '💾 Guardar Cambios'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
