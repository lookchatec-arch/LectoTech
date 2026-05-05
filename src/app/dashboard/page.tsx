"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SabiasQue } from '@/components/SabiasQue';

// --- Subcomponentes de Vistas ---

const PerfilView = ({ estudianteInfo }: any) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8">
      <div className="w-32 h-32 bg-gradient-to-tr from-blue-400 to-green-400 rounded-full flex items-center justify-center text-6xl shadow-inner border-4 border-white">
        👦
      </div>
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-3xl font-bold text-[#2A5C82] mb-2">{estudianteInfo.nombre}</h2>
        <p className="text-lg text-gray-600 mb-4">Aventurero de {estudianteInfo.grado}to Básica</p>
        <div className="flex gap-4 justify-center md:justify-start">
          <span className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-bold">Nivel 5</span>
          <span className="bg-yellow-100 text-yellow-800 px-4 py-1 rounded-full text-sm font-bold">120 🌟</span>
        </div>
      </div>
      <button className="bg-[#FF8C00] hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-transform hover:scale-105">
        Configurar Perfil
      </button>
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
              {nivel.completado && (
                <div className="absolute -bottom-3 flex gap-1 bg-white px-2 py-1 rounded-full shadow-sm border border-gray-100">
                  <span className="text-xs">⭐</span><span className="text-xs">⭐</span><span className="text-xs">⭐</span>
                </div>
              )}
            </div>
          );
        })}
        <div className="relative z-10 mt-8">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center text-5xl md:text-6xl shadow-2xl border-b-8 border-purple-800 animate-bounce cursor-pointer hover:brightness-110 transition-all">
            🎁
          </div>
        </div>
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
          <button className="text-sm bg-gray-100 px-4 py-2 rounded-lg font-semibold text-gray-600 group-hover:bg-[#4CAF50] group-hover:text-white transition-colors">Jugar Ahora</button>
        </div>
      ))}
    </div>
  </div>
);

const BibliotecaView = ({ router }: any) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center">
    <div className="text-8xl mb-6">📚</div>
    <h2 className="text-3xl font-bold text-[#2A5C82] mb-4">Biblioteca Interactiva</h2>
    <p className="text-gray-600 max-w-lg mx-auto mb-8">Descubre mundos increíbles a través de historias diseñadas especialmente para ti. ¡Gana estrellas por cada libro que leas!</p>
    <button onClick={() => router.push('/biblioteca')} className="bg-[#4CAF50] hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full shadow-lg text-lg transition-transform hover:scale-105">
      Entrar a la Biblioteca
    </button>
  </div>
);

const GuiaView = () => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
    <h2 className="text-2xl font-bold text-[#2A5C82]">Guía de la Plataforma</h2>
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
      <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
        <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center text-6xl shadow-inner shrink-0">
          🗺️
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">¿Cómo uso LectoTech?</h3>
          <p className="text-gray-600">LectoTech es un mundo de aventuras. Tu objetivo es completar los <span className="font-bold text-orange-500">Retos</span> para ganar estrellas. Puedes practicar con los <span className="font-bold text-pink-500">Juegos</span> en cualquier momento y sumergirte en historias increíbles en la <span className="font-bold text-green-500">Biblioteca</span>.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 p-4 rounded-xl text-center border border-gray-100">
          <div className="text-3xl mb-2">⭐</div>
          <h4 className="font-bold text-gray-800">Estrellas</h4>
          <p className="text-sm text-gray-500">Gánalas completando lecturas y juegos de tus retos diarios.</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-xl text-center border border-gray-100">
          <div className="text-3xl mb-2">🔒</div>
          <h4 className="font-bold text-gray-800">Desbloqueos</h4>
          <p className="text-sm text-gray-500">Completa el reto actual para desbloquear el siguiente nivel.</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-xl text-center border border-gray-100">
          <div className="text-3xl mb-2">🏆</div>
          <h4 className="font-bold text-gray-800">Logros</h4>
          <p className="text-sm text-gray-500">Mira tu progreso en la pestaña de "Mi Perfil".</p>
        </div>
      </div>
    </div>
  </div>
);

const QuienesSomosView = () => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-gradient-to-br from-[#2A5C82] to-[#1a3a53] text-white rounded-3xl p-8 shadow-xl text-center">
    <div className="text-7xl mb-6">🚀</div>
    <h2 className="text-3xl font-bold text-[#FFD700] mb-4">¿Quiénes Somos?</h2>
    <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
      En LectoTech, creemos que leer no tiene por qué ser aburrido. Somos un equipo apasionado por la educación y la tecnología, creando herramientas interactivas para que los estudiantes descubran la magia de las palabras de una forma divertida y dinámica.
    </p>
    <div className="mt-8 pt-8 border-t border-blue-400/30 flex flex-wrap justify-center gap-4">
      <span className="bg-white/10 px-4 py-2 rounded-lg font-semibold">Educación interactiva</span>
      <span className="bg-white/10 px-4 py-2 rounded-lg font-semibold">Neuroeducación</span>
      <span className="bg-white/10 px-4 py-2 rounded-lg font-semibold">Gamificación</span>
    </div>
  </div>
);

