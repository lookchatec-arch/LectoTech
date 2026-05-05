"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function AccesoSecretoPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-700">
        
        <div className="p-10 text-center border-b border-gray-700">
          <div className="text-6xl mb-4">🕵️‍♂️</div>
          <h1 className="text-3xl font-bold text-white">Centro de Desarrollo</h1>
          <p className="text-gray-400 mt-2">Versión de Pruebas (Hub Secreto)</p>
        </div>

        <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-gray-700 p-8 rounded-2xl flex flex-col items-center text-center hover:bg-gray-600 transition-colors">
            <div className="text-5xl mb-4">👦</div>
            <h2 className="text-xl font-bold text-white mb-2">Pantalla de Estudiante</h2>
            <p className="text-gray-400 text-sm mb-6">Accede directamente al panel interactivo del estudiante.</p>
            <Button 
              onClick={() => router.push('/dashboard?estudiante=DevMode&grado=5')}
              className="w-full bg-[#4CAF50] hover:bg-green-600 py-4 text-lg shadow-md"
            >
              Entrar como Estudiante
            </Button>
          </div>

          <div className="bg-gray-700 p-8 rounded-2xl flex flex-col items-center text-center hover:bg-gray-600 transition-colors">
            <div className="text-5xl mb-4">👨‍🏫</div>
            <h2 className="text-xl font-bold text-white mb-2">Pantalla de Profesor</h2>
            <p className="text-gray-400 text-sm mb-6">Accede directamente al panel analítico del profesor.</p>
            <Button 
              onClick={() => router.push('/profesor')}
              className="w-full bg-[#2A5C82] hover:bg-blue-600 py-4 text-lg shadow-md"
            >
              Entrar como Profesor
            </Button>
          </div>

        </div>

        <div className="bg-gray-950 p-6 text-center">
          <Button 
            onClick={() => router.push('/')}
            className="bg-transparent border border-gray-600 text-gray-400 hover:text-white hover:border-gray-400 px-8 py-2"
          >
            Volver a la Portada Principal
          </Button>
        </div>
      </div>
    </div>
  );
}
