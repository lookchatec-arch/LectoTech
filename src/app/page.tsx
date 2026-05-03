"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const router = useRouter();
  
  // Modals state
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  
  // Forms state
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [classCode, setClassCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleStudentLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      // Intentar validar código en Supabase (si existe la tabla)
      const { data: clase, error } = await supabase
        .from('classes')
        .select('*')
        .eq('code', classCode)
        .single();

      const syncLocal = () => {
        const estudiantes = JSON.parse(localStorage.getItem('lectotech_estudiantes') || '[]');
        // Evitar duplicados por email
        if (!estudiantes.some((e: any) => e.email === studentEmail)) {
          estudiantes.push({ id: Date.now(), nombre: studentName, email: studentEmail, clase: classCode.toUpperCase(), avance: 0 });
          localStorage.setItem('lectotech_estudiantes', JSON.stringify(estudiantes));
        }
      };

      if (error || !clase) {
        // Fallback simulado para demostración si la BD no está lista aún
        if (classCode.toUpperCase() === 'DEMO-5A') {
          syncLocal();
          router.push(`/dashboard?estudiante=${encodeURIComponent(studentName)}&grado=5`);
        } else {
          setErrorMsg("Código de clase inválido. Intenta con DEMO-5A.");
        }
      } else {
        // Si la base de datos está lista y el código existe
        syncLocal();
        router.push(`/dashboard?estudiante=${encodeURIComponent(studentName)}&grado=5`);
      }
    } catch (err) {
      setErrorMsg("Error de conexión. Usa DEMO-5A temporalmente.");
    } finally {
      setLoading(false);
    }
  };

  const handleTeacherLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulando login de profesor (se requiere Auth real de Supabase luego)
    router.push('/profesor');
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-[var(--color-paper-cream)] p-4">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6">
          <h1 className="text-5xl md:text-6xl font-bold text-[#2A5C82] leading-tight">
            Lecto<span className="text-[#FFD700]">Tech</span>
          </h1>
          <p className="text-xl text-gray-700 font-medium">
            ¡Descubre la magia de las palabras y conviértete en un maestro de las historias!
          </p>
          <div className="flex gap-4 mt-4">
            <span className="bg-[#4CAF50] text-white px-4 py-2 rounded-full text-sm font-bold shadow-sm">Lee</span>
            <span className="bg-[#FF8C00] text-white px-4 py-2 rounded-full text-sm font-bold shadow-sm">Juega</span>
            <span className="bg-[#FFD700] text-gray-900 px-4 py-2 rounded-full text-sm font-bold shadow-sm">Aprende</span>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <Card className="w-full mx-auto shadow-xl border-t-4 border-t-[#2A5C82]">
            <CardContent className="p-8 flex flex-col gap-6">
              <div className="text-center space-y-2 mb-2">
                <h2 className="text-2xl font-bold text-[#2A5C82]">Portal de Acceso</h2>
                <p className="text-sm text-gray-500">Selecciona tu perfil para ingresar</p>
              </div>
              
              <Button 
                onClick={() => setShowStudentModal(true)}
                className="w-full text-xl py-6 shadow-md bg-white border-2 border-[#4CAF50] text-[#4CAF50] hover:bg-green-50 rounded-2xl flex items-center justify-center gap-3"
              >
                <span className="text-3xl">👦</span> Soy Estudiante
              </Button>

              <Button 
                onClick={() => setShowTeacherModal(true)}
                className="w-full text-xl py-6 shadow-md bg-[#2A5C82] hover:bg-blue-800 text-white rounded-2xl flex items-center justify-center gap-3"
              >
                <span className="text-3xl">👨‍🏫</span> Soy Profesor
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal Estudiante */}
      {showStudentModal && (
        <Modal isOpen={showStudentModal} title="Acceso de Estudiante" onClose={() => setShowStudentModal(false)}>
          <div className="p-6 text-center">
            <div className="text-5xl mb-4">🚀</div>
            <h2 className="text-2xl font-bold text-[#2A5C82] mb-6">Ingreso de Estudiante</h2>
            <form onSubmit={handleStudentLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Tu Nombre o Alias</label>
                <input 
                  type="text" 
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#4CAF50] outline-none"
                  placeholder="Ej. Mateo el Explorador"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Correo Electrónico</label>
                <input 
                  type="email" 
                  required
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#4CAF50] outline-none"
                  placeholder="estudiante@escuela.com"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Código de la Clase</label>
                <input 
                  type="text" 
                  required
                  value={classCode}
                  onChange={(e) => setClassCode(e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#4CAF50] outline-none font-mono uppercase"
                  placeholder="Ej. DEMO-5A"
                />
              </div>
              {errorMsg && <p className="text-red-500 text-sm font-bold">{errorMsg}</p>}
              <Button type="submit" disabled={loading} className="w-full bg-[#4CAF50] hover:bg-green-600 py-4 text-lg mt-4">
                {loading ? 'Verificando...' : 'Entrar al Mundo'}
              </Button>
            </form>
          </div>
        </Modal>
      )}

      {/* Modal Profesor */}
      {showTeacherModal && (
        <Modal isOpen={showTeacherModal} title="Portal Docente" onClose={() => setShowTeacherModal(false)}>
          <div className="p-6 text-center">
            <div className="text-5xl mb-4">🏫</div>
            <h2 className="text-2xl font-bold text-[#2A5C82] mb-6">Portal Docente</h2>
            <form onSubmit={handleTeacherLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Correo Electrónico</label>
                <input 
                  type="email" 
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#2A5C82] outline-none"
                  placeholder="profe@escuela.com"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Contraseña</label>
                <input 
                  type="password" 
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#2A5C82] outline-none"
                  placeholder="••••••••"
                />
              </div>
              <Button type="submit" className="w-full bg-[#2A5C82] hover:bg-blue-800 py-4 text-lg mt-4">
                Ingresar al Panel
              </Button>
            </form>
          </div>
        </Modal>
      )}

    </div>
  );
}
