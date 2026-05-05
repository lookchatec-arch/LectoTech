"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { supabase } from '@/lib/supabaseClient';

export default function ProfesorPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'panel' | 'clases' | 'actividades' | 'perfil'>('panel');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  
  // Perfil State
  const [perfil, setPerfil] = useState({ id: '', nombre: 'Profesor', foto: '', email: '' });

  // Clases y Estudiantes State
  const [clases] = useState([
    { id: 1, nombre: '5to Básica', codigo: '5TO-CLASE', icon: '📚' },
    { id: 2, nombre: '6to Básica', codigo: '6TO-CLASE', icon: '📝' },
    { id: 3, nombre: '7mo Básica', codigo: '7MO-CLASE', icon: '🎓' }
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
        await supabase.from('profiles').upsert({ id: perfil.id, avatar_url: publicUrl, updated_at: new Date() });
        setPerfil({ ...perfil, foto: publicUrl });
      }
      setLoading(false);
    }
  };

  const handleUploadBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoLibro.archivo || !nuevoLibro.titulo) return;

    const tieneEstudiantes = estudiantes.some(est => est.clase === nuevoLibro.claseDestino);
    if (!tieneEstudiantes) {
      alert(`No existen estudiantes matriculados todavía en ${nuevoLibro.claseDestino}.`);
      return;
    }

    setLoading(true);
    const file = nuevoLibro.archivo;
    const filePath = `books/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage.from('biblioteca').upload(filePath, file);

    if (uploadError) {
      alert("Error subiendo PDF: " + uploadError.message);
    } else {
      const { data: { publicUrl } } = supabase.storage.from('biblioteca').getPublicUrl(filePath);
      const { error: dbError } = await supabase.from('library_books').insert({
        teacher_id: perfil.id,
        class_code: nuevoLibro.claseDestino,
        title: nuevoLibro.titulo,
        pdf_url: publicUrl
      });

      if (dbError) alert("Error guardando en BD: " + dbError.message);
      else {
        alert("¡Libro asignado con éxito!");
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
    pdf.save('reporte_estadisticas_docente.pdf');
  };

  const NavItem = ({ id, icon, label }: { id: typeof activeTab, icon: string, label: string }) => (
    <button
      onClick={() => { setActiveTab(id); setIsSidebarOpen(false); }}
      className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 w-full text-left font-bold ${activeTab === id ? 'bg-white text-[#2A5C82] shadow-lg scale-105' : 'text-blue-100 hover:bg-blue-700/50 hover:translate-x-2'}`}
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-lg">{label}</span>
    </button>
  );

  return (
    <div className="flex min-h-screen bg-[var(--color-paper-cream)] overflow-hidden font-outfit">
      
      {/* SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-[#2A5C82] to-[#1A3A52] text-white p-6 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex flex-col h-full">
          <div className="mb-10 flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-inner">👨‍🏫</div>
            <div>
              <h2 className="text-xl font-black tracking-tight">LectoTech</h2>
              <p className="text-blue-200 text-xs font-bold uppercase tracking-widest">Portal Docente</p>
            </div>
          </div>

          <nav className="space-y-3 flex-1">
            <NavItem id="panel" icon="📊" label="Panel Analítico" />
            <NavItem id="clases" icon="👥" label="Mis Estudiantes" />
            <NavItem id="actividades" icon="📚" label="Biblioteca" />
            <NavItem id="perfil" icon="⚙️" label="Configuración" />
          </nav>

          <div className="mt-auto pt-6 border-t border-blue-400/30">
            <button
              onClick={async () => { await supabase.auth.signOut(); router.push('/'); }}
              className="flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 w-full text-left font-bold text-red-200 hover:bg-red-500 hover:text-white group"
            >
              <span className="text-2xl group-hover:rotate-12 transition-transform">🚪</span>
              <span className="text-lg">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </aside>

      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        
        {/* HEADER */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 p-4 md:px-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:bg-gray-100 rounded-xl lg:hidden text-gray-600">
              <span className="text-2xl">☰</span>
            </button>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-[#2A5C82] flex items-center gap-2">
                {activeTab === 'panel' && "📊 Panel Analítico"}
                {activeTab === 'clases' && "👥 Mis Estudiantes"}
                {activeTab === 'actividades' && "📚 Biblioteca"}
                {activeTab === 'perfil' && "⚙️ Configuración"}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-800">{perfil.nombre}</p>
              <p className="text-xs text-gray-500">{perfil.email}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center">
              {perfil.foto ? <img src={perfil.foto} className="w-full h-full object-cover" /> : '👨‍🏫'}
            </div>
          </div>
        </header>

        {/* CONTENT AREA */}
        <div className="p-4 md:p-8 flex-1">
          
          {activeTab === 'panel' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black text-gray-800 tracking-tight">Estadísticas Generales</h2>
                <Button onClick={exportarPDF} className="bg-[#FF8C00] hover:bg-orange-600 text-white shadow-lg flex gap-2">
                  <span>📄</span> Descargar Reporte
                </Button>
              </div>
              
              <div ref={statsRef} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: 'Estudiantes', val: estudiantes.length, icon: '👥', color: 'bg-blue-500' },
                    { label: 'Libros', val: librosAsignados.length, icon: '📚', color: 'bg-green-500' },
                    { label: 'Efectividad', val: '100%', icon: '⭐', color: 'bg-yellow-500' },
                    { label: 'Mensajes', val: '0', icon: '📩', color: 'bg-orange-500' }
                  ].map((s, idx) => (
                    <Card key={idx} className="border-none shadow-xl overflow-hidden hover:scale-105 transition-transform">
                      <div className={`h-2 ${s.color}`} />
                      <CardContent className="p-6 flex items-center justify-between">
                        <div>
                          <p className="text-gray-500 font-bold text-sm uppercase tracking-wider">{s.label}</p>
                          <p className="text-3xl font-black mt-1 text-gray-800">{s.val}</p>
                        </div>
                        <div className={`text-4xl ${s.color.replace('bg-', 'text-')} bg-opacity-10 p-3 rounded-2xl`}>{s.icon}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="shadow-2xl border-none p-6 md:p-10 text-center bg-white">
                  <div className="max-w-md mx-auto">
                    <span className="text-6xl block mb-6">🚀</span>
                    <h3 className="text-2xl font-bold text-[#2A5C82] mb-2">¡Todo bajo control!</h3>
                    <p className="text-gray-500 leading-relaxed">
                      Este panel te permite monitorear el progreso de tus clases en tiempo real. 
                      Pronto añadiremos más gráficas interactivas.
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'clases' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="lg:col-span-1 shadow-xl border-none">
                <CardHeader className="bg-gray-50 border-b border-gray-100 p-6">
                  <h2 className="text-xl font-black text-[#2A5C82]">🏫 Selecciona Clase</h2>
                </CardHeader>
                <CardContent className="p-6 space-y-3">
                  {clases.map((c) => (
                    <button 
                      key={c.id}
                      onClick={() => setSelectedClaseCode(c.codigo)}
                      className={`w-full p-5 border-2 rounded-2xl flex justify-between items-center transition-all ${selectedClaseCode === c.codigo ? 'border-[#2A5C82] bg-blue-50 text-[#2A5C82] scale-105 shadow-md' : 'border-gray-50 bg-gray-50 text-gray-600 hover:border-gray-200'}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{c.icon}</span>
                        <span className="font-bold text-lg">{c.nombre}</span>
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full font-black ${selectedClaseCode === c.codigo ? 'bg-[#2A5C82] text-white' : 'bg-gray-200'}`}>
                        {estudiantes.filter(e => e.clase === c.codigo).length}
                      </span>
                    </button>
                  ))}
                </CardContent>
              </Card>

              <Card className="lg:col-span-2 shadow-xl border-none">
                <CardHeader className="bg-white border-b border-gray-100 p-6">
                  <h2 className="text-xl font-black text-gray-800">
                    {selectedClaseCode ? `Alumnos en ${selectedClaseCode}` : '👋 ¡Hola! Selecciona una clase'}
                  </h2>
                </CardHeader>
                <CardContent className="p-6 min-h-[400px]">
                  {!selectedClaseCode ? (
                    <div className="flex flex-col items-center justify-center h-full text-center py-20">
                      <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center text-6xl mb-6">🔍</div>
                      <p className="text-gray-400 font-bold text-lg">Haz clic en una clase de la izquierda para ver el listado.</p>
                    </div>
                  ) : estudiantes.filter(e => e.clase === selectedClaseCode).length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center py-20 bg-orange-50 rounded-3xl border-2 border-dashed border-orange-200">
                      <span className="text-6xl mb-6">⚠️</span>
                      <p className="text-orange-600 font-black text-xl mb-2">Sin estudiantes registrados</p>
                      <p className="text-orange-400 max-w-xs">Aún no hay alumnos matriculados en este grado con el código correspondiente.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {estudiantes.filter(e => e.clase === selectedClaseCode).map(est => (
                        <div key={est.id} className="p-5 border-2 border-gray-50 rounded-2xl bg-white flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                          <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-2xl overflow-hidden border-2 border-white shadow-sm">
                            {est.avatar_url ? <img src={est.avatar_url} className="w-full h-full object-cover" /> : '👤'}
                          </div>
                          <div className="min-w-0">
                            <p className="font-black text-[#2A5C82] truncate">{est.full_name}</p>
                            <p className="text-xs text-gray-400 truncate">{est.email}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'actividades' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="shadow-xl border-none">
                <CardHeader className="bg-gradient-to-r from-[#4CAF50] to-[#45a049] text-white p-6 rounded-t-3xl">
                  <h2 className="text-xl font-black">📚 Asignar Libro por Clase</h2>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleUploadBook} className="space-y-6">
                    <div>
                      <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wider">Título del Libro</label>
                      <input 
                        type="text" required value={nuevoLibro.titulo}
                        onChange={(e) => setNuevoLibro({...nuevoLibro, titulo: e.target.value})}
                        className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-[#4CAF50] focus:bg-white outline-none transition-all"
                        placeholder="Ej. Aventuras Literarias"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wider">Grado de Destino</label>
                      <select 
                        value={nuevoLibro.claseDestino}
                        onChange={(e) => setNuevoLibro({...nuevoLibro, claseDestino: e.target.value})}
                        className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-[#4CAF50] focus:bg-white outline-none font-bold text-[#2A5C82]"
                      >
                        {clases.map(c => <option key={c.id} value={c.codigo}>{c.nombre} ({c.codigo})</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wider">Archivo (Solo PDF)</label>
                      <div className="relative group">
                        <input 
                          type="file" required accept="application/pdf"
                          onChange={(e) => setNuevoLibro({...nuevoLibro, archivo: e.target.files?.[0] || null})}
                          className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl cursor-pointer file:hidden"
                        />
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#4CAF50] font-bold">
                          {nuevoLibro.archivo ? '✅ Seleccionado' : '📁 Elegir Archivo'}
                        </div>
                      </div>
                    </div>
                    <Button type="submit" disabled={loading} className="w-full bg-[#4CAF50] hover:bg-green-600 py-6 text-xl rounded-2xl shadow-lg transition-transform hover:-translate-y-1">
                      {loading ? 'Subiendo...' : 'Publicar en la Clase'}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="shadow-xl border-none">
                <CardHeader className="bg-gray-50 border-b border-gray-100 p-6">
                  <h2 className="text-xl font-black text-gray-800">📋 Libros Publicados</h2>
                </CardHeader>
                <CardContent className="p-6">
                  {librosAsignados.length === 0 ? (
                    <div className="text-center py-20 text-gray-300">
                      <span className="text-8xl block mb-6">📖</span>
                      <p className="text-lg font-bold">No has subido libros todavía.</p>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                      {librosAsignados.map(lib => (
                        <div key={lib.id} className="p-5 border-2 border-gray-50 rounded-2xl bg-white flex justify-between items-center group hover:border-[#4CAF50] transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-50 text-[#4CAF50] rounded-xl flex items-center justify-center text-2xl font-bold">PDF</div>
                            <div>
                              <h3 className="font-black text-gray-800 leading-tight">{lib.title}</h3>
                              <p className="text-xs text-[#4CAF50] font-black uppercase tracking-widest mt-1">Clase: {lib.class_code}</p>
                            </div>
                          </div>
                          <a href={lib.pdf_url} target="_blank" rel="noreferrer" className="bg-gray-100 hover:bg-[#4CAF50] hover:text-white p-3 rounded-xl transition-all">
                            👁️
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'perfil' && (
            <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card className="shadow-2xl border-none overflow-hidden rounded-3xl">
                <div className="h-32 bg-gradient-to-r from-[#2A5C82] to-blue-500" />
                <CardContent className="px-8 pb-10 flex flex-col items-center -mt-16">
                  <div className="relative mb-8">
                    <div className="w-40 h-40 rounded-full bg-white border-8 border-white shadow-2xl overflow-hidden flex items-center justify-center">
                      {perfil.foto ? <img src={perfil.foto} className="w-full h-full object-cover"/> : <span className="text-6xl">👨‍🏫</span>}
                    </div>
                    <label className="absolute bottom-2 right-2 bg-[#FF8C00] hover:bg-orange-600 p-3 rounded-full cursor-pointer shadow-lg text-white transition-transform hover:scale-110">
                      <span className="text-xl">{loading ? '⌛' : '📷'}</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handlePerfilUpload} disabled={loading}/>
                    </label>
                  </div>

                  <div className="w-full space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-black text-gray-500 mb-2 uppercase tracking-widest">Nombre Completo</label>
                        <input 
                          type="text" 
                          value={perfil.nombre}
                          onChange={(e) => setPerfil({...perfil, nombre: e.target.value})}
                          className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-[#2A5C82] outline-none font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-black text-gray-500 mb-2 uppercase tracking-widest">Email Corporativo</label>
                        <input type="email" value={perfil.email} disabled className="w-full p-4 bg-gray-100 border-2 border-gray-100 rounded-2xl text-gray-400 font-bold" />
                      </div>
                    </div>
                    <Button 
                      onClick={async () => {
                        setLoading(true);
                        await supabase.from('profiles').upsert({ id: perfil.id, full_name: perfil.nombre });
                        alert("¡Perfil actualizado con éxito!");
                        setLoading(false);
                      }}
                      className="w-full bg-[#2A5C82] py-6 text-xl font-black rounded-2xl shadow-xl transition-transform hover:-translate-y-1"
                    >
                      {loading ? 'Guardando...' : '💾 Guardar Cambios'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
