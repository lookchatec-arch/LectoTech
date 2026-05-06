"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export default function LogotiposPage() {
  const router = useRouter();
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  const brands = [
    { id: 'eco', name: 'EcoMundo', icon: '🌍', mission: 'Cuidar el planeta con tecnología limpia.', color: 'bg-green-500' },
    { id: 'space', name: 'AstroTech', icon: '🚀', mission: 'Llevar la educación a las estrellas.', color: 'bg-blue-600' },
    { id: 'food', name: 'NutriSano', icon: '🍎', mission: 'Alimentación inteligente para niños.', color: 'bg-red-500' }
  ];

  const elements = [
    { id: 'e1', type: 'font', value: 'Moderna y Recta', desc: 'Transmite tecnología y orden.' },
    { id: 'e2', type: 'font', value: 'Cursiva y Suave', desc: 'Transmite cercanía y naturaleza.' },
    { id: 'e3', type: 'color', value: 'Azul Eléctrico', desc: 'Confianza y profesionalismo.' },
    { id: 'e4', type: 'color', value: 'Verde Hoja', desc: 'Vida, esperanza y ecología.' }
  ];

  const [choices, setChoices] = useState<any>({ font: null, color: null });

  const handleBrandSelect = (brand: string) => {
    setSelectedBrand(brand);
    setStep(2);
  };

  const handleElementSelect = (type: 'font' | 'color', value: string) => {
    setChoices({ ...choices, [type]: value });
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] p-4 md:p-8 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white rounded-[3rem] shadow-2xl overflow-hidden border-8 border-white relative">
        
        {/* Sidebar Decorativo */}
        <div className="absolute top-0 right-0 w-32 h-full bg-blue-50/50 pointer-events-none -z-10"></div>

        <div className="p-8 md:p-12">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h1 className="text-4xl font-black text-[#2A5C82] tracking-tight">TALLER DE LOGOS 🎨</h1>
              <p className="text-gray-400 font-bold uppercase text-xs tracking-widest mt-1">Identidad Visual y Comunicación</p>
            </div>
            <button onClick={() => router.back()} className="bg-gray-100 hover:bg-gray-200 p-3 rounded-2xl transition-all font-black">SALIR</button>
          </div>

          {step === 1 && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <h2 className="text-2xl font-bold text-gray-700 text-center">Paso 1: Elige tu marca para rediseñar</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {brands.map((brand) => (
                  <button
                    key={brand.id}
                    onClick={() => handleBrandSelect(brand.id)}
                    className="p-8 rounded-[2.5rem] bg-white border-4 border-gray-50 hover:border-blue-400 hover:shadow-xl transition-all group flex flex-col items-center text-center gap-4"
                  >
                    <div className={`w-20 h-20 rounded-3xl ${brand.color} text-white flex items-center justify-center text-4xl shadow-lg group-hover:scale-110 transition-transform`}>
                      {brand.icon}
                    </div>
                    <h3 className="text-xl font-black text-[#2A5C82]">{brand.name}</h3>
                    <p className="text-sm text-gray-500 font-medium">{brand.mission}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-4 bg-blue-50 p-6 rounded-3xl">
                <div className="text-4xl">💡</div>
                <p className="text-blue-800 font-bold">
                  Estás diseñando para <strong>{brands.find((b: any) => b.id === selectedBrand)?.name}</strong>. 
                  Elige elementos que comuniquen su misión: <em>"{brands.find((b: any) => b.id === selectedBrand)?.mission}"</em>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Tipografía */}
                <div className="space-y-4">
                  <h3 className="font-black text-gray-400 uppercase text-xs tracking-widest">Elige la Tipografía</h3>
                  <div className="space-y-3">
                    {elements.filter(e => e.type === 'font').map((e) => (
                      <button
                        key={e.id}
                        onClick={() => handleElementSelect('font', e.value)}
                        className={`w-full p-6 rounded-2xl border-2 text-left transition-all ${choices.font === e.value ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:border-blue-200'}`}
                      >
                        <p className="font-black text-lg text-gray-800">{e.value}</p>
                        <p className="text-sm text-gray-500">{e.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color */}
                <div className="space-y-4">
                  <h3 className="font-black text-gray-400 uppercase text-xs tracking-widest">Elige el Color</h3>
                  <div className="space-y-3">
                    {elements.filter(e => e.type === 'color').map((e) => (
                      <button
                        key={e.id}
                        onClick={() => handleElementSelect('color', e.value)}
                        className={`w-full p-6 rounded-2xl border-2 text-left transition-all ${choices.color === e.value ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:border-blue-200'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full ${e.value === 'Azul Eléctrico' ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                          <p className="font-black text-lg text-gray-800">{e.value}</p>
                        </div>
                        <p className="text-sm text-gray-500">{e.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <Button 
                disabled={!choices.font || !choices.color}
                onClick={() => setStep(3)}
                className="w-full bg-[#2A5C82] hover:bg-blue-900 py-6 text-xl rounded-2xl shadow-xl mt-8"
              >
                Ver Resultado Final ✨
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="text-center space-y-8 animate-in zoom-in duration-500 py-8">
               <h2 className="text-3xl font-black text-[#2A5C82]">¡Tu Diseño Está Listo!</h2>
               
               <div className="bg-white p-12 rounded-[4rem] shadow-2xl border-8 border-gray-50 inline-block relative overflow-hidden group">
                  <div className={`absolute inset-0 opacity-10 ${choices.color === 'Azul Eléctrico' ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                  <div className="relative z-10 space-y-4">
                    <div className="text-8xl mb-4 group-hover:scale-125 transition-transform duration-500">
                      {brands.find((b: any) => b.id === selectedBrand)?.icon}
                    </div>
                    <h3 className={`text-5xl font-black tracking-tighter ${choices.font === 'Moderna y Recta' ? 'font-mono uppercase' : 'italic'} ${choices.color === 'Azul Eléctrico' ? 'text-blue-600' : 'text-green-600'}`}>
                      {brands.find((b: any) => b.id === selectedBrand)?.name}
                    </h3>
                  </div>
               </div>

               <div className="max-w-md mx-auto bg-gray-50 p-6 rounded-3xl border-2 border-dashed border-gray-200">
                  <p className="text-gray-600 font-medium italic">
                    "Has elegido una tipografía <strong>{choices.font}</strong> combinada con el color <strong>{choices.color}</strong>. 
                    Esta combinación es perfecta para representar {brands.find((b: any) => b.id === selectedBrand)?.name}."
                  </p>
               </div>

               <div className="flex gap-4">
                 <Button onClick={() => setStep(1)} className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 py-4 rounded-2xl font-bold">Crear Otro</Button>
                 <Button onClick={() => router.back()} className="flex-1 bg-[#4CAF50] hover:bg-green-600 py-4 rounded-2xl font-bold">Finalizar Taller</Button>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
