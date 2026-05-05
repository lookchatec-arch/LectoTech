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
  const [activeTab, setActiveTab] = useState<'panel' | 'clases' | 'actividades' | 'mensajes' | 'perfil'>('panel');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  
  // Mensajes State
  const [msgTargetType, setMsgTargetType] = useState<'class' | 'student'>('class');
  const [msgTargetId, setMsgTargetId] = useState('');
  const [msgContent, setMsgContent] = useState('');
  const [msgFile, setMsgFile] = useState<File | null>(null);
  const [mensajesEnviados, setMensajesEnviados] = useState<any[]>([]);
  
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
      fetchMensajes(user.id);
    }
  };

  const fetchMensajes = async (teacherId: string) => {
    const { data } = await supabase
      .from('messages')
      .select(`
        *,
        message_stars(user_id),
        message_comments(*)
      `)
      .eq('sender_id', teacherId)
      .order('created_at', { ascending: false });
    if (data) setMensajesEnviados(data);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgContent && !msgFile) return;
    if (!msgTargetId) {
      alert("Por favor selecciona un destino (clase o estudiante)");
      return;
    }

    setLoading(true);
    let mediaUrl = '';
    let mediaType: 'image' | 'pdf' | undefined = undefined;

    if (msgFile) {
      const fileExt = msgFile.name.split('.').pop();
      const fileName = `${perfil.id}-${Date.now()}.${fileExt}`;
      const bucket = fileExt === 'pdf' ? 'biblioteca' : 'avatares'; // Reusamos buckets o creamos uno nuevo
      
      const { error: uploadError } = await supabase.storage.from(bucket).upload(`messages/${fileName}`, msgFile);
      if (uploadError) {
        alert("Error subiendo archivo: " + uploadError.message);
      } else {
        const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(`messages/${fileName}`);
        mediaUrl = publicUrl;
        mediaType = fileExt === 'pdf' ? 'pdf' : 'image';
      }
    }

    const { error } = await supabase.from('messages').insert({
      sender_id: perfil.id,
      target_type: msgTargetType,
      target_id: msgTargetId,
      content: msgContent,
      media_url: mediaUrl,
      media_type: mediaType
    });

    if (error) {
      alert("Error enviando mensaje: " + error.message);
    } else {
      alert("¡Mensaje enviado con éxito!");
      setMsgContent('');
      setMsgFile(null);
      fetchMensajes(perfil.id);
    }
    setLoading(false);
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

  const handleChangeStudentClass = async (studentId: string, newClass: string) => {
    const { error } = await supabase
      .from('profiles')
      .update({ clase: newClass })
      .eq('id', studentId);
    
    if (error) {
      alert("Error actualizando clase: " + error.message);
    } else {
      // Actualizar estado local
      setEstudiantes(prev => prev.map(est => est.id === studentId ? { ...est, clase: newClass } : est));
      alert("Clase asignada con éxito.");
    }
  };

  const handleDeleteMessage = async (msgId: string) => {
    if (!confirm("¿Seguro que quieres eliminar este mensaje?")) return;
    const { error } = await supabase.from('messages').delete().eq('id', msgId);
    if (error) alert("Error: " + error.message);
    else fetchMensajes(perfil.id);
  };

  const handleDeleteBook = async (bookId: string) => {
    if (!confirm("¿Seguro que quieres eliminar este libro de la biblioteca?")) return;
    const { error } = await supabase.from('library_books').delete().eq('id', bookId);
    if (error) alert("Error: " + error.message);
    else fetchLibros(perfil.id);
  };

  const handleUploadBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoLibro.archivo || !nuevoLibro.titulo) return;

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
    setLoading(true);
    const element = statsRef.current;
    if (!element) {
      setLoading(false);
      return;
    }

    try {
      // Configuraciones para máxima compatibilidad
      const canvas = await html2canvas(element, {
        scale: 1.5, // Bajamos un poco la escala para evitar errores de memoria
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: true,
        onclone: (clonedDoc) => {
          // Aseguramos que elementos ocultos no afecten
          const el = clonedDoc.getElementById('pdf-content');
          if (el) el.style.display = 'block';
        }
      });
      
      const imgData = canvas.toDataURL('image/jpeg', 0.8);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      // Encabezado decorativo
      pdf.setFillColor(42, 92, 130);
      pdf.rect(0, 0, pdfWidth, 15, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(12);
      pdf.text('REPORTE OFICIAL LECTOTECH', pdfWidth / 2, 10, { align: 'center' });
      
      pdf.addImage(imgData, 'JPEG', 0, 20, pdfWidth, pdfHeight);
      
      pdf.save(`Reporte_LectoTech_${new Date().getTime()}.pdf`);
      alert("¡Reporte generado con éxito!");
    } catch (error) {
      console.error("Error al generar PDF:", error);
      alert("Error técnico al generar el PDF. Por favor, asegúrate de que no haya ventanas emergentes bloqueadas.");
    }
    setLoading(false);
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
            <NavItem id="mensajes" icon="📩" label="Mensajes" />
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
              <div className="flex justify-end mb-4">
            <Button onClick={exportarPDF} disabled={loading} className="bg-[#FF8C00] hover:bg-orange-600 text-white shadow-lg flex gap-2">
              <span>{loading ? '⌛' : '📄'}</span> {loading ? 'Generando...' : 'Descargar Reporte PDF'}
            </Button>
          </div>
          
          <div ref={statsRef} className="bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-gray-100 space-y-10">
            {/* ENCABEZADO DEL REPORTE */}
            <div className="flex justify-between items-start border-b-2 border-blue-50 pb-8">
              <div>
                <h2 className="text-3xl font-black text-[#2A5C82] tracking-tighter uppercase mb-1">Informe de Desempeño</h2>
                <p className="text-gray-500 font-bold tracking-widest text-xs uppercase">Periodo Lectivo 2026 - LectoTech</p>
              </div>
              <div className="text-right">
                <p className="font-black text-gray-800">{perfil.nombre}</p>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Docente de Lengua y Literatura</p>
              </div>
            </div>

            {/* CARDS RESUMEN */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Estudiantes', val: estudiantes.length, icon: '👥', color: 'bg-blue-500', text: 'text-blue-500' },
                { label: 'Biblioteca', val: librosAsignados.length, icon: '📚', color: 'bg-green-500', text: 'text-green-500' },
                { label: 'Efectividad', val: '100%', icon: '⭐', color: 'bg-yellow-500', text: 'text-yellow-600' },
                { label: 'Mensajes', val: mensajesEnviados.length, icon: '📩', color: 'bg-orange-500', text: 'text-orange-500' }
              ].map((s, idx) => (
                <div key={idx} className="bg-gray-50 p-6 rounded-3xl border-2 border-white shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 font-black text-[10px] uppercase tracking-widest">{s.label}</p>
                    <p className={`text-3xl font-black ${s.text}`}>{s.val}</p>
                  </div>
                  <span className="text-3xl opacity-50">{s.icon}</span>
                </div>
              ))}
            </div>

            {/* DESGLOSE POR GRADO */}
            <div className="space-y-6">
              <h3 className="text-xl font-black text-gray-800 flex items-center gap-2">
                <span className="w-2 h-6 bg-[#2A5C82] rounded-full"></span>
                Distribución por Grados
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {clases.map(clase => {
                  const numEst = estudiantes.filter(e => e.clase === clase.codigo).length;
                  const porcentaje = estudiantes.length > 0 ? (numEst / estudiantes.length) * 100 : 0;
                  return (
                    <div key={clase.id} className="p-6 bg-white border-2 border-gray-50 rounded-3xl shadow-sm">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-2xl">{clase.icon}</span>
                        <span className="font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-xs">{clase.codigo}</span>
                      </div>
                      <p className="font-bold text-gray-800">{clase.nombre}</p>
                      <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${porcentaje}%` }}></div>
                      </div>
                      <p className="mt-2 text-sm font-black text-gray-400">{numEst} Estudiantes</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* TABLA DE ESTUDIANTES */}
            <div className="space-y-6">
              <h3 className="text-xl font-black text-gray-800 flex items-center gap-2">
                <span className="w-2 h-6 bg-[#4CAF50] rounded-full"></span>
                Nómina de Estudiantes Registrados
              </h3>
              <div className="border-2 border-gray-50 rounded-3xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-4 font-black text-gray-500 text-xs uppercase tracking-widest">Estudiante</th>
                      <th className="p-4 font-black text-gray-500 text-xs uppercase tracking-widest">Clase</th>
                      <th className="p-4 font-black text-gray-500 text-xs uppercase tracking-widest">Correo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {estudiantes.length === 0 ? (
                      <tr><td colSpan={3} className="p-8 text-center text-gray-400 font-bold italic">No hay estudiantes matriculados todavía.</td></tr>
                    ) : (
                      estudiantes.slice(0, 15).map(est => (
                        <tr key={est.id} className="hover:bg-blue-50/30 transition-colors">
                          <td className="p-4 font-bold text-gray-800">{est.full_name}</td>
                          <td className="p-4"><span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-black text-gray-500">{est.clase || 'S/A'}</span></td>
                          <td className="p-4 text-xs text-gray-400 font-medium">{est.email}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                {estudiantes.length > 15 && <p className="p-4 bg-gray-50 text-center text-xs font-bold text-gray-400 italic">Y {estudiantes.length - 15} estudiantes más...</p>}
              </div>
            </div>
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
                  
                  {/* Categoría especial para alumnos sin clase asignada */}
                  <button 
                    onClick={() => setSelectedClaseCode('S/A')}
                    className={`w-full p-5 border-2 rounded-2xl flex justify-between items-center transition-all ${selectedClaseCode === 'S/A' ? 'border-orange-500 bg-orange-50 text-orange-600 scale-105 shadow-md' : 'border-gray-50 bg-gray-50 text-gray-600 hover:border-gray-200'}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">❓</span>
                      <span className="font-bold text-lg">Sin Asignar</span>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-black ${selectedClaseCode === 'S/A' ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}>
                      {estudiantes.filter(e => e.clase === 'S/A' || !e.clase).length}
                    </span>
                  </button>
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
                  ) : estudiantes.filter(e => selectedClaseCode === 'S/A' ? (e.clase === 'S/A' || !e.clase) : e.clase === selectedClaseCode).length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center py-20 bg-orange-50 rounded-3xl border-2 border-dashed border-orange-200">
                      <span className="text-6xl mb-6">⚠️</span>
                      <p className="text-orange-600 font-black text-xl mb-2">Sin estudiantes registrados</p>
                      <p className="text-orange-400 max-w-xs">Aún no hay alumnos matriculados en este grado con el código correspondiente.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {estudiantes.filter(e => selectedClaseCode === 'S/A' ? (e.clase === 'S/A' || !e.clase) : e.clase === selectedClaseCode).map(est => (
                        <div key={est.id} className="p-5 border-2 border-gray-50 rounded-2xl bg-white flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                          <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-2xl overflow-hidden border-2 border-white shadow-sm">
                            {est.avatar_url ? <img src={est.avatar_url} className="w-full h-full object-cover" /> : '👤'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-black text-[#2A5C82] truncate">{est.full_name}</p>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
                              <p className="text-xs text-gray-400 truncate flex-1">{est.email}</p>
                              
                              <select 
                                value={est.clase || 'S/A'}
                                onChange={(e) => handleChangeStudentClass(est.id, e.target.value)}
                                className="text-[10px] font-black uppercase bg-gray-50 border-none rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-blue-100"
                              >
                                <option value="S/A">Sin Grado</option>
                                <option value="5TO-CLASE">5to Básica</option>
                                <option value="6TO-CLASE">6to Básica</option>
                                <option value="7MO-CLASE">7mo Básica</option>
                              </select>
                            </div>
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
                          <div className="flex gap-2">
                            <a href={lib.pdf_url} target="_blank" rel="noreferrer" className="bg-gray-100 hover:bg-[#4CAF50] hover:text-white p-3 rounded-xl transition-all">
                              👁️
                            </a>
                            <button onClick={() => handleDeleteBook(lib.id)} className="bg-gray-100 hover:bg-red-500 hover:text-white p-3 rounded-xl transition-all">
                              🗑️
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'mensajes' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="lg:col-span-1 shadow-xl border-none">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-6 rounded-t-3xl">
                  <h2 className="text-xl font-black">📩 Enviar Nuevo Mensaje</h2>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleSendMessage} className="space-y-6">
                    <div>
                      <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wider">Enviar a:</label>
                      <div className="flex gap-2 mb-4">
                        <button 
                          type="button"
                          onClick={() => { setMsgTargetType('class'); setMsgTargetId(''); }}
                          className={`flex-1 py-2 rounded-xl font-bold transition-all ${msgTargetType === 'class' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-500'}`}
                        >
                          🏫 Clase
                        </button>
                        <button 
                          type="button"
                          onClick={() => { setMsgTargetType('student'); setMsgTargetId(''); }}
                          className={`flex-1 py-2 rounded-xl font-bold transition-all ${msgTargetType === 'student' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-500'}`}
                        >
                          👤 Estudiante
                        </button>
                      </div>

                      {msgTargetType === 'class' ? (
                        <select 
                          value={msgTargetId}
                          onChange={(e) => setMsgTargetId(e.target.value)}
                          className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-bold text-[#2A5C82]"
                        >
                          <option value="">Selecciona una clase...</option>
                          {clases.map(c => <option key={c.id} value={c.codigo}>{c.nombre}</option>)}
                        </select>
                      ) : (
                        <select 
                          value={msgTargetId}
                          onChange={(e) => setMsgTargetId(e.target.value)}
                          className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-bold text-[#2A5C82]"
                        >
                          <option value="">Selecciona un estudiante...</option>
                          {estudiantes.map(e => <option key={e.id} value={e.id}>{e.full_name}</option>)}
                        </select>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wider">Mensaje</label>
                      <textarea 
                        required
                        value={msgContent}
                        onChange={(e) => setMsgContent(e.target.value)}
                        className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-blue-600 outline-none min-h-[150px]"
                        placeholder="Escribe tu mensaje aquí..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wider">Adjuntar (Imagen o PDF)</label>
                      <input 
                        type="file" 
                        accept="image/*,application/pdf"
                        onChange={(e) => setMsgFile(e.target.files?.[0] || null)}
                        className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl cursor-pointer"
                      />
                    </div>

                    <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-xl rounded-2xl shadow-lg transition-transform hover:-translate-y-1">
                      {loading ? 'Enviando...' : '🚀 Enviar Mensaje'}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2 shadow-xl border-none">
                <CardHeader className="bg-gray-50 border-b border-gray-100 p-6">
                  <h2 className="text-xl font-black text-gray-800">📋 Mensajes Recientes</h2>
                </CardHeader>
                <CardContent className="p-6">
                  {mensajesEnviados.length === 0 ? (
                    <div className="text-center py-20 text-gray-300">
                      <span className="text-8xl block mb-6">📭</span>
                      <p className="text-lg font-bold">Aún no has enviado mensajes.</p>
                    </div>
                  ) : (
                    <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
                      {mensajesEnviados.map(msg => (
                        <div key={msg.id} className="p-6 border-2 border-gray-50 rounded-3xl bg-white shadow-sm hover:border-blue-200 transition-all">
                          <div className="flex justify-between items-start mb-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ${msg.target_type === 'class' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                              {msg.target_type === 'class' ? `🏫 Clase: ${msg.target_id}` : `👤 Privado`}
                            </span>
                            <div className="flex gap-2">
                              <span className="text-xs text-gray-400 font-bold">{new Date(msg.created_at).toLocaleString()}</span>
                              <button onClick={() => handleDeleteMessage(msg.id)} className="text-red-400 hover:text-red-600 transition-colors">🗑️</button>
                            </div>
                          </div>
                          <p className="text-gray-800 font-medium whitespace-pre-wrap mb-4">{msg.content}</p>
                          
                          {/* INTERACCIONES EN PANEL DOCENTE */}
                          <div className="flex items-center gap-4 mb-4">
                            <span className="flex items-center gap-1 text-yellow-600 font-bold bg-yellow-50 px-2 py-1 rounded-lg text-xs">
                              ⭐ {msg.message_stars?.length || 0}
                            </span>
                            <span className="flex items-center gap-1 text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded-lg text-xs">
                              💬 {msg.message_comments?.length || 0}
                            </span>
                          </div>

                          {msg.message_comments?.length > 0 && (
                            <div className="bg-gray-50 rounded-xl p-3 space-y-2 mb-4">
                              {msg.message_comments.map((c: any) => (
                                <div key={c.id} className="text-xs">
                                  <span className="font-black text-[#2A5C82]">{c.user_name}: </span>
                                  <span className="text-gray-600">{c.content}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {msg.media_url && (
                            <div className="mt-4 rounded-2xl overflow-hidden border border-gray-100">
                              {msg.media_type === 'image' ? (
                                <img src={msg.media_url} className="w-full max-h-64 object-cover" />
                              ) : (
                                <a href={msg.media_url} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 transition-all">
                                  <span className="text-2xl">📄</span>
                                  <span className="font-bold text-blue-600">Ver PDF Adjunto</span>
                                </a>
                              )}
                            </div>
                          )}
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
