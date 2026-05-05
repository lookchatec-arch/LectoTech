"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SabiasQue } from '@/components/SabiasQue';
import { supabase } from '@/lib/supabaseClient';

// --- Subcomponentes de Vistas ---

const PerfilView = ({ estudianteInfo, handleAvatarUpload, loading }: any) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8">
      <div className="relative group">
        <div className="w-32 h-32 bg-gradient-to-tr from-blue-400 to-green-400 rounded-full flex items-center justify-center text-6xl shadow-inner border-4 border-white overflow-hidden">
          {estudianteInfo.foto ? <img src={estudianteInfo.foto} className="w-full h-full object-cover" /> : '👦'}
        </div>
        <label className="absolute bottom-0 right-0 bg-[#FF8C00] p-2 rounded-full cursor-pointer shadow-lg hover:scale-110 transition-transform">
          <span>{loading ? '⌛' : '📷'}</span>
          <input type="file" className="hidden" accept="image/*" onChange={handleAvatarUpload} disabled={loading} />
        </label>
      </div>
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-3xl font-bold text-[#2A5C82] mb-2">{estudianteInfo.nombre}</h2>
        <p className="text-lg text-gray-600 mb-4">Aventurero de {estudianteInfo.grado}to Básica</p>
        <div className="flex gap-4 justify-center md:justify-start">
          <span className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-bold">Nivel 5</span>
          <span className="bg-yellow-100 text-yellow-800 px-4 py-1 rounded-full text-sm font-bold">120 🌟</span>
        </div>
      </div>
    </div>
    <SabiasQue />
  </div>
);