// --- Componente Principal ---

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [estudianteInfo, setEstudianteInfo] = useState({ nombre: 'Explorador', grado: '5' });
  const [activeTab, setActiveTab] = useState('perfil');

  useEffect(() => {
    const nombre = searchParams.get('estudiante');
    const grado = searchParams.get('grado');
    if (nombre && grado) {
      setEstudianteInfo({
        nombre: nombre.charAt(0).toUpperCase() + nombre.slice(1),
        grado: grado
      });
    }
  }, [searchParams]);

  const SidebarButton = ({ id, icon, label }: { id: string, icon: string, label: string }) => {
    const isActive = activeTab === id;
    return (
      <button
        onClick={() => setActiveTab(id)}
        className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 w-full text-left font-bold ${
          isActive 
            ? 'bg-white text-[#2A5C82] shadow-md scale-105' 
            : 'text-blue-100 hover:bg-white/10 hover:text-white hover:translate-x-1'
        }`}
      >
        <span className="text-2xl">{icon}</span>
        <span className="hidden md:block truncate">{label}</span>
      </button>
    );
  };

  return (
    <div className="flex h-screen bg-[#F0F4F8] overflow-hidden">
      {/* Sidebar Izquierdo */}
      <aside className="w-20 md:w-72 bg-[#2A5C82] flex flex-col p-4 shadow-2xl z-20 flex-shrink-0 transition-all duration-300">
        <h2 className="text-2xl font-bold mb-8 text-center border-b border-blue-400/30 pb-4 hidden md:block text-white">
          Lecto<span className="text-[#FFD700]">Tech</span>
        </h2>
        <div className="text-3xl text-center mb-8 pb-4 border-b border-blue-400/30 md:hidden">🚀</div>
        
        <nav className="flex flex-col gap-2 flex-grow overflow-y-auto overflow-x-hidden custom-scrollbar pr-1">
          <SidebarButton id="perfil" icon="👤" label="Mi Perfil" />
          <SidebarButton id="retos" icon="🏆" label="Retos" />
          <SidebarButton id="juegos" icon="🎮" label="Juegos / Actividades" />
          <SidebarButton id="biblioteca" icon="📚" label="Biblioteca Interactiva" />
          
          <div className="mt-auto pt-8 flex flex-col gap-2 border-t border-blue-400/30">
            <SidebarButton id="guia" icon="🗺️" label="Guía de Plataforma" />
            <SidebarButton id="quienes-somos" icon="ℹ️" label="Quiénes Somos" />
          </div>
        </nav>
      </aside>

      {/* Contenido Principal Derecho */}
      <main className="flex-1 flex flex-col h-full relative overflow-y-auto custom-scrollbar">
        {/* Mobile Header Toggle (Opicional para futuro) */}
        
        {/* Top Header Fijo o Sticky */}
        <div className="sticky top-0 z-10 bg-[#F0F4F8]/80 backdrop-blur-md p-4 md:p-8 pb-4">
          <header className="flex justify-between items-center bg-white p-4 px-6 md:px-8 rounded-2xl shadow-sm border border-gray-100">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-[#2A5C82] truncate max-w-[200px] md:max-w-none">¡Hola, {estudianteInfo.nombre}!</h1>
              <p className="text-gray-500 text-sm font-bold capitalize">{activeTab.replace('-', ' ')}</p>
            </div>
            <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-xl border border-yellow-100">
              <span className="text-2xl animate-pulse">🌟</span>
              <span className="font-bold text-[#FFD700] text-xl">120</span>
            </div>
          </header>
        </div>

        {/* Dynamic Views */}
        <div className="px-4 md:px-8 pb-12 pt-4 flex-1">
          {activeTab === 'perfil' && <PerfilView estudianteInfo={estudianteInfo} />}
          {activeTab === 'retos' && <RetosView estudianteInfo={estudianteInfo} router={router} />}
          {activeTab === 'juegos' && <JuegosView estudianteInfo={estudianteInfo} router={router} />}
          {activeTab === 'biblioteca' && <BibliotecaView router={router} />}
          {activeTab === 'guia' && <GuiaView />}
          {activeTab === 'quienes-somos' && <QuienesSomosView />}
        </div>
      </main>
      
      {/* CSS extra para la scrollbar del dashboard */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(0,0,0,0.1);
          border-radius: 10px;
        }
        aside .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(255,255,255,0.2);
        }
      `}} />
    </div>
  );
}


