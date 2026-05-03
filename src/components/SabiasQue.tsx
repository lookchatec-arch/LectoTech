"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';

export function SabiasQue() {
  const [tip, setTip] = useState<string>("Cargando un dato genial...");
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTip = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai/sabiasque');
      const data = await res.json();
      setTip(data.tip);
    } catch (error) {
      setTip("¿Sabías que la curiosidad es el motor del aprendizaje? ¡Sigue explorando! 🚀");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTip();
  }, []);

  return (
    <Card className="bg-gradient-to-r from-[#FFD700] to-[#FFEB3B] border-none shadow-md mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden relative">
      {/* Decoración de fondo */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 text-6xl opacity-10 rotate-12">🧠</div>
      
      <CardContent className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
        <div className="flex items-start md:items-center gap-4">
          <div className="text-4xl md:text-5xl animate-bounce origin-bottom">💡</div>
          <div>
            <h3 className="font-extrabold text-amber-800 text-lg md:text-xl uppercase tracking-wider">¡Sabías qué!</h3>
            <p className="text-gray-900 font-bold text-md md:text-lg mt-1">
              {loading ? "Conectando con la supercomputadora..." : tip}
            </p>
          </div>
        </div>
        <button 
          onClick={fetchTip}
          className="bg-amber-600/20 hover:bg-amber-600/40 text-amber-900 p-3 rounded-full transition-colors flex-shrink-0"
          title="Otro dato curioso"
          disabled={loading}
        >
          {loading ? '⏳' : '🔄 Dame otro'}
        </button>
      </CardContent>
    </Card>
  );
}
