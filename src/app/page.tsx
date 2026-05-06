"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-[var(--color-paper-cream)] p-4 relative">
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
                onClick={() => router.push('/estudiante')}
                className="w-full text-xl py-6 shadow-md bg-[#4CAF50] hover:bg-green-600 hover:-translate-y-1 transition-all text-white rounded-2xl flex items-center justify-center gap-3 font-bold border-none"
              >
                <span className="text-3xl">👦</span> Soy Estudiante
              </Button>

              <Button 
                onClick={() => router.push('/profesor-login')}
                className="w-full text-xl py-6 shadow-md bg-[#2A5C82] hover:bg-blue-800 hover:-translate-y-1 transition-all text-white rounded-2xl flex items-center justify-center gap-3"
              >
                <span className="text-3xl">👨‍🏫</span> Soy Profesor
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Botón oculto para desarrolladores en una esquina */}
      <button 
        onClick={() => router.push('/acceso-secreto')}
        className="absolute bottom-4 right-4 w-10 h-10 rounded-full opacity-10 hover:opacity-100 bg-gray-900 text-white flex items-center justify-center transition-opacity"
        title="Hub de Desarrollo"
      >
        <span className="text-sm">🧪</span>
      </button>
    </div>
  );
}
