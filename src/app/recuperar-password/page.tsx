"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { supabase } from "@/lib/supabaseClient";

export default function RecuperarPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/actualizar-password`,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Se ha enviado un enlace de recuperación a tu correo electrónico.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[var(--color-paper-cream)] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border-t-8 border-t-[#FF8C00]">
        <button 
          onClick={() => router.back()}
          className="text-gray-400 hover:text-gray-700 font-bold flex items-center gap-1 mb-6"
        >
          ← Volver
        </button>
        
        <h1 className="text-2xl font-bold text-[#2A5C82] mb-2 text-center">Recuperar Contraseña</h1>
        <p className="text-gray-500 text-sm text-center mb-8">
          Ingresa tu correo y te enviaremos un enlace para que crees una nueva clave.
        </p>

        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Tu Correo Electrónico</label>
            <input 
              type="email" required value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#FF8C00] outline-none"
              placeholder="ejemplo@correo.com"
            />
          </div>

          {error && <p className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-xl">{error}</p>}
          {message && <p className="text-green-600 text-sm font-bold bg-green-50 p-3 rounded-xl">{message}</p>}

          <Button type="submit" disabled={loading} className="w-full bg-[#FF8C00] hover:bg-orange-600 py-4 text-xl">
            {loading ? 'Enviando...' : 'Enviar Enlace'}
          </Button>
        </form>
      </div>
    </div>
  );
}
