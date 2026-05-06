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

const RetosView = ({ currentGrado, currentClase, router }: any) => {
  const isQuinto = currentGrado === '5' || ['QUINTO-CLASE', 'QUINTO-GRADO', '5TO-CLASE'].includes(currentClase);
  const isSexto = currentGrado === '6' || ['SEXTO-CLASE', 'SEXTO-GRADO', '6TO-CLASE'].includes(currentClase);
  const isSeptimo = currentGrado === '7' || ['SEPTIMO-CLASE', '7MO-CLASE'].includes(currentClase);

  const nivelesGeneral = [
    { id: 1, tipo: 'lectura', titulo: 'El Misterio del Volcán', icono: '🌋', color: 'from-orange-400 to-red-500', ruta: `/lectura/el-misterio?grado=${currentGrado}` },
    { id: 2, tipo: 'juego', titulo: 'Adivina la Palabra', icono: '🤔', color: 'from-yellow-400 to-orange-500', ruta: `/juegos/adivina?grado=${currentGrado}` },
    { id: 3, tipo: 'lectura', titulo: 'El Bosque Encantado', icono: '🌲', color: 'from-green-400 to-emerald-600', ruta: `/biblioteca` },
    { id: 4, tipo: 'juego', titulo: 'Cazador de Verbos', icono: '🏃‍♂️', color: 'from-blue-400 to-indigo-600', ruta: `/juegos/verbos?grado=${currentGrado}` },
    { id: 5, tipo: 'juego', titulo: 'Sopa de Letras', icono: '🔍', color: 'from-pink-400 to-rose-600', ruta: `/juegos/sopa?grado=${currentGrado}` },
    { id: 6, tipo: 'juego', titulo: 'Parejas de Sinónimos', icono: '🃏', color: 'from-purple-400 to-fuchsia-600', ruta: `/juegos/parejas?grado=${currentGrado}` },
    { id: 7, tipo: 'taller', titulo: 'Taller de Escritura', icono: '✍️', color: 'from-cyan-400 to-blue-500', ruta: `/taller` },
  ];

  const nivelesQuinto = [
    { id: 1, tipo: 'juego', titulo: 'Nivel 1: Eco de Rondas', icono: '🎶', color: 'from-blue-400 to-blue-600', ruta: `/juegos/rondas` },
    { id: 2, tipo: 'juego', titulo: 'Nivel 2: Arrorró de Nanas', icono: '🧸', color: 'from-purple-400 to-purple-600', ruta: `/juegos/sopa?grado=5&tema=nanas` },
    { id: 3, tipo: 'juego', titulo: 'Nivel 3: El Burro de Algodón', icono: '🐴', color: 'from-gray-400 to-gray-600', ruta: `/juegos/adivina?grado=5` },
    { id: 4, tipo: 'juego', titulo: 'Nivel 4: Mapas del Tesoro', icono: '📸', color: 'from-green-400 to-green-600', ruta: `/juegos/guia` },
    { id: 5, tipo: 'juego', titulo: 'Nivel 5: Rayo de Agudas', icono: '⚡', color: 'from-red-400 to-red-600', ruta: `/juegos/agudas` },
    { id: 6, tipo: 'juego', titulo: 'Nivel 6: Balanza de Graves', icono: '⚖️', color: 'from-indigo-400 to-indigo-600', ruta: `/juegos/graves` },
    { id: 7, tipo: 'juego', titulo: 'Nivel 7: El Muro de Párrafos', icono: '✍️', color: 'from-pink-400 to-pink-600', ruta: `/juegos/parrafo` },
    { id: 8, tipo: 'juego', titulo: 'Nivel 8: Noticiero de Realidad', icono: '📢', color: 'from-cyan-400 to-cyan-600', ruta: `/juegos/referencial` },
    { id: 9, tipo: 'juego', titulo: 'Nivel 9: Viaje por Dialectos', icono: '🇪🇨', color: 'from-yellow-400 to-yellow-600', ruta: `/juegos/dialectos` },
    { id: 10, tipo: 'taller', titulo: 'Nivel 10: Master LectoTech', icono: '🏆', color: 'from-orange-500 to-red-600', ruta: `/taller` },
  ];

  const nivelesSexto = [
    { id: 1, tipo: 'juego', titulo: 'Nivel 1: Sabiduría Popular', icono: '🗣️', color: 'from-emerald-400 to-emerald-600', ruta: `/juegos/refranes` },
    { id: 2, tipo: 'juego', titulo: 'Nivel 2: Muros Creativos', icono: '🎨', color: 'from-pink-400 to-pink-600', ruta: `/juegos/grafitis` },
    { id: 3, tipo: 'juego', titulo: 'Nivel 3: Gimnasia Lingüística', icono: '👅', color: 'from-orange-400 to-orange-600', ruta: `/juegos/trabalenguas` },
    { id: 4, tipo: 'juego', titulo: 'Nivel 4: Mansión del Pánico', icono: '👻', color: 'from-slate-700 to-slate-900', ruta: `/juegos/terror` },
    { id: 5, tipo: 'juego', titulo: 'Nivel 5: Versos del Alma', icono: '✒️', color: 'from-indigo-400 to-indigo-600', ruta: `/juegos/poesia` },
    { id: 6, tipo: 'juego', titulo: 'Nivel 6: Mago de Figuras', icono: '🧙', color: 'from-purple-400 to-purple-600', ruta: `/juegos/figuras` },
    { id: 7, tipo: 'juego', titulo: 'Nivel 7: Código Universal', icono: '🧩', color: 'from-blue-400 to-blue-600', ruta: `/juegos/pictogramas` },
    { id: 8, tipo: 'juego', titulo: 'Nivel 8: Maestro de Intenciones', icono: '🎯', color: 'from-red-400 to-red-600', ruta: `/juegos/intencion` },
    { id: 9, tipo: 'juego', titulo: 'Nivel 9: Dialectos en Red', icono: '🌐', color: 'from-cyan-400 to-cyan-600', ruta: `/juegos/variedades` },
    { id: 10, tipo: 'taller', titulo: 'Nivel 10: Científico Pro', icono: '🔬', color: 'from-amber-500 to-orange-700', ruta: `/taller` },
  ];

  const nivelesSeptimo = [
    { id: 1, tipo: 'juego', titulo: 'Nivel 1: Duelo de Coplas', icono: '🎭', color: 'from-yellow-400 to-orange-600', ruta: `/juegos/coplas` },
    { id: 2, tipo: 'juego', titulo: 'Nivel 2: Taller de Logos', icono: '🎨', color: 'from-blue-400 to-blue-600', ruta: `/juegos/logotipos` },
    { id: 3, tipo: 'juego', titulo: 'Nivel 3: Pesadillas 7.0', icono: '👿', color: 'from-gray-800 to-black', ruta: `/juegos/terror-septimo` },
    { id: 4, tipo: 'juego', titulo: 'Nivel 4: Lab. Científico', icono: '🧪', color: 'from-green-400 to-green-600', ruta: `/juegos/descripciones` },
    { id: 5, tipo: 'juego', titulo: 'Nivel 5: Modismos Top', icono: '🗣️', color: 'from-purple-400 to-purple-600', ruta: `/juegos/modismos` },
    { id: 6, tipo: 'juego', titulo: 'Nivel 6: Radio LectoTech', icono: '📻', color: 'from-red-400 to-red-600', ruta: `/juegos/radio` },
    { id: 7, tipo: 'juego', titulo: 'Nivel 7: Club de Debate', icono: '⚖️', color: 'from-cyan-400 to-cyan-600', ruta: `/juegos/debate` },
    { id: 8, tipo: 'juego', titulo: 'Nivel 8: Crónicas 360', icono: '📜', color: 'from-amber-400 to-amber-600', ruta: `/juegos/cronicas` },
    { id: 9, tipo: 'juego', titulo: 'Nivel 9: Ciudadano Digital', icono: '📱', color: 'from-indigo-400 to-indigo-600', ruta: `/juegos/reglamentos` },
    { id: 10, tipo: 'taller', titulo: 'Nivel 10: Detective Pro', icono: '🕵️‍♂️', color: 'from-pink-500 to-rose-700', ruta: `/juegos/semblanzas` },
  ];

  const niveles = isQuinto ? nivelesQuinto : isSexto ? nivelesSexto : isSeptimo ? nivelesSeptimo : nivelesGeneral;

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

const JuegosView = ({ currentGrado, currentClase, router }: any) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
    <h2 className="text-2xl font-bold text-[#2A5C82]">Juegos y Actividades</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {(currentGrado === '5' || ['QUINTO-CLASE', 'QUINTO-GRADO', '5TO-CLASE'].includes(currentClase) ? [
        { titulo: 'Cazador de Agudas', icono: '⚡', bg: 'bg-[#FF4136]', ruta: `/juegos/agudas` },
        { titulo: 'Sopa de Nanas', icono: '🧸', bg: 'bg-[#B10DC9]', ruta: `/juegos/sopa?grado=5&tema=nanas` },
        { titulo: 'Hecho u Opinión', icono: '⚖️', bg: 'bg-[#0074D9]', ruta: `/juegos/clasificador` },
        { titulo: 'Dialectos del Ecuador', icono: '🗺️', bg: 'bg-[#FFDC00]', ruta: `/juegos/dialectos` },
        { titulo: 'Adivina: Platero', icono: '🐴', bg: 'bg-[#AAAAAA]', ruta: `/juegos/adivina?grado=5` },
        { titulo: 'El Párrafo Loco', icono: '✍️', bg: 'bg-[#F012BE]', ruta: `/juegos/parrafo` },
        { titulo: 'Misión: Guía Turística', icono: '📸', bg: 'bg-[#2ECC40]', ruta: `/juegos/guia` },
        { titulo: 'Rondas en Acción', icono: '🎶', bg: 'bg-[#7FDBFF]', ruta: `/juegos/rondas` },
        { titulo: 'Referencial Challenge', icono: '📢', bg: 'bg-[#39CCCC]', ruta: `/juegos/referencial` },
        { titulo: 'Desafío Graves', icono: '⚖️', bg: 'bg-[#001f3f]', ruta: `/juegos/graves` },
      ] : (currentGrado === '6' || ['SEXTO-CLASE', 'SEXTO-GRADO', '6TO-CLASE'].includes(currentClase) ? [
        { titulo: 'Refranes Pro', icono: '🗣️', bg: 'bg-[#2ECC40]', ruta: `/juegos/refranes` },
        { titulo: 'Grafitis Poéticos', icono: '🎨', bg: 'bg-[#F012BE]', ruta: `/juegos/grafitis` },
        { titulo: 'Trabalenguas', icono: '👅', bg: 'bg-[#FF851B]', ruta: `/juegos/trabalenguas` },
        { titulo: 'Cuentos de Terror', icono: '👻', bg: 'bg-[#111111]', ruta: `/juegos/terror` },
        { titulo: 'Metáforas Locas', icono: '✒️', bg: 'bg-[#39CCCC]', ruta: `/juegos/poesia` },
        { titulo: 'Mago Literario', icono: '🧙', bg: 'bg-[#B10DC9]', ruta: `/juegos/figuras` },
        { titulo: 'Pictogramas', icono: '🧩', bg: 'bg-[#0074D9]', ruta: `/juegos/pictogramas` },
        { titulo: 'Intenciones', icono: '🎯', bg: 'bg-[#FF4136]', ruta: `/juegos/intencion` },
        { titulo: 'Variedades', icono: '🌐', bg: 'bg-[#01FF70]', ruta: `/juegos/variedades` },
        { titulo: 'Informes Lab', icono: '🔬', bg: 'bg-[#FFDC00]', ruta: `/juegos/informe` },
      ] : (currentGrado === '7' || ['SEPTIMO-CLASE', 'SEPTIMO-GRADO', '7MO-CLASE'].includes(currentClase) ? [
        { titulo: 'Coplas Fest', icono: '🎭', bg: 'bg-[#FF851B]', ruta: `/juegos/coplas` },
        { titulo: 'Marca Design', icono: '🎨', bg: 'bg-[#0074D9]', ruta: `/juegos/logotipos` },
        { titulo: 'Relatos Pro', icono: '👿', bg: 'bg-[#111111]', ruta: `/juegos/terror-septimo` },
        { titulo: 'Ciencia Lab', icono: '🧪', bg: 'bg-[#2ECC40]', ruta: `/juegos/descripciones` },
        { titulo: 'Modismos Ec', icono: '🗣️', bg: 'bg-[#B10DC9]', ruta: `/juegos/modismos` },
        { titulo: 'Radio On', icono: '📻', bg: 'bg-[#FF4136]', ruta: `/juegos/radio` },
        { titulo: 'Debate Pro', icono: '⚖️', bg: 'bg-[#39CCCC]', ruta: `/juegos/debate` },
        { titulo: 'Crónicas 360', icono: '📜', bg: 'bg-[#FFDC00]', ruta: `/juegos/cronicas` },
        { titulo: 'Reglamentos', icono: '📱', bg: 'bg-[#001f3f]', ruta: `/juegos/reglamentos` },
        { titulo: 'Semblanzas', icono: '🕵️‍♂️', bg: 'bg-[#F012BE]', ruta: `/juegos/semblanzas` },
      ] : [
        { titulo: 'Cazador de Verbos', icono: '🏃‍♂️', bg: 'bg-[#2A5C82]', ruta: `/juegos/verbos?grado=${currentGrado}` },
        { titulo: 'Sopa de Letras', icono: '🔍', bg: 'bg-[#E91E63]', ruta: `/juegos/sopa?grado=${currentGrado}` },
        { titulo: 'Parejas de Sinónimos', icono: '🃏', bg: 'bg-[#9C27B0]', ruta: `/juegos/parejas?grado=${currentGrado}` },
        { titulo: 'Adivina la Palabra', icono: '🤔', bg: 'bg-[#FF8C00]', ruta: `/juegos/adivina?grado=${currentGrado}` },
      ]))).map((juego, i) => (
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

const PlanificacionModal = ({ isOpen, onClose, grado }: { isOpen: boolean, onClose: () => void, grado: string }) => {
  const [selectedTema, setSelectedTema] = useState(0);

  const temasQuinto = [
    { 
      titulo: "La Ronda", icon: "🎶", 
      concepto: "Es una canción en movimiento que tiene sus raíces en ritos antiguos de comunidades para pedir prosperidad y buenas cosechas. Las personas se toman de las manos y se mueven en círculo.",
      ejemplos: ["Mambrú se fue a la guerra", "Arroz con leche", "A mi burro"],
      reto: "¿Qué representa el movimiento circular en una ronda?",
      respuesta: "La unión y el esfuerzo conjunto.",
      color: "from-blue-400 to-blue-600"
    },
    { 
      titulo: "Las Nanas", icon: "🧸", 
      concepto: "Canciones suaves, melódicas y repetitivas que se cantan a los bebés para ayudarlos a dormir. Transmiten tranquilidad, cariño y protección.",
      ejemplos: ["Duérmete niño", "Arrorró mi niño", "Este niño lindo"],
      reto: "¿Cuál es la función principal de una nana?",
      respuesta: "Ayudar al bebé a descansar con cariño.",
      color: "from-purple-400 to-purple-600"
    },
    { 
      titulo: "La Descripción", icon: "🖼️", 
      concepto: "Explicar detalladamente cómo son las personas, objetos o lugares. Puede ser literaria (artística y subjetiva) o técnica (objetiva y precisa).",
      ejemplos: ["Literaria: El mar es un espejo de plata.", "Técnica: El mar es una masa de agua salada."],
      reto: "Si digo 'sus ojos son luceros', ¿qué tipo de descripción es?",
      respuesta: "Descripción literaria.",
      color: "from-yellow-400 to-orange-600"
    },
    { 
      titulo: "Guía Turística", icon: "🗺️", 
      concepto: "Texto informativo que ofrece detalles sobre atractivos, servicios y ubicación de un lugar para orientar a los visitantes.",
      ejemplos: ["Guía de Baños: detalla cascadas y termas.", "Mapa de museos de Quito."],
      reto: "¿Por qué debe ser objetiva una guía?",
      respuesta: "Para dar información real y segura.",
      color: "from-green-400 to-green-600"
    },
    { 
      titulo: "Palabras Agudas", icon: "⚡", 
      concepto: "Llevan el acento en la última sílaba. Se tildan si terminan en n, s o vocal.",
      ejemplos: ["Con tilde: Mamá, león, café.", "Sin tilde: Azul, feliz, pared."],
      reto: "¿Por qué 'reloj' no lleva tilde?",
      respuesta: "Porque termina en 'j', no en n, s o vocal.",
      color: "from-red-400 to-red-600"
    },
    { 
      titulo: "Palabras Graves", icon: "⚖️", 
      concepto: "Llevan el acento en la penúltima sílaba. Se tildan si NO terminan en n, s o vocal.",
      ejemplos: ["Con tilde: Árbol, lápiz.", "Sin tilde: Mesa, joven, camino."],
      reto: "¿'Examen' lleva tilde?",
      respuesta: "No, porque termina en 'n'.",
      color: "from-indigo-400 to-indigo-600"
    },
    { 
      titulo: "El Párrafo", icon: "✍️", 
      concepto: "Conjunto de oraciones sobre una idea central. El párrafo descriptivo enumera características para crear una imagen mental.",
      ejemplos: ["Un párrafo describiendo a tu mascota favorita."],
      reto: "¿Qué palabras son clave en este párrafo?",
      respuesta: "Los adjetivos calificativos.",
      color: "from-pink-400 to-pink-600"
    },
    { 
      titulo: "Función Referencial", icon: "📢", 
      concepto: "Se usa para transmitir información objetiva sobre hechos o la realidad, sin incluir sentimientos u opiniones.",
      ejemplos: ["Quito es la capital de Ecuador.", "El agua hierve a 100°C."],
      reto: "¿'Qué lindo día' es función referencial?",
      respuesta: "No, es expresiva.",
      color: "from-cyan-400 to-cyan-600"
    },
    { 
      titulo: "Lengua y Cultura", icon: "🇪🇨", 
      concepto: "El castellano de Ecuador está enriquecido por lenguas como el kichwa, creando dialectos únicos.",
      ejemplos: ["Pachamama (Madre Tierra)", "Guambra (Niño)", "Inti Raymi (Fiesta del Sol)"],
      reto: "¿Qué significa Pachamama?",
      respuesta: "Madre Tierra.",
      color: "from-orange-400 to-yellow-500"
    }
  ];

  const temasSexto = [
    { 
      titulo: "Los Refranes", icon: "🗣️", 
      concepto: "Dichos populares que contienen una enseñanza o consejo. Se transmiten de generación en generación.",
      ejemplos: ["A palabras necias, oídos sordos", "Del dicho al hecho hay mucho trecho"],
      reto: "¿Qué significa 'Crea fama y échate a la cama'?",
      respuesta: "La reputación guía cómo te ven los demás.",
      color: "from-emerald-400 to-emerald-600"
    },
    { 
      titulo: "Los Grafitis", icon: "🎨", 
      concepto: "Forma de expresión visual en espacios públicos con mensajes poéticos, divertidos o de denuncia social.",
      ejemplos: ["Frases poéticas en muros", "Dibujos ecológicos"],
      reto: "¿Cuál es el propósito del grafiti?",
      respuesta: "Expresar ideas de forma pública y creativa.",
      color: "from-pink-400 to-pink-600"
    },
    { 
      titulo: "Juegos de Palabras", icon: "👅", 
      concepto: "Recursos literarios como trabalenguas, adivinanzas y calambures que usan la lengua de forma creativa.",
      ejemplos: ["Pablito clavó un clavito", "Adivinanzas de objetos"],
      reto: "¿Para qué sirven los trabalenguas?",
      respuesta: "Para mejorar la dicción y agilidad mental.",
      color: "from-orange-400 to-orange-600"
    },
    { 
      titulo: "Cuento de Terror", icon: "👻", 
      concepto: "Género que busca provocar miedo mediante ambientes misteriosos y situaciones sobrenaturales.",
      ejemplos: ["Historias de casas abandonadas", "Relatos de fantasmas"],
      reto: "¿Qué elemento es clave en el terror?",
      respuesta: "El suspenso y el misterio.",
      color: "from-slate-700 to-slate-900"
    },
    { 
      titulo: "Poema de Autor", icon: "✒️", 
      concepto: "Composición literaria con lenguaje figurado para comunicar emociones de forma bella.",
      ejemplos: ["Versos de Benjamín Carrión", "Poemas de Medardo Ángel Silva"],
      reto: "¿Qué es el lenguaje figurado?",
      respuesta: "Usar palabras con significados artísticos.",
      color: "from-indigo-400 to-indigo-600"
    },
    { 
      titulo: "Figuras Literarias", icon: "🧙", 
      concepto: "Recursos como la personificación (dar vida a objetos) y la hipérbole (exagerar la realidad).",
      ejemplos: ["Personificación: El viento canta.", "Hipérbole: Tengo tanta hambre que me comería un elefante."],
      reto: "Si digo 'las estrellas me miran', ¿qué figura es?",
      respuesta: "Personificación.",
      color: "from-purple-400 to-purple-600"
    },
    { 
      titulo: "Los Pictogramas", icon: "🧩", 
      concepto: "Signos gráficos que representan ideas de forma simplificada y universal.",
      ejemplos: ["Señales de tránsito", "Iconos de reciclaje"],
      reto: "¿Por qué son universales?",
      respuesta: "Porque se entienden sin palabras.",
      color: "from-blue-400 to-blue-600"
    },
    { 
      titulo: "Intención Comunicativa", icon: "🎯", 
      concepto: "El propósito que tenemos al hablar o escribir (informar, convencer, expresar afecto).",
      ejemplos: ["Persuadir: Por favor, déjame salir.", "Informar: La clase es a las 8."],
      reto: "¿Cuál es la intención de un chiste?",
      respuesta: "Divertir y causar risa.",
      color: "from-red-400 to-red-600"
    },
    { 
      titulo: "Variedades Lingüísticas", icon: "🌐", 
      concepto: "Diferentes formas de hablar según la edad, lugar de origen o cultura.",
      ejemplos: ["Jerga juvenil vs vocabulario de adultos", "Dialectos regionales"],
      reto: "¿Por qué cambia el idioma?",
      respuesta: "Porque la cultura y la sociedad evolucionan.",
      color: "from-cyan-400 to-cyan-600"
    },
    { 
      titulo: "Informe de Investigación", icon: "🔬", 
      concepto: "Texto que presenta resultados de un estudio de forma ordenada y objetiva.",
      ejemplos: ["Informe de ciencias", "Reporte de lectura"],
      reto: "¿Para qué sirve la bibliografía?",
      respuesta: "Para citar las fuentes consultadas.",
      color: "from-amber-500 to-orange-700"
    }
  ];

  const temasSeptimo = [
    { 
      titulo: "Duelo de Coplas", icon: "🎭", 
      concepto: "Composición poética popular, breve y directa, que suele usarse en desafíos de ingenio o festividades.",
      ejemplos: ["Coplas de carnaval", "Desafíos de contrapunto"],
      reto: "¿Cuál es la rima más común en una copla?",
      respuesta: "Rima asonante en los versos pares.",
      color: "from-yellow-400 to-orange-600"
    },
    { 
      titulo: "Logotipos y Marcas", icon: "🎨", 
      concepto: "Elementos visuales que representan la identidad de un producto o institución. Buscan ser memorables y únicos.",
      ejemplos: ["Isotipo", "Logotipo tipográfico"],
      reto: "¿Qué busca transmitir un buen logo?",
      respuesta: "Identidad y valores de la marca.",
      color: "from-blue-400 to-blue-600"
    },
    { 
      titulo: "Escritor de Pesadillas", icon: "👿", 
      concepto: "Técnicas avanzadas para crear suspenso y terror psicológico en relatos literarios.",
      ejemplos: ["Atmósferas opresivas", "Giros inesperados"],
      reto: "¿Qué es el suspenso?",
      respuesta: "Mantener la duda sobre lo que pasará.",
      color: "from-gray-800 to-black"
    },
    { 
      titulo: "Descripción Científica", icon: "🧪", 
      concepto: "Texto objetivo que detalla características de fenómenos naturales o experimentos con precisión técnica.",
      ejemplos: ["Reporte de laboratorio", "Descripción de una especie"],
      reto: "¿Cómo debe ser el lenguaje en la ciencia?",
      respuesta: "Preciso, claro y objetivo.",
      color: "from-green-400 to-green-600"
    },
    { 
      titulo: "Diccionario de Modismos", icon: "🗣️", 
      concepto: "Expresiones fijas cuyo significado no se deduce de las palabras que lo forman, propias de una región.",
      ejemplos: ["'Estar en la luna'", "'Dar en el clavo'"],
      reto: "¿Qué es un modismo?",
      respuesta: "Una expresión con significado figurado.",
      color: "from-purple-400 to-purple-600"
    },
    { 
      titulo: "Estación de Radio", icon: "📻", 
      concepto: "Medio de comunicación oral que utiliza guiones para organizar noticias, música y entrevistas.",
      ejemplos: ["Guion radial", "Podcast educativo"],
      reto: "¿Qué es un radioteatro?",
      respuesta: "Una historia contada solo con sonidos y voces.",
      color: "from-red-400 to-red-600"
    },
    { 
      titulo: "Club de Debate", icon: "⚖️", 
      concepto: "Discusión formal donde se defienden puntos de vista opuestos sobre un tema con argumentos válidos.",
      ejemplos: ["Debate escolar", "Mesa redonda"],
      reto: "¿Qué es un argumento?",
      respuesta: "Una razón para defender una idea.",
      color: "from-cyan-400 to-cyan-600"
    },
    { 
      titulo: "Crónica 360", icon: "📜", 
      concepto: "Relato de hechos históricos o actuales narrados en orden cronológico con detalles descriptivos.",
      ejemplos: ["Crónica de viaje", "Crónica periodística"],
      reto: "¿Cuál es el orden de una crónica?",
      respuesta: "Orden cronológico (de inicio a fin).",
      color: "from-amber-400 to-amber-600"
    },
    { 
      titulo: "Ciudadano Digital", icon: "📱", 
      concepto: "Uso responsable, ético y seguro de las tecnologías de la información y la comunicación.",
      ejemplos: ["Reglamentos de uso", "Netiqueta"],
      reto: "¿Qué es la huella digital?",
      respuesta: "El rastro que dejamos al usar internet.",
      color: "from-indigo-400 to-indigo-600"
    },
    { 
      titulo: "Detectives de Semblanzas", icon: "🕵️‍♂️", 
      concepto: "Descripción biográfica corta que resalta los rasgos más importantes de la personalidad de alguien.",
      ejemplos: ["Semblanza de un héroe", "Perfil de un autor"],
      reto: "¿En qué se diferencia de una biografía?",
      respuesta: "Es más corta y se enfoca en el carácter.",
      color: "from-pink-500 to-rose-700"
    }
  ];

  const temas = grado === '7' ? temasSeptimo : (grado === '6' ? temasSexto : temasQuinto);

  if (!isOpen) return null;

  const current = temas[selectedTema];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[100] flex items-center justify-center p-0 md:p-4 animate-in fade-in duration-300 overflow-y-auto">
      <div className="bg-white md:rounded-[3rem] w-full max-w-6xl min-h-full md:min-h-0 md:h-[90vh] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in zoom-in duration-300">
        
        {/* Sidebar de Temas */}
        <div className="w-full md:w-80 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col shrink-0">
          <div className="p-4 md:p-6 bg-[#2A5C82] text-white flex justify-between items-center md:block">
            <div>
              <h2 className="text-xl font-black flex items-center gap-2">
                <span>📚</span> Plan de Clase
              </h2>
              <p className="text-[10px] font-bold uppercase tracking-widest text-blue-200 mt-1">{grado}{grado === '7' ? 'mo' : 'to'} Grado Básica</p>
            </div>
            <button onClick={onClose} className="md:hidden bg-white/20 p-2 rounded-lg">✖️</button>
          </div>
          <div className="flex-1 overflow-x-auto md:overflow-y-auto flex md:flex-col p-2 md:p-4 gap-2 custom-scrollbar">
            {temas.map((tema, i) => (
              <button
                key={i}
                onClick={() => setSelectedTema(i)}
                className={`flex-shrink-0 md:w-full flex items-center gap-3 p-3 md:p-4 rounded-xl md:rounded-2xl transition-all font-bold text-xs md:text-sm
                  ${selectedTema === i ? 'bg-[#2A5C82] text-white shadow-lg scale-105' : 'text-gray-500 hover:bg-gray-100'}
                `}
              >
                <span className="text-lg md:text-xl">{tema.icon}</span>
                <span className="truncate max-w-[120px] md:max-w-none">{tema.titulo}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Contenido del Tema */}
        <div className="flex-1 flex flex-col bg-white relative overflow-hidden">
          <button onClick={onClose} className="absolute top-6 right-6 hidden md:flex bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-colors z-10">
             <span className="text-xl text-gray-500">✖️</span>
          </button>

          <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-8 animate-in slide-in-from-right-4 duration-500">
            {/* Cabecera del Tema */}
            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              <div className={`w-24 h-24 rounded-[2rem] bg-gradient-to-br ${current.color} text-white flex items-center justify-center text-5xl shadow-xl shadow-blue-100`}>
                {current.icon}
              </div>
              <div>
                <h1 className="text-4xl font-black text-[#2A5C82] mb-2">{current.titulo}</h1>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Unidad Académica Especializada</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Sección Concepto */}
              <div className="space-y-6">
                <div className="bg-blue-50 p-8 rounded-[2.5rem] border-2 border-blue-100">
                  <h3 className="text-blue-600 font-black uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
                    <span>💡</span> Concepto Clave
                  </h3>
                  <p className="text-gray-700 text-lg leading-relaxed font-medium italic">
                    "{current.concepto}"
                  </p>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border-2 border-gray-100 shadow-sm">
                  <h3 className="text-gray-400 font-black uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
                    <span>📝</span> Ejemplos Prácticos
                  </h3>
                  <ul className="space-y-3">
                    {current.ejemplos.map((ex, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-600 font-bold">
                        <span className="text-green-500">✔</span>
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sección Reto */}
              <div className="flex flex-col">
                <div className="bg-orange-500 p-10 rounded-[3rem] text-white shadow-2xl shadow-orange-100 flex-1 flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                  <div className="relative z-10">
                    <h3 className="text-orange-100 font-black uppercase text-xs tracking-widest mb-6 flex items-center gap-2">
                      <span>🧠</span> Reto Mental
                    </h3>
                    <p className="text-2xl font-black mb-8 leading-tight">
                      {current.reto}
                    </p>
                    <div className="bg-white/20 backdrop-blur-md p-6 rounded-2xl border border-white/30">
                      <p className="text-xs font-bold uppercase text-orange-100 mb-2">Respuesta Correcta:</p>
                      <p className="text-xl font-bold">{current.respuesta}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer de Navegación */}
          <div className="p-8 border-t border-gray-100 flex justify-between items-center bg-gray-50/50">
            <button 
              onClick={() => setSelectedTema(Math.max(0, selectedTema - 1))}
              disabled={selectedTema === 0}
              className="px-6 py-3 rounded-xl font-black text-[#2A5C82] hover:bg-white transition-all disabled:opacity-30"
            >
              ← Anterior
            </button>
            <div className="flex gap-2">
              {temas.map((_, i) => (
                <div key={i} className={`h-2 rounded-full transition-all ${selectedTema === i ? 'w-8 bg-[#2A5C82]' : 'w-2 bg-gray-300'}`}></div>
              ))}
            </div>
            <button 
              onClick={() => setSelectedTema(Math.min(temas.length - 1, selectedTema + 1))}
              disabled={selectedTema === temas.length - 1}
              className="px-8 py-3 bg-[#2A5C82] text-white rounded-xl font-black shadow-lg hover:-translate-y-1 transition-all disabled:opacity-30"
            >
              Siguiente →
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #CBD5E1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94A3B8;
        }
      `}</style>
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
        <h2 className="text-2xl font-bold text-[#2A5C82]">{showArchived ? '📦 Mensajes Ocultos' : '📢 Muro de la Clase'}</h2>
        <button 
          onClick={() => setShowArchived(!showArchived)}
          className={`px-4 py-2 rounded-xl font-black text-[10px] uppercase transition-all ${showArchived ? 'bg-blue-600 text-white shadow-md' : 'bg-white border-2 border-gray-100 text-gray-400'}`}
        >
          {showArchived ? 'Ver Recientes' : 'Ver Archivados'}
        </button>
      </div>

      {mensajesFiltrados.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100 text-center">
          <p className="text-gray-400 font-bold">{showArchived ? 'No tienes mensajes archivados.' : 'No hay mensajes nuevos en el muro.'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {mensajesFiltrados.map((msg: any) => (
             <MensajeCard 
               key={msg.id} msg={msg} onStar={onStar} onComment={onComment} 
               onArchive={onArchive} currentUserId={currentUserId} setSelectedBook={setSelectedBook}
               isArchivedView={showArchived}
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
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#2A5C82]">{showArchived ? '📦 Privados Archivados' : '✉️ Mis Mensajes Privados'}</h2>
        <button 
          onClick={() => setShowArchived(!showArchived)}
          className={`px-4 py-2 rounded-xl font-black text-[10px] uppercase transition-all ${showArchived ? 'bg-blue-600 text-white shadow-md' : 'bg-white border-2 border-gray-100 text-gray-400'}`}
        >
          {showArchived ? 'Ver Recientes' : 'Ver Archivados'}
        </button>
      </div>
      {mensajesPrivados.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100 text-center">
          <p className="text-gray-400 font-bold">{showArchived ? 'No tienes mensajes privados archivados.' : 'No tienes mensajes directos del profesor.'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {mensajesPrivados.map((msg: any) => (
             <MensajeCard 
               key={msg.id} msg={msg} onStar={onStar} onComment={onComment} 
               onArchive={onArchive} currentUserId={currentUserId} setSelectedBook={setSelectedBook}
               isArchivedView={showArchived}
             />
          ))}
        </div>
      )}
    </div>
  );
};

const MensajeCard = ({ msg, onStar, onComment, onArchive, currentUserId, setSelectedBook, isArchivedView }: any) => {
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
            onClick={() => onArchive(msg.id, isArchivedView)}
            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase transition-all ${isArchivedView ? 'bg-green-100 text-green-600 hover:bg-green-200' : 'bg-gray-100 hover:bg-orange-50 text-gray-400 hover:text-orange-600'}`}
          >
            {isArchivedView ? 'Desarchivar' : 'Ocultar'}
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
  const [isPlanOpen, setIsPlanOpen] = useState(false);
  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, [showArchived]);

  const fetchProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      // Si el usuario es estudiante pero no tiene perfil, es que ha sido eliminado
      if (profileError && profileError.code === 'PGRST116') {
        const isStudent = user.user_metadata?.role === 'estudiante';
        if (isStudent) {
          alert("🚨 TU USUARIO HA SIDO ELIMINADO.\n\nPuedes registrarte nuevamente con un nuevo código de clase.");
          await supabase.auth.signOut();
          router.push('/estudiante?error=account_deleted');
          return;
        }
      }

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
      .or(`and(target_type.eq.class,target_id.eq.${claseCode}),and(target_type.eq.student,target_id.eq.${userId})`)
      .order('created_at', { ascending: false });
    
    if (data) {
      const hiddenIds = JSON.parse(localStorage.getItem(`hidden_msgs_${userId}`) || '[]');
      
      // Filtrar según el modo (Archivados o Recientes)
      const filtered = data.filter((m: any) => {
        const isHiddenLocally = hiddenIds.includes(m.id);
        const isArchivedInDB = m.is_archived === true;
        
        if (showArchived) {
          // En vista de archivados: mostramos los que están en DB como archivados O los que ocultamos localmente
          return isArchivedInDB || isHiddenLocally;
        } else {
          // En vista normal: ocultamos ambos
          return !isArchivedInDB && !isHiddenLocally;
        }
      });

      setMensajes(filtered as any);
    }
  };

  const handleArchiveMessage = async (msgId: string, currentlyArchived: boolean) => {
    const msg = mensajes.find(m => m.id === msgId);
    // Si no está en la lista actual, puede ser que estemos en vista archivados, lo buscamos en el pool original si fuera necesario, 
    // pero el pool 'mensajes' ya contiene lo filtrado.

    if (msg?.target_type === 'student') {
      // Mensaje privado: Actualizar en DB
      const { error } = await supabase
        .from('messages')
        .update({ is_archived: !currentlyArchived })
        .eq('id', msgId);
      
      if (error) {
        alert("Error: " + error.message);
        return;
      }
    } else {
      // Mensaje de clase: Usar localStorage
      const hiddenIds = JSON.parse(localStorage.getItem(`hidden_msgs_${estudianteInfo.id}`) || '[]');
      if (currentlyArchived) {
        // Desarchivar: quitar de la lista de ocultos
        const newIds = hiddenIds.filter((id: string) => id !== msgId);
        localStorage.setItem(`hidden_msgs_${estudianteInfo.id}`, JSON.stringify(newIds));
      } else {
        // Archivar: añadir a la lista
        localStorage.setItem(`hidden_msgs_${estudianteInfo.id}`, JSON.stringify([...hiddenIds, msgId]));
      }
    }
    
    alert(currentlyArchived ? "Mensaje restaurado." : "Mensaje ocultado de tu muro.");
    fetchMensajes(estudianteInfo.id, (estudianteInfo as any).clase);
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

  const searchParams = useSearchParams();
  const forcedGrado = searchParams.get('grado');

  const currentGrado = forcedGrado || estudianteInfo.grado;
  const currentClase = (estudianteInfo as any).clase || (forcedGrado === '6' ? 'SEXTO-CLASE' : '');

  const isQuinto = currentGrado === '5' || ['QUINTO-CLASE', 'QUINTO-GRADO', '5TO-CLASE'].includes(currentClase);
  const isSexto = currentGrado === '6' || ['SEXTO-CLASE', 'SEXTO-GRADO', '6TO-CLASE'].includes(currentClase);
  const isSeptimo = currentGrado === '7' || ['SEPTIMO-CLASE', '7MO-CLASE'].includes(currentClase);

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
            <div className="flex items-center gap-4">
              {(isQuinto || isSexto || isSeptimo) && (
                <button 
                  onClick={() => setIsPlanOpen(true)}
                  className="hidden md:flex items-center gap-2 bg-[#FF8C00] hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-black shadow-md transition-all hover:-translate-y-1"
                >
                  <span>📋</span> Planificación {isQuinto ? '5to' : (isSexto ? '6to' : '7mo')}
                </button>
              )}
              <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-xl border border-yellow-100">
                <span className="text-2xl animate-bounce">🌟</span>
                <span className="font-bold text-[#FFD700] text-xl">120</span>
              </div>
            </div>
          </header>
          {/* Botón flotante para móvil */}
          <div className="md:hidden mt-4">
            {(isQuinto || isSexto || isSeptimo) && (
              <button 
                onClick={() => setIsPlanOpen(true)}
                className="w-full flex items-center justify-center gap-2 bg-[#FF8C00] text-white p-3 rounded-xl font-black shadow-lg"
              >
                <span>📋</span> Ver Plan de Clase {isQuinto ? '5to' : (isSexto ? '6to' : '7mo')}
              </button>
            )}
          </div>
        </div>

        {/* Contenedor de contenido con padding superior para evitar solapamiento */}
        <div className="px-4 md:px-8 pb-12 pt-6 flex-1 relative z-10">
          {activeTab === 'perfil' && <PerfilView estudianteInfo={estudianteInfo} handleAvatarUpload={handleAvatarUpload} loading={loading} />}
          {activeTab === 'muro' && <MuroView mensajes={mensajes} onStar={handleAddStar} onComment={handleAddComment} onArchive={handleArchiveMessage} currentUserId={estudianteInfo.id} setSelectedBook={setSelectedBook} />}
          {activeTab === 'mensajes' && <MensajesView mensajes={mensajes} onStar={handleAddStar} onComment={handleAddComment} onArchive={handleArchiveMessage} currentUserId={estudianteInfo.id} setSelectedBook={setSelectedBook} />}
          {activeTab === 'retos' && <RetosView currentGrado={currentGrado} currentClase={currentClase} router={router} />}
          {activeTab === 'juegos' && <JuegosView currentGrado={currentGrado} currentClase={currentClase} router={router} />}
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
              <div className="flex gap-2">
                <a 
                  href={selectedBook.pdf_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-600 px-4 py-1 rounded-lg font-bold text-sm flex items-center gap-2"
                >
                  <span>🌐</span> Abrir Externo
                </a>
                <button onClick={() => setSelectedBook(null)} className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-lg font-bold text-sm">Cerrar</button>
              </div>
            </div>
            <div className="flex-1 bg-gray-100 relative">
              <iframe 
                src={selectedBook.pdf_url} 
                className="w-full h-full border-none" 
                title="Visor de Libro" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Planificación Modal */}
      <PlanificacionModal 
        isOpen={isPlanOpen} 
        onClose={() => setIsPlanOpen(false)} 
        grado={isSeptimo ? '7' : (isSexto ? '6' : '5')}
      />
    </div>
  );
}
