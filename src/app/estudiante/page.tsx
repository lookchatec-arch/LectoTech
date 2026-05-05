"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { supabase } from "@/lib/supabaseClient";

export default function EstudianteLoginPage() {
  const router = useRouter();
  
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [nombres, setNombres] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [classCode, setClassCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      if (authMode === 'register') {
        const codigoUpper = classCode.trim().toUpperCase();
        
        // Validación de códigos estricta
        if (!['5TO-CLASE', '6TO-CLASE', '7MO-CLASE'].includes(codigoUpper)) {
          setErrorMsg("Código de clase inválido. Verifica con tu profesor.");
          setLoading(false);
          return;
        }

        let grado = '5';
        if (codigoUpper === '6TO-CLASE') grado = '6';
        if (codigoUpper === '7MO-CLASE') grado = '7';

        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password: password,
          options: {
            data: {
              full_name: nombres,
              role: 'estudiante',
              grado: grado,
              clase: codigoUpper
            }
          }
        });

        if (error) throw error;
        
        if (data.user?.identities?.length === 0) {
           setErrorMsg("Este correo ya está registrado.");
        } else {
           setSuccessMsg("¡Registro exitoso! Por favor, verifica tu correo (si está configurado) o inicia sesión.");
           setAuthMode('login');
           setPassword('');
        }

      } else {
        // Modo Login
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password,
        });

        if (error) throw error;

        if (data.user) {
          // Extraemos el nombre y grado de los metadatos de Supabase
          const nombreUser = data.user.user_metadata?.full_name || 'Estudiante';
          const gradoUser = data.user.user_metadata?.grado || '5';
          router.push(`/dashboard?estudiante=${encodeURIComponent(nombreUser)}&grado=${gradoUser}`);
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-paper-cream)] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border-t-8 border-t-[#4CAF50] overflow-hidden relative">
        
        <div className="p-8 pb-4 text-center">
          <button 
            onClick={() => router.push('/')}
            className="absolute top-4 left-4 text-gray-400 hover:text-gray-700 font-bold flex items-center gap-1 bg-white p-2 rounded-lg shadow-sm border border-gray-100"
          >
            ← Volver
          </button>
          
          <div className="text-6xl mb-4 mt-2">👦</div>
          <h1 className="text-2xl font-bold text-[#2A5C82]">Portal del Estudiante</h1>
          <p className="text-gray-500 text-sm mt-2">Ingresa al mundo de LectoTech</p>
        </div>

        <div className="px-8 mb-6">
          <div className="flex bg-gray-100 rounded-xl p-1">
            <button
              className={`flex-1 py-3 rounded-lg font-bold transition-all ${authMode === 'login' ? 'bg-white text-[#4CAF50] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => { setAuthMode('login'); setErrorMsg(''); setSuccessMsg(''); }}
            >
              Iniciar Sesión
            </button>
            <button
              className={`flex-1 py-3 rounded-lg font-bold transition-all ${authMode === 'register' ? 'bg-white text-[#4CAF50] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => { setAuthMode('register'); setErrorMsg(''); setSuccessMsg(''); }}
            >
              Registrarse
            </button>
          </div>
        </div>

        <form onSubmit={handleAuth} className="px-8 pb-8 space-y-4">
          {authMode === 'register' && (
            <div className="animate-in fade-in slide-in-from-top-2">
              <label className="block text-sm font-bold text-gray-700 mb-1">Nombres y Apellidos</label>
              <input 
                type="text" 
                required
                value={nombres}
                onChange={(e) => setNombres(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#4CAF50] outline-none transition-colors"
                placeholder="Ej. Mateo el Explorador"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Correo Electrónico</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#4CAF50] outline-none transition-colors"
              placeholder="estudiante@escuela.com"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Contraseña</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#4CAF50] outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>
          
          {authMode === 'register' && (
            <div className="animate-in fade-in slide-in-from-top-2">
              <label className="block text-sm font-bold text-gray-700 mb-1">Código de la Clase</label>
              <input 
                type="text" 
                required
                value={classCode}
                onChange={(e) => setClassCode(e.target.value.toUpperCase())}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#4CAF50] outline-none font-mono uppercase transition-colors"
                placeholder="Ej. 5TO-CLASE"
              />
              <p className="text-xs text-gray-500 mt-2 font-medium">Ej: 5TO-CLASE, 6TO-CLASE, 7MO-CLASE.</p>
            </div>
          )}
          
          {errorMsg && <p className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-xl border border-red-100">{errorMsg}</p>}
          {successMsg && <p className="text-green-600 text-sm font-bold bg-green-50 p-3 rounded-xl border border-green-100">{successMsg}</p>}
          
          <Button type="submit" disabled={loading} className="w-full bg-[#4CAF50] hover:bg-green-600 py-6 text-xl mt-6 shadow-md transition-all hover:-translate-y-1 rounded-xl">
            {loading ? 'Procesando...' : (authMode === 'login' ? 'Entrar al Mundo' : 'Crear Perfil y Jugar')}
          </Button>

          <div className="pt-6 border-t border-gray-100 mt-6">
            <Button 
              type="button"
              onClick={() => router.push('/dashboard?estudiante=Desarrollo&grado=5')}
              className="w-full text-sm py-4 shadow-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl flex items-center justify-center gap-2 font-bold"
            >
              🧪 Entrar como Versión Desarrollo
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
