"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { supabase } from "@/lib/supabaseClient";

export default function ProfesorLoginPage() {
  const router = useRouter();
  
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [regCode, setRegCode] = useState("");
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
        const codigoUpper = regCode.trim().toUpperCase();

        if (codigoUpper !== 'MAESTRIA-UG') {
          setErrorMsg("Código de registro inválido. Contacta al administrador.");
          setLoading(false);
          return;
        }

        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password: password,
          options: {
            data: {
              full_name: nombre,
              role: 'profesor'
            }
          }
        });

        if (error) throw error;
        
        if (data.user?.identities?.length === 0) {
           setErrorMsg("Este correo ya está registrado.");
        } else {
           setSuccessMsg("¡Registro docente exitoso! Por favor, inicia sesión.");
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
          router.push('/profesor');
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
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border-t-8 border-t-[#2A5C82] overflow-hidden relative">
        
        <div className="p-8 pb-4 text-center">
          <button 
            onClick={() => router.push('/')}
            className="absolute top-4 left-4 text-gray-400 hover:text-gray-700 font-bold flex items-center gap-1 bg-white p-2 rounded-lg shadow-sm border border-gray-100"
          >
            ← Volver
          </button>

          <div className="text-6xl mb-4 mt-2">👨‍🏫</div>
          <h1 className="text-2xl font-bold text-[#2A5C82]">Portal Docente</h1>
          <p className="text-gray-500 text-sm mt-2">Gestiona tus clases y actividades</p>
        </div>

        <div className="px-8 mb-6">
          <div className="flex bg-gray-100 rounded-xl p-1">
            <button
              className={`flex-1 py-3 rounded-lg font-bold transition-all ${authMode === 'login' ? 'bg-white text-[#2A5C82] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => { setAuthMode('login'); setErrorMsg(''); setSuccessMsg(''); }}
            >
              Iniciar Sesión
            </button>
            <button
              className={`flex-1 py-3 rounded-lg font-bold transition-all ${authMode === 'register' ? 'bg-white text-[#2A5C82] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => { setAuthMode('register'); setErrorMsg(''); setSuccessMsg(''); }}
            >
              Registrarse
            </button>
          </div>
        </div>

        <form onSubmit={handleAuth} className="px-8 pb-8 space-y-4">
          {authMode === 'register' && (
            <div className="animate-in fade-in slide-in-from-top-2">
              <label className="block text-sm font-bold text-gray-700 mb-1">Nombre Completo</label>
              <input 
                type="text" 
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#2A5C82] outline-none transition-colors"
                placeholder="Ej. Profesor Carlos"
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
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#2A5C82] outline-none transition-colors"
              placeholder="profe@escuela.com"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Contraseña</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#2A5C82] outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          {authMode === 'register' && (
            <div className="animate-in fade-in slide-in-from-top-2">
              <label className="block text-sm font-bold text-gray-700 mb-1">Código Maestro</label>
              <input 
                type="text" 
                required
                value={regCode}
                onChange={(e) => setRegCode(e.target.value.toUpperCase())}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#2A5C82] outline-none font-mono uppercase transition-colors"
                placeholder="EJ: MAESTRIA-UG"
              />
            </div>
          )}
          
          {errorMsg && <p className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-xl border border-red-100">{errorMsg}</p>}
          {successMsg && <p className="text-green-600 text-sm font-bold bg-green-50 p-3 rounded-xl border border-green-100">{successMsg}</p>}

          <Button type="submit" disabled={loading} className="w-full bg-[#2A5C82] hover:bg-blue-800 py-6 text-xl mt-6 shadow-md transition-all hover:-translate-y-1 rounded-xl">
            {loading ? 'Procesando...' : (authMode === 'login' ? 'Ingresar al Panel' : 'Crear Cuenta Docente')}
          </Button>

          <div className="pt-6 border-t border-gray-100 mt-6">
            <Button 
              type="button"
              onClick={() => router.push('/profesor')}
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
