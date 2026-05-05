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
    { id: 1, tipo: 'lectura', titulo: 'El Misterio del Volcán', icono: '🌋', color: 'from-orange-400 to-red-500', ruta: `/lectura/el-misterio?grado=${estudianteInfo.grado}` },
    { id: 2, tipo: 'juego', titulo: 'Adivina la Palabra', icono: '🤔', color: 'from-yellow-400 to-orange-500', ruta: `/juegos/adivina?grado=${estudianteInfo.grado}` },
    { id: 3, tipo: 'lectura', titulo: 'El Bosque Encantado', icono: '🌲', color: 'from-green-400 to-emerald-600', ruta: `/biblioteca` },
    { id: 4, tipo: 'juego', titulo: 'Cazador de Verbos', icono: '🏃‍♂️', color: 'from-blue-400 to-indigo-600', ruta: `/juegos/verbos?grado=${estudianteInfo.grado}` },
    { id: 5, tipo: 'juego', titulo: 'Sopa de Letras', icono: '🔍', color: 'from-pink-400 to-rose-600', ruta: `/juegos/sopa?grado=${estudianteInfo.grado}` },
    { id: 6, tipo: 'juego', titulo: 'Parejas de Sinónimos', icono: '🃏', color: 'from-purple-400 to-fuchsia-600', ruta: `/juegos/parejas?grado=${estudianteInfo.grado}` },
    { id: 7, tipo: 'taller', titulo: 'Taller de Escritura', icono: '✍️', color: 'from-cyan-400 to-blue-500', ruta: `/taller` },
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white rounded-[3rem] p-4 md:p-12 shadow-xl border-4 border-white animate-in fade-in zoom-in duration-700 relative overflow-hidden min-h-[800px]">
      {/* Fondo Decorativo */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl">☁️</div>
        <div className="absolute top-40 right-20 text-6xl">☁️</div>
        <div className="absolute bottom-20 left-1/4 text-6xl text-green-200">🌳</div>
        <div className="absolute top-1/2 right-1/4 text-6xl text-yellow-100">☀️</div>
      </div>

      <div className="relative z-10">
        <h2 className="text-4xl font-black text-[#2A5C82] mb-16 text-center tracking-tight">🗺️ ¡Elige tu Próximo Reto!</h2>
        
        <div className="relative flex flex-col items-center gap-24 py-12">
          {/* Línea de Camino Dinámica */}
          <svg className="absolute top-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 1000 1200" preserveAspectRatio="none">
             <path 
               d="M 500 0 C 800 150, 200 150, 500 300 C 800 450, 200 450, 500 600 C 800 750, 200 750, 500 900 C 800 1050, 200 1050, 500 1200" 
               fill="none" 
               stroke="#FFD700" 
               strokeWidth="15" 
               strokeLinecap="round" 
               strokeDasharray="25 25"
               className="animate-[dash_30s_linear_infinite] opacity-60"
             />
          </svg>

          {niveles.map((nivel, index) => {
            // Alternar posiciones: Izquierda, Centro, Derecha, Centro...
            const positions = [
              'md:-translate-x-[250px]', // Izquierda
              'md:translate-x-[0px]',    // Centro
              'md:translate-x-[250px]',  // Derecha
              'md:translate-x-[0px]'     // Centro
            ];
            const xOffset = positions[index % positions.length];
            
            return (
              <div key={nivel.id} className={`relative flex flex-col items-center ${xOffset} transition-all duration-700`}>
                <div className="absolute -top-14 bg-white px-4 py-2 rounded-2xl shadow-lg border-2 border-yellow-100 whitespace-nowrap text-sm font-black text-[#2A5C82] opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none scale-0 group-hover:scale-100 transform origin-bottom">
                  {nivel.titulo}
                </div>
                
                <button 
                  onClick={() => router.push(nivel.ruta)}
                  className={`group relative w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] bg-gradient-to-br ${nivel.color} p-1 shadow-[0_15px_0_0_rgba(0,0,0,0.1)] active:shadow-none active:translate-y-2 transition-all duration-200 flex items-center justify-center hover:scale-110 active:scale-95`}
                >
                  <div className="w-full h-full bg-white/20 rounded-[2rem] flex items-center justify-center text-4xl md:text-5xl backdrop-blur-sm border-2 border-white/50">
                    <span className="group-hover:animate-bounce drop-shadow-lg">{nivel.icono}</span>
                  </div>
                  
                  {/* Destello de animación */}
                  <div className="absolute -inset-1 bg-white/40 rounded-[2.5rem] blur opacity-0 group-hover:opacity-100 transition-opacity animate-pulse"></div>
                  
                  {/* Etiqueta de Título siempre visible en móvil */}
                  <div className="absolute top-full mt-4 bg-[#2A5C82] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-md whitespace-nowrap">
                    {nivel.titulo}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes dash {
          to { stroke-dashoffset: -1000; }
        }
      `}</style>
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

const GuiaView = () => {
  const pasos = [
    { titulo: '🎨 Tu Avatar', desc: '¡Ponle tu estilo! Sube una foto en "Mi Perfil" para que todos te reconozcan.', icon: '📸', color: 'bg-orange-100 text-orange-600' },
    { titulo: '📢 El Muro', desc: 'Aquí el profesor publica noticias para toda la clase. ¡No te pierdas de nada!', icon: '🗣️', color: 'bg-blue-100 text-blue-600' },
    { titulo: '✉️ Mensajes', desc: '¿Recibiste un mensaje privado? Aquí verás lecturas especiales y videos solo para ti.', icon: '📬', color: 'bg-purple-100 text-purple-600' },
    { titulo: '🏆 Los Retos', desc: 'Supera niveles, gana estrellas y desbloquea juegos secretos.', icon: '🌟', color: 'bg-yellow-100 text-yellow-600' },
    { titulo: '📚 La Biblioteca', desc: '¡Tu rincón de lectura! Aquí están los libros PDF que tu profe te asigna.', icon: '📖', color: 'bg-green-100 text-green-600' },
    { titulo: '📦 Archivados', desc: '¿Mensajes viejos? Dale a "Ocultar" para limpiar tu muro y guárdalos en el baúl.', icon: '🗃️', color: 'bg-gray-100 text-gray-600' },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-10 pb-12">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-black text-[#2A5C82] tracking-tight">🗺️ Guía del Explorador</h2>
        <p className="text-gray-500 font-bold">Aprende a dominar el mundo de LectoTech en segundos</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pasos.map((p, i) => (
          <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border-2 border-gray-50 hover:border-[#4CAF50] transition-all hover:shadow-xl group">
            <div className={`w-16 h-16 ${p.color} rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner group-hover:scale-110 transition-transform`}>
              {p.icon}
            </div>
            <h3 className="text-xl font-black text-gray-800 mb-3">{p.titulo}</h3>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">{p.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="text-6xl animate-pulse">💡</div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black">¿Sabías que...?</h3>
          <p className="text-blue-100 max-w-xl">
            Cada vez que el profesor te envía un PDF por mensaje, puedes abrirlo en el <strong>Visor Interactivo</strong> para leerlo como si fuera un libro real. ¡Busca el botón con el libro! 📖
          </p>
        </div>
      </div>
    </div>
  );
};

const QuienesSomosView = () => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8 pb-12">
    {/* Encabezado Principal */}
    <div className="bg-gradient-to-br from-[#2A5C82] to-[#1A3A52] text-white rounded-3xl p-10 shadow-2xl text-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-400/20 rounded-full -ml-12 -mb-12 blur-xl"></div>
      
      <span className="text-6xl mb-4 block animate-bounce">🚀</span>
      <h2 className="text-4xl font-black text-[#FFD700] mb-4 tracking-tight">¡Bienvenidos a la Aventura LectoTech!</h2>
      <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed font-medium">
        Donde la tecnología y la imaginación se unen para crear a los mejores lectores del mundo.
      </p>
    </div>

    {/* Sección del Proyecto Científico */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-4">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl shadow-inner">🎓</div>
        <h3 className="text-2xl font-black text-[#2A5C82]">Nuestro Origen</h3>
        <p className="text-gray-600 leading-relaxed">
          Este proyecto nace de una investigación científica en la Universidad de Guayaquil, diseñada específicamente para estudiantes de 5to, 6to y 7mo de básica.
          <br/><br/>
          Nuestro objetivo es demostrar que con las herramientas digitales correctas, ¡aprender a leer y escribir es un juego de niños!
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-4">
        <div className="w-16 h-16 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center text-3xl shadow-inner">💡</div>
        <h3 className="text-2xl font-black text-[#2A5C82]">¿Por qué LectoTech?</h3>
        <p className="text-gray-600 leading-relaxed">
          Descubrimos que cuando usas tablets y computadoras, tu motivación vuela por los cielos. 🚀
          <br/><br/>
          Aunque a veces es difícil conseguir estos equipos, sabemos que cuando los tienes, ¡tu rendimiento en lectura y redacción mejora muchísimo!
        </p>
      </div>
    </div>

    {/* Las Creadoras */}
    <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
      <h3 className="text-2xl font-black text-[#2A5C82] mb-8 text-center flex items-center justify-center gap-3">
        <span className="text-3xl">👩‍🔬</span> Las Mentes Detrás del Proyecto
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        <div className="flex flex-col items-center text-center p-6 bg-blue-50/50 rounded-2xl border-2 border-dashed border-blue-100">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-4xl mb-4 shadow-md">👤</div>
          <p className="text-xl font-black text-[#2A5C82]">Lcda. Karelis Hernández Jiménez</p>
          <p className="text-sm text-gray-500 font-bold uppercase tracking-widest mt-1">Universidad de Guayaquil</p>
          <p className="text-xs text-blue-600 mt-2 font-medium">Karelis.hernandezj@ug.edu.ec</p>
        </div>
        <div className="flex flex-col items-center text-center p-6 bg-green-50/50 rounded-2xl border-2 border-dashed border-green-100">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-4xl mb-4 shadow-md">👤</div>
          <p className="text-xl font-black text-[#2A5C82]">Lcda. Jessica Silva Mero</p>
          <p className="text-sm text-gray-500 font-bold uppercase tracking-widest mt-1">Universidad de Guayaquil</p>
          <p className="text-xs text-green-600 mt-2 font-medium">Silvajess.2808@gmail.com</p>
        </div>
      </div>
    </div>

    {/* Footer de la Sección */}
    <div className="text-center p-8 bg-yellow-400 rounded-3xl shadow-xl">
      <p className="text-white font-black text-lg">
        "La tecnología potencia tu motivación y producción escrita. ¡Sigamos explorando juntos!" ✨
      </p>
    </div>
  </div>
);

const MuroView = ({ mensajes, onStar, onComment, onArchive, currentUserId, setSelectedBook }: { mensajes: any[], onStar: (id: string) => void, onComment: (id: string, content: string) => void, onArchive: (id: string) => void, currentUserId: string, setSelectedBook: any }) => {
  const [showArchived, setShowArchived] = useState(false);
  const [commentInputs, setCommentInputs] = useState<{[key: string]: string}>({});

  const mensajesFiltrados = mensajes.filter((m: any) => m.target_type === 'class');

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#2A5C82]">📢 Muro de la Clase</h2>
        <button 
          onClick={() => setShowArchived(!showArchived)}
          className="text-xs font-black uppercase text-gray-400 hover:text-[#2A5C82] transition-colors"
        >
          {showArchived ? '📁 Ver Recientes' : '📦 Ver Archivados'}
        </button>
      </div>

      {mensajesFiltrados.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100 text-center">
          <p className="text-gray-400 font-bold">No hay mensajes de la clase.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {mensajesFiltrados.map((msg: any) => (
             <MensajeCard 
               key={msg.id} msg={msg} onStar={onStar} onComment={onComment} 
               onArchive={onArchive} currentUserId={currentUserId} setSelectedBook={setSelectedBook}
             />
          ))}
        </div>
      )}
    </div>
  );
};

const MensajesView = ({ mensajes, onStar, onComment, onArchive, currentUserId, setSelectedBook }: any) => {
  const mensajesPrivados = mensajes.filter((m: any) => m.target_type === 'student');

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <h2 className="text-2xl font-bold text-[#2A5C82]">✉️ Mis Mensajes Privados</h2>
      {mensajesPrivados.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100 text-center">
          <p className="text-gray-400 font-bold">No tienes mensajes directos del profesor.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {mensajesPrivados.map((msg: any) => (
             <MensajeCard 
               key={msg.id} msg={msg} onStar={onStar} onComment={onComment} 
               onArchive={onArchive} currentUserId={currentUserId} setSelectedBook={setSelectedBook}
             />
          ))}
        </div>
      )}
    </div>
  );
};

const MensajeCard = ({ msg, onStar, onComment, onArchive, currentUserId, setSelectedBook }: any) => {
  const [commentInput, setCommentInput] = useState('');
  const hasStarred = msg.message_stars?.some((s: any) => s.user_id === currentUserId);

  return (
    <div className={`p-6 md:p-8 rounded-3xl shadow-sm border-2 transition-all ${msg.target_type === 'student' ? 'bg-purple-50 border-purple-100' : 'bg-white border-gray-100'}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#2A5C82] rounded-xl flex items-center justify-center text-xl">👨‍🏫</div>
          <div>
            <p className="font-black text-[#2A5C82]">Mensaje del Profesor</p>
            <p className="text-xs text-gray-400 font-bold">{new Date(msg.created_at).toLocaleString()}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {msg.target_type === 'student' && (
            <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Privado</span>
          )}
          <button 
            onClick={() => onArchive(msg.id)}
            className="bg-gray-100 hover:bg-orange-50 text-gray-400 hover:text-orange-600 px-3 py-1 rounded-full text-[10px] font-black uppercase transition-all"
          >
            Ocultar
          </button>
        </div>
      </div>
      
      <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap">{msg.content}</p>
      
      {msg.youtube_url && (
        <div className="mt-6 rounded-2xl overflow-hidden shadow-xl aspect-video border-4 border-white">
          <iframe 
            src={`https://www.youtube.com/embed/${msg.youtube_url.split('v=')[1]?.split('&')[0] || msg.youtube_url.split('/').pop()}`}
            className="w-full h-full"
            allowFullScreen
          />
        </div>
      )}

      {msg.media_url && (
        <div className="mt-6 rounded-2xl overflow-hidden border border-gray-100 shadow-sm group">
          {msg.media_type === 'image' ? (
            <img src={msg.media_url} alt="Adjunto" className="w-full max-h-96 object-cover" />
          ) : (
            <button 
              onClick={() => setSelectedBook({
                title: 'Lectura del Profesor',
                pdf_url: msg.media_url
              })}
              className="w-full flex items-center justify-between p-5 bg-blue-50 hover:bg-blue-100 transition-all group"
            >
              <div className="flex items-center gap-4 text-left">
                <span className="text-3xl">📖</span>
                <div>
                  <p className="font-black text-[#2A5C82] group-hover:underline">Abrir Lectura Interactiva</p>
                  <p className="text-xs text-gray-400 font-bold tracking-widest uppercase">Haz clic para leer el libro</p>
                </div>
              </div>
              <span className="bg-white p-2 rounded-xl shadow-sm group-hover:translate-x-1 transition-transform">➡️</span>
            </button>
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
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="Escribe un comentario..."
            className="flex-1 bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
          />
          <button 
            onClick={() => {
              onComment(msg.id, commentInput);
              setCommentInput('');
            }}
            className="bg-[#2A5C82] text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Componente Principal ---

export default function DashboardPage() {
  const router = useRouter();
  const [estudianteInfo, setEstudianteInfo] = useState({ id: '', nombre: 'Explorador', grado: '5', foto: '', email: '' });
  const [activeTab, setActiveTab] = useState('perfil');
  const [libros, setLibros] = useState<any[]>([]);
  const [mensajes, setMensajes] = useState<any[]>([]);
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

      // --- Sincronización automática de Clase ---
      if (!profile?.clase && user.user_metadata?.clase) {
        await supabase
          .from('profiles')
          .update({ clase: user.user_metadata.clase })
          .eq('id', user.id);
        info.clase = user.user_metadata.clase;
      }

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
      .eq('is_archived', false) // NO mostrar archivados
      .or(`and(target_type.eq.class,target_id.eq.${claseCode}),and(target_type.eq.student,target_id.eq.${userId})`)
      .order('created_at', { ascending: false });
    if (data) setMensajes(data as any);
  };

  const handleArchiveMessage = async (msgId: string) => {
    // Para el estudiante, "archivar" es solo ocultar localmente.
    // Como no queremos afectar a toda la clase, lo ideal sería una tabla intermedia,
    // pero por ahora lo ocultaremos de la vista actual.
    setMensajes(prev => prev.filter((m: any) => m.id !== msgId));
    alert("Mensaje ocultado de tu muro.");
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
      <aside className="w-20 md:w-72 bg-[#2A5C82] flex flex-col p-4 shadow-2xl z-[60] flex-shrink-0 overflow-x-hidden">
        {/* Logo de Estudiante */}
        <div className="mb-10 flex flex-col items-center md:items-start px-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-3xl shadow-lg animate-pulse">👦</div>
            <div className="hidden md:block">
              <h2 className="text-xl font-black text-white leading-tight">Lecto<span className="text-[#FFD700]">Tech</span></h2>
              <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">Sistema Estudiante</p>
            </div>
          </div>
        </div>

        <nav className="flex flex-col gap-2 flex-grow overflow-y-auto overflow-x-hidden scrollbar-hide">
          <SidebarButton id="perfil" icon="👤" label="Mi Perfil" />
          <SidebarButton id="muro" icon="📢" label="Muro Clase" />
          <SidebarButton id="mensajes" icon="✉️" label="Mis Mensajes" />
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

      <main className="flex-1 flex flex-col h-full relative overflow-y-auto scroll-smooth">
        {/* Encabezado Fijo con Z-Index Corregido */}
        <div className="sticky top-0 z-50 bg-[#F0F4F8]/95 backdrop-blur-md p-4 md:p-8 pb-4">
          <header className="flex justify-between items-center bg-white p-4 px-6 rounded-2xl shadow-md border border-gray-100">
            <h1 className="text-xl md:text-2xl font-black text-[#2A5C82]">¡Hola, {estudianteInfo.nombre}!</h1>
            <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-xl border border-yellow-100">
              <span className="text-2xl animate-bounce">🌟</span>
              <span className="font-bold text-[#FFD700] text-xl">120</span>
            </div>
          </header>
        </div>

        {/* Contenedor de contenido con padding superior para evitar solapamiento */}
        <div className="px-4 md:px-8 pb-12 pt-6 flex-1 relative z-10">
          {activeTab === 'perfil' && <PerfilView estudianteInfo={estudianteInfo} handleAvatarUpload={handleAvatarUpload} loading={loading} />}
          {activeTab === 'muro' && <MuroView mensajes={mensajes} onStar={handleAddStar} onComment={handleAddComment} onArchive={handleArchiveMessage} currentUserId={estudianteInfo.id} setSelectedBook={setSelectedBook} />}
          {activeTab === 'mensajes' && <MensajesView mensajes={mensajes} onStar={handleAddStar} onComment={handleAddComment} onArchive={handleArchiveMessage} currentUserId={estudianteInfo.id} setSelectedBook={setSelectedBook} />}
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