const RetosView = ({ estudianteInfo, router }: any) => {
  const niveles = [
    { id: 1, tipo: 'lectura', titulo: 'El Misterio del Volcán', icono: '🌋', color: 'bg-[#FFD700]', ruta: `/lectura/el-misterio?grado=${estudianteInfo.grado}`, completado: true },
    { id: 2, tipo: 'juego', titulo: 'Adivina la Palabra', icono: '🤔', color: 'bg-[#FF8C00]', ruta: `/juegos/adivina?grado=${estudianteInfo.grado}`, completado: true },
    { id: 3, tipo: 'lectura', titulo: 'El Bosque Encantado', icono: '🌲', color: 'bg-[#4CAF50]', ruta: `/biblioteca`, completado: true, actual: false },
    { id: 4, tipo: 'juego', titulo: 'Cazador de Verbos', icono: '🏃‍♂️', color: 'bg-[#2A5C82]', ruta: `/juegos/verbos?grado=${estudianteInfo.grado}`, completado: false, bloqueado: false },
    { id: 5, tipo: 'juego', titulo: 'Sopa de Letras', icono: '🔍', color: 'bg-[#E91E63]', ruta: `/juegos/sopa?grado=${estudianteInfo.grado}`, completado: false, bloqueado: false, actual: true },
    { id: 6, tipo: 'juego', titulo: 'Parejas de Sinónimos', icono: '🃏', color: 'bg-[#9C27B0]', ruta: `/juegos/parejas?grado=${estudianteInfo.grado}`, completado: false, bloqueado: false },
    { id: 7, tipo: 'taller', titulo: 'Taller de Escritura', icono: '✍️', color: 'bg-[#FF5722]', ruta: `/taller`, completado: false, bloqueado: false },
  ];

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-[#2A5C82] mb-8 text-center">Tu Mapa de Retos</h2>
      <div className="relative flex flex-col items-center gap-8 py-8">
        <div className="absolute top-0 bottom-0 w-4 bg-gray-200 rounded-full z-0" style={{ left: 'calc(50% - 8px)' }}></div>
        <div className="absolute top-0 w-4 bg-[#FFD700] rounded-full z-0 transition-all duration-1000" style={{ left: 'calc(50% - 8px)', height: '40%' }}></div>

        {niveles.map((nivel, index) => {
          const offset = index % 2 === 0 ? '-translate-x-12' : 'translate-x-12';
          return (
            <div key={nivel.id} className={`relative z-10 flex flex-col items-center ${offset} transition-transform hover:scale-105 group`}>
              <div className="absolute -top-12 bg-gray-900 px-4 py-2 rounded-xl shadow-lg border-none whitespace-nowrap text-sm font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                {nivel.titulo} {nivel.bloqueado && " 🔒"}
              </div>
              <button 
                onClick={() => !nivel.bloqueado && router.push(nivel.ruta)}
                className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-3xl md:text-4xl shadow-xl border-b-8 active:border-b-0 active:translate-y-2 transition-all
                  ${nivel.color} 
                  ${nivel.bloqueado ? 'border-gray-400 bg-gray-200 grayscale contrast-125 cursor-not-allowed' : 
                    nivel.completado ? 'border-yellow-600' : 'border-green-700 ring-4 ring-green-300 animate-pulse'}
                `}
              >
                {nivel.icono}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const JuegosView = ({ estudianteInfo, router }: any) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
    <h2 className="text-2xl font-bold text-[#2A5C82]">Juegos y Actividades</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { titulo: 'Cazador de Verbos', icono: '🏃‍♂️', bg: 'bg-[#2A5C82]', ruta: `/juegos/verbos?grado=${estudianteInfo.grado}` },
        { titulo: 'Sopa de Letras', icono: '🔍', bg: 'bg-[#E91E63]', ruta: `/juegos/sopa?grado=${estudianteInfo.grado}` },
        { titulo: 'Parejas de Sinónimos', icono: '🃏', bg: 'bg-[#9C27B0]', ruta: `/juegos/parejas?grado=${estudianteInfo.grado}` },
        { titulo: 'Adivina la Palabra', icono: '🤔', bg: 'bg-[#FF8C00]', ruta: `/juegos/adivina?grado=${estudianteInfo.grado}` },
      ].map((juego, i) => (
        <div key={i} onClick={() => router.push(juego.ruta)} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer flex flex-col items-center text-center gap-4 group">
          <div className={`w-20 h-20 rounded-2xl ${juego.bg} text-white flex items-center justify-center text-4xl shadow-md group-hover:scale-110 transition-transform`}>
            {juego.icono}
          </div>
          <h3 className="font-bold text-gray-800 text-lg">{juego.titulo}</h3>
        </div>
      ))}
    </div>
  </div>
);

const BibliotecaView = ({ libros, setSelectedBook }: any) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center">
      <div className="text-6xl mb-4">📚</div>
      <h2 className="text-3xl font-bold text-[#2A5C82] mb-2">Tu Biblioteca Personal</h2>
      <p className="text-gray-600 mb-8">Aquí aparecerán los libros que tus profesores te asignen.</p>
      
      {libros.length === 0 ? (
        <div className="p-12 border-2 border-dashed border-gray-200 rounded-2xl">
          <p className="text-gray-400 font-medium">Aún no tienes libros asignados. ¡Sigue esforzándote!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {libros.map((libro: any) => (
            <div key={libro.id} className="bg-gradient-to-br from-green-50 to-white p-6 rounded-2xl border border-green-100 shadow-sm hover:shadow-md transition-all">
              <h3 className="font-bold text-[#2A5C82] text-xl mb-4">{libro.title}</h3>
              <button 
                onClick={() => setSelectedBook(libro)}
                className="w-full bg-[#4CAF50] text-white py-3 rounded-xl font-bold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
              >
                📖 Empezar a Leer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

const GuiaView = () => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
    <h2 className="text-2xl font-bold text-[#2A5C82]">Guía de la Plataforma</h2>
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-4">¿Cómo funciona LectoTech?</h3>
      <p className="text-gray-600">Completa retos para ganar estrellas y desbloquear nuevos niveles. Tu profesor puede asignarte libros especiales en la sección de Biblioteca.</p>
    </div>
  </div>
);

const QuienesSomosView = () => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-gradient-to-br from-[#2A5C82] to-[#1a3a53] text-white rounded-3xl p-8 shadow-xl text-center">
    <h2 className="text-3xl font-bold text-[#FFD700] mb-4">¿Quiénes Somos?</h2>
    <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
      En LectoTech, transformamos la lectura en una aventura épica usando neuroeducación y tecnología.
    </p>
  </div>
);

const MuroView = ({ mensajes, onStar, onComment, currentUserId }: { mensajes: any[], onStar: (id: string) => void, onComment: (id: string, content: string) => void, currentUserId: string }) => {
  const [commentInputs, setCommentInputs] = useState<{[key: string]: string}>({});

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#2A5C82]">📢 Muro de la Clase</h2>
        <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">Avisos del Profesor</span>
      </div>

      {mensajes.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100 text-center">
          <div className="text-6xl mb-6">📭</div>
          <p className="text-gray-400 font-bold text-lg">No hay mensajes nuevos en el muro por ahora.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {mensajes.map((msg) => {
            const hasStarred = msg.message_stars?.some((s: any) => s.user_id === currentUserId);
            return (
              <div key={msg.id} className={`p-6 md:p-8 rounded-3xl shadow-sm border-2 transition-all ${msg.target_type === 'student' ? 'bg-purple-50 border-purple-100' : 'bg-white border-gray-50'}`}>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#2A5C82] rounded-xl flex items-center justify-center text-xl">👨‍🏫</div>
                    <div>
                      <p className="font-black text-[#2A5C82]">Mensaje del Profesor</p>
                      <p className="text-xs text-gray-400 font-bold">{new Date(msg.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  {msg.target_type === 'student' && (
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Privado para ti</span>
                  )}
                </div>
                
                <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                
                {msg.media_url && (
                  <div className="mt-6 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                    {msg.media_type === 'image' ? (
                      <img src={msg.media_url} alt="Adjunto" className="w-full max-h-96 object-cover" />
                    ) : (
                      <a href={msg.media_url} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-5 bg-gray-50 hover:bg-blue-50 transition-all group">
                        <span className="text-3xl">📄</span>
                        <div className="text-left">
                          <p className="font-black text-[#2A5C82] group-hover:underline">Ver PDF Adjunto</p>
                          <p className="text-xs text-gray-400 font-bold tracking-widest uppercase">Haz clic para abrir</p>
                        </div>
                      </a>
                    )}
                  </div>
                )}

                {/* INTERACCIONES */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col gap-6">
                  <div className="flex items-center gap-6">
                    <button 
                      onClick={() => onStar(msg.id)}
                      className={`flex items-center gap-2 font-bold transition-all px-4 py-2 rounded-full ${hasStarred ? 'bg-yellow-100 text-yellow-600 scale-110' : 'bg-gray-50 text-gray-400 hover:bg-yellow-50'}`}
                    >
                      <span className="text-xl">⭐</span>
                      <span>{msg.message_stars?.length || 0}</span>
                    </button>
                    <div className="flex items-center gap-2 text-gray-400 font-bold">
                      <span className="text-xl">💬</span>
                      <span>{msg.message_comments?.length || 0} comentarios</span>
                    </div>
                  </div>

                  {/* LISTA DE COMENTARIOS */}
                  <div className="space-y-3">
                    {msg.message_comments?.map((comment: any) => (
                      <div key={comment.id} className="bg-gray-50 p-4 rounded-2xl">
                        <p className="text-xs font-black text-[#2A5C82] mb-1">{comment.user_name}</p>
                        <p className="text-gray-700 text-sm">{comment.content}</p>
                      </div>
                    ))}
                  </div>

                  {/* INPUT DE COMENTARIO */}
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      value={commentInputs[msg.id] || ''}
                      onChange={(e) => setCommentInputs({...commentInputs, [msg.id]: e.target.value})}
                      placeholder="Escribe un comentario..."
                      className="flex-1 bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                    />
                    <button 
                      onClick={() => {
                        onComment(msg.id, commentInputs[msg.id]);
                        setCommentInputs({...commentInputs, [msg.id]: ''});
                      }}
                      className="bg-[#2A5C82] text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors"
                    >
                      Enviar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// --- Componente Principal ---

export default function DashboardPage() {
  const router = useRouter();
  const [estudianteInfo, setEstudianteInfo] = useState({ id: '', nombre: 'Explorador', grado: '5', foto: '', email: '' });
  const [activeTab, setActiveTab] = useState('perfil');
  const [libros, setLibros] = useState([]);
  const [mensajes, setMensajes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      const info = {
        id: user.id,
        nombre: profile?.full_name || user.user_metadata?.full_name || 'Estudiante',
        grado: user.user_metadata?.grado || '5',
        foto: profile?.avatar_url || '',
        email: user.email || '',
        clase: profile?.clase || user.user_metadata?.clase || ''
      };
      setEstudianteInfo(info);
      fetchLibros(info.clase);
      fetchMensajes(user.id, info.clase);
    }
  };

  const fetchLibros = async (claseCode: string | undefined) => {
    if (!claseCode) return;
    const { data } = await supabase
      .from('library_books')
      .select('*')
      .eq('class_code', claseCode);
    if (data) setLibros(data as any);
  };

  const fetchMensajes = async (userId: string, claseCode: string) => {
    const { data } = await supabase
      .from('messages')
      .select(`
        *,
        message_stars(user_id),
        message_comments(*)
      `)
      .or(`and(target_type.eq.class,target_id.eq.${claseCode}),and(target_type.eq.student,target_id.eq.${userId})`)
      .order('created_at', { ascending: false });
    if (data) setMensajes(data as any);
  };

  const handleAddStar = async (msgId: string) => {
    const hasStarred = mensajes.find((m: any) => m.id === msgId)?.message_stars?.some((s: any) => s.user_id === estudianteInfo.id);
    
    if (hasStarred) {
      await supabase.from('message_stars').delete().match({ message_id: msgId, user_id: estudianteInfo.id });
    } else {
      await supabase.from('message_stars').insert({ message_id: msgId, user_id: estudianteInfo.id });
    }
    fetchMensajes(estudianteInfo.id, (estudianteInfo as any).clase);
  };

  const handleAddComment = async (msgId: string, content: string) => {
    if (!content.trim()) return;
    const { error } = await supabase.from('message_comments').insert({
      message_id: msgId,
      user_id: estudianteInfo.id,
      user_name: estudianteInfo.nombre,
      content: content
    });
    if (!error) fetchMensajes(estudianteInfo.id, (estudianteInfo as any).clase);
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const filePath = `avatars/${estudianteInfo.id}-${Date.now()}`;
      
      setLoading(true);
      const { error: uploadError } = await supabase.storage.from('avatares').upload(filePath, file);

      if (!uploadError) {
        const { data: { publicUrl } } = supabase.storage.from('avatares').getPublicUrl(filePath);
        await supabase.from('profiles').upsert({ id: estudianteInfo.id, avatar_url: publicUrl, role: 'estudiante' });
        setEstudianteInfo({ ...estudianteInfo, foto: publicUrl });
      }
      setLoading(false);
    }
  };

  const SidebarButton = ({ id, icon, label }: { id: string, icon: string, label: string }) => {
    const isActive = activeTab === id;
    return (
      <button
        onClick={() => setActiveTab(id)}
        className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 w-full text-left font-bold ${
          isActive ? 'bg-white text-[#2A5C82] shadow-md scale-105' : 'text-blue-100 hover:bg-white/10 hover:text-white'
        }`}
      >
        <span className="text-2xl">{icon}</span>
        <span className="hidden md:block truncate">{label}</span>
      </button>
    );
  };

  return (
    <div className="flex h-screen bg-[#F0F4F8] overflow-hidden">
      <aside className="w-20 md:w-72 bg-[#2A5C82] flex flex-col p-4 shadow-2xl z-20 flex-shrink-0">
        <h2 className="text-2xl font-bold mb-8 text-center hidden md:block text-white">Lecto<span className="text-[#FFD700]">Tech</span></h2>
        <nav className="flex flex-col gap-2 flex-grow overflow-y-auto">
          <SidebarButton id="perfil" icon="👤" label="Mi Perfil" />
          <SidebarButton id="muro" icon="📢" label="Muro Clase" />
          <SidebarButton id="retos" icon="🏆" label="Retos" />
          <SidebarButton id="juegos" icon="🎮" label="Juegos" />
          <SidebarButton id="biblioteca" icon="📚" label="Mi Biblioteca" />
          <div className="mt-auto pt-8 border-t border-blue-400/30 space-y-2">
            <SidebarButton id="guia" icon="🗺️" label="Guía" />
            <SidebarButton id="quienes-somos" icon="ℹ️" label="Nosotros" />
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                router.push('/');
              }}
              className="flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 w-full text-left font-bold text-red-200 hover:bg-red-500/20 hover:text-red-100"
            >
              <span className="text-2xl">🚪</span>
              <span className="hidden md:block">Cerrar Sesión</span>
            </button>
          </div>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col h-full relative overflow-y-auto">
        <div className="sticky top-0 z-10 bg-[#F0F4F8]/80 backdrop-blur-md p-4 md:p-8 pb-4">
          <header className="flex justify-between items-center bg-white p-4 px-6 rounded-2xl shadow-sm border border-gray-100">
            <h1 className="text-xl md:text-2xl font-bold text-[#2A5C82]">¡Hola, {estudianteInfo.nombre}!</h1>
            <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-xl border border-yellow-100">
              <span className="text-2xl animate-pulse">🌟</span>
              <span className="font-bold text-[#FFD700] text-xl">120</span>
            </div>
          </header>
        </div>

        <div className="px-4 md:px-8 pb-12 pt-4 flex-1">
          {activeTab === 'perfil' && <PerfilView estudianteInfo={estudianteInfo} handleAvatarUpload={handleAvatarUpload} loading={loading} />}
          {activeTab === 'muro' && <MuroView mensajes={mensajes} onStar={handleAddStar} onComment={handleAddComment} currentUserId={estudianteInfo.id} />}
          {activeTab === 'retos' && <RetosView estudianteInfo={estudianteInfo} router={router} />}
          {activeTab === 'juegos' && <JuegosView estudianteInfo={estudianteInfo} router={router} />}
          {activeTab === 'biblioteca' && <BibliotecaView libros={libros} setSelectedBook={setSelectedBook} />}
          {activeTab === 'guia' && <GuiaView />}
          {activeTab === 'quienes-somos' && <QuienesSomosView />}
        </div>
      </main>

      {/* Visor de PDF Modal */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[90vh]">
            <div className="p-4 bg-[#2A5C82] text-white flex justify-between items-center">
              <h2 className="font-bold truncate pr-4">{selectedBook.title}</h2>
              <button onClick={() => setSelectedBook(null)} className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-lg font-bold">Cerrar</button>
            </div>
            <div className="flex-1 bg-gray-100">
              <iframe src={selectedBook.pdf_url} className="w-full h-full border-none" title="Visor PDF" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
