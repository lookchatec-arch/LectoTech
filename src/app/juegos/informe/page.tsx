"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

const ESTRUCTURA_INFORME = [
  "Título",
  "Introducción",
  "Materiales",
  "Procedimiento",
  "Resultados",
  "Conclusiones"
];

export default function InformePage() {
  const router = useRouter();
  const [parts, setParts] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    setParts([...ESTRUCTURA_INFORME].sort(() => Math.random() - 0.5));
  }, []);

  const movePart = (from: number, to: number) => {
    const newParts = [...parts];
    const [moved] = newParts.splice(from, 1);
    newParts.splice(to, 0, moved);
    setParts(newParts);
  };

  const check = () => {
    const ok = parts.every((p, i) => p === ESTRUCTURA_INFORME[i]);
    if (ok) setFinished(true);
    else alert("Revisa el orden, ¡tú puedes!");
  };

  if (finished) {
    return (
      <div className="min-h-screen bg-amber-50 p-8 flex items-center justify-center">
        <Card className="max-w-md w-full p-12 text-center rounded-[3rem] shadow-2xl border-4 border-white">
          <div className="text-8xl mb-6">🔬</div>
          <h2 className="text-3xl font-black text-amber-600 mb-4">¡Científico Pro!</h2>
          <p className="text-xl text-gray-600 mb-8">Has estructurado el informe de investigación perfectamente.</p>
          <Button onClick={() => router.push('/dashboard')} className="w-full bg-amber-600 hover:bg-amber-700 py-6 text-xl rounded-2xl">
            Volver al Mapa
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <header className="max-w-4xl mx-auto mb-12 flex justify-between items-center">
        <button onClick={() => router.push('/dashboard')} className="text-amber-600 font-black bg-white px-4 py-2 rounded-xl shadow-sm">← Salir</button>
        <h1 className="text-2xl font-black text-gray-800">Laboratorio de Informes 🔬</h1>
      </header>
      <main className="max-w-xl mx-auto space-y-3">
        <p className="text-center text-gray-500 font-bold mb-8">Ordena las partes de un informe científico:</p>
        {parts.map((p, i) => (
          <div key={p} className="bg-white p-5 rounded-2xl shadow-sm flex items-center gap-4 border-2 border-transparent hover:border-amber-300 transition-all">
            <div className="flex flex-col">
               <button onClick={() => i > 0 && movePart(i, i-1)} className="text-gray-300 hover:text-amber-500" disabled={i===0}>▲</button>
               <button onClick={() => i < parts.length - 1 && movePart(i, i+1)} className="text-gray-300 hover:text-amber-500" disabled={i===parts.length-1}>▼</button>
            </div>
            <p className="font-bold text-gray-700">{p}</p>
          </div>
        ))}
        <Button onClick={check} className="w-full bg-amber-600 hover:bg-amber-700 py-8 text-2xl font-black rounded-[2rem] mt-10 shadow-xl">
          ¡Verificar Estructura! 🧪
        </Button>
      </main>
    </div>
  );
}
