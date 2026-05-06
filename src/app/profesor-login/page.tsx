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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [regCode, setRegCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [isSuccess, setIsSuccess] = useState(false);

  const validatePassword = (pass: string) => {
    const hasUpper = /[A-Z]/.test(pass);
    const hasLower = /[a-z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    const isLongEnough = pass.length >= 8;
    return hasUpper && hasLower && hasNumber && hasSpecial && isLongEnough;
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      if (authMode === 'register') {
        const codigoUpper = regCode.trim().toUpperCase();

        if (codigoUpper !== 'MAESTRIA-UG') {
          setErrorMsg("Código de registro inválido.");
          setLoading(false);
          return;
        }

        if (password !== confirmPassword) {
          setErrorMsg("Las contraseñas no coinciden.");
          setLoading(false);
          return;
        }

        if (!validatePassword(password)) {
          setErrorMsg("La contraseña no cumple con los requisitos de seguridad.");
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
           setIsSuccess(true);
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password,
        });

        if (error) throw error;

        if (data.user) {
          const role = data.user.user_metadata?.role;
          if (role !== 'profesor') {
            await supabase.auth.signOut();
            setErrorMsg("Esta cuenta pertenece a un Estudiante. Por favor, ingresa por el portal correspondiente.");
            setLoading(false);
            return;
          }
          router.push('/profesor');
        }

      }
    } catch (err: any) {
      setErrorMsg(err.message === "Failed to fetch" ? "Error de conexión: Verifica las credenciales en el servidor." : err.message);
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[var(--color-paper-cream)] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center animate-in zoom-in duration-500">
          <div className="text-8xl mb-6 animate-bounce">🎉</div>
          <h1 className="text-3xl font-bold text-[#2A5C82] mb-4">¡Felicidades!</h1>
          <p className="text-gray-600 text-lg mb-8">
            Tu cuenta de docente ha sido registrada con éxito. 
            <br/><br/>
            <span className="font-bold text-[#FF8C00]">Revisa tu correo electrónico</span> para confirmar tu cuenta y poder ingresar.
          </p>
          <Button 
            onClick={() => { setIsSuccess(false); setAuthMode('login'); }}
            className="w-full bg-[#2A5C82] hover:bg-blue-800 py-4 text-xl rounded-xl"
          >
            Volver al Inicio de Sesión
          </Button>
        </div>
      </div>
    );
  }

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
          <div className="text-6xl mb-4 mt-2 text-center flex justify-center">👨‍🏫</div>
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
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Nombre Completo</label>
              <input 
                type="text" required value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#2A5C82] outline-none"
                placeholder="Ej. Profesor Carlos"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Correo Electrónico</label>
            <input 
              type="email" required value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#2A5C82] outline-none"
              placeholder="profe@escuela.com"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-bold text-gray-700 mb-1">Contraseña</label>
            <input 
              type={showPassword ? "text" : "password"} required value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#2A5C82] outline-none"
              placeholder="••••••••"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-10 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? "👁️" : "🙈"}
            </button>
          </div>

          {authMode === 'login' && (
            <div className="text-right">
              <button 
                type="button" 
                onClick={() => router.push('/recuperar-password')}
                className="text-sm text-[#2A5C82] font-bold hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          )}

          {authMode === 'register' && (
            <>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Confirmar Contraseña</label>
                <input 
                  type={showPassword ? "text" : "password"} required value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#2A5C82] outline-none"
                  placeholder="••••••••"
                />
              </div>
              <div className="bg-blue-50 p-3 rounded-xl text-xs text-blue-700 space-y-1">
                <p className="font-bold">Requisitos de contraseña:</p>
                <ul className="list-disc pl-4">
                  <li className={password.length >= 8 ? "text-green-600" : ""}>Mínimo 8 caracteres</li>
                  <li className={/[A-Z]/.test(password) ? "text-green-600" : ""}>Una letra mayúscula</li>
                  <li className={/[a-z]/.test(password) ? "text-green-600" : ""}>Una letra minúscula</li>
                  <li className={/[0-9]/.test(password) ? "text-green-600" : ""}>Un número</li>
                  <li className={/[!@#$%^&*(),.?":{}|<>]/.test(password) ? "text-green-600" : ""}>Un carácter especial (!@#$%)</li>
                </ul>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Código Maestro</label>
                <input 
                  type="text" required value={regCode}
                  onChange={(e) => setRegCode(e.target.value.toUpperCase())}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#2A5C82] outline-none font-mono uppercase"
                  placeholder="EJ: MAESTRIA-UG"
                />
              </div>
            </>
          )}
          
          {errorMsg && <p className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-xl border border-red-100">{errorMsg}</p>}
          {successMsg && <p className="text-green-600 text-sm font-bold bg-green-50 p-3 rounded-xl border border-green-100">{successMsg}</p>}

          <Button type="submit" disabled={loading} className="w-full bg-[#2A5C82] hover:bg-blue-800 py-6 text-xl mt-6 shadow-md transition-all hover:-translate-y-1 rounded-xl">
            {loading ? 'Procesando...' : (authMode === 'login' ? 'Ingresar al Panel' : 'Crear Cuenta Docente')}
          </Button>

        </form>
      </div>
    </div>
  );
}
