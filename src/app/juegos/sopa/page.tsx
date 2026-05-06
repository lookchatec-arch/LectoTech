"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter, useSearchParams } from 'next/navigation';

const TEMAS = {
  nanas: ['ARRULLO', 'CUNA', 'SUEÑO', 'NANA', 'DUERME', 'CANTO', 'LUNA', 'NOCHE'],
  general: ['LECTURA', 'VERBO', 'SINTAXIS', 'FONEMA', 'POESIA']
};

const GRID_SIZE = 10;

type Point = { r: number, c: number };

export default function SopaPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tema = searchParams.get('tema') || 'general';
  const PALABRAS = (TEMAS as any)[tema] || TEMAS.general;

  const [grid, setGrid] = useState<string[][]>([]);
  const [encontradas, setEncontradas] = useState<string[]>([]);
  const [seleccionInicio, setSeleccionInicio] = useState<Point | null>(null);
  const [celdasResaltadas, setCeldasResaltadas] = useState<Point[]>([]); // Celdas que forman palabras encontradas

  const generarSopa = useCallback(() => {
    let nuevoGrid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''));
    let celdasExito: Point[] = [];

    // Función auxiliar para colocar palabra
    const colocar = (palabra: string) => {
      const direcciones = [[0, 1], [1, 0], [1, 1]]; // Horizontal, Vertical, Diagonal
      let colocada = false;
      let intentos = 0;

      while (!colocada && intentos < 100) {
        intentos++;
        const dir = direcciones[Math.floor(Math.random() * direcciones.length)];
        const rStart = Math.floor(Math.random() * GRID_SIZE);
        const cStart = Math.floor(Math.random() * GRID_SIZE);

        let rEnd = rStart + dir[0] * (palabra.length - 1);
        let cEnd = cStart + dir[1] * (palabra.length - 1);

        if (rEnd >= 0 && rEnd < GRID_SIZE && cEnd >= 0 && cEnd < GRID_SIZE) {
          let choca = false;
          for (let i = 0; i < palabra.length; i++) {
            const charActual = nuevoGrid[rStart + dir[0] * i][cStart + dir[1] * i];
            if (charActual !== '' && charActual !== palabra[i]) {
              choca = true;
              break;
            }
          }

          if (!choca) {
            for (let i = 0; i < palabra.length; i++) {
              nuevoGrid[rStart + dir[0] * i][cStart + dir[1] * i] = palabra[i];
            }
            colocada = true;
          }
        }
      }
    };

    PALABRAS.forEach(colocar);

    // Rellenar vacíos
    const alfabeto = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (nuevoGrid[r][c] === '') {
          nuevoGrid[r][c] = alfabeto[Math.floor(Math.random() * alfabeto.length)];
        }
      }
    }

    setGrid(nuevoGrid);
    setEncontradas([]);
    setCeldasResaltadas([]);
    setSeleccionInicio(null);
  }, []);

  useEffect(() => {
    generarSopa();
  }, [generarSopa]);

  const handleCellClick = (r: number, c: number) => {
    if (!seleccionInicio) {
      setSeleccionInicio({ r, c });
    } else {
      // Calcular línea
      const rDiff = r - seleccionInicio.r;
      const cDiff = c - seleccionInicio.c;
      const steps = Math.max(Math.abs(rDiff), Math.abs(cDiff));
      
      const rStep = rDiff === 0 ? 0 : rDiff / steps;
      const cStep = cDiff === 0 ? 0 : cDiff / steps;

      // Verificar si es una línea recta válida (horizontal, vertical o diagonal perfecta)
      if (Math.abs(rStep) === 1 || rStep === 0) {
        if (Math.abs(cStep) === 1 || cStep === 0) {
          let word = "";
          let lineCells: Point[] = [];
          for (let i = 0; i <= steps; i++) {
            const currR = seleccionInicio.r + rStep * i;
            const currC = seleccionInicio.c + cStep * i;
            word += grid[currR][currC];
            lineCells.push({ r: currR, c: currC });
          }

          // Verificar si coincide con alguna palabra (al derecho o al revés)
          const wordRev = word.split('').reverse().join('');
          const foundWord = PALABRAS.find(p => p === word || p === wordRev);

          if (foundWord && !encontradas.includes(foundWord)) {
            setEncontradas([...encontradas, foundWord]);
            setCeldasResaltadas([...celdasResaltadas, ...lineCells]);
          }
        }
      }
      setSeleccionInicio(null);
    }
  };

  const isResaltada = (r: number, c: number) => celdasResaltadas.some(p => p.r === r && p.c === c);
  const isSeleccionInicio = (r: number, c: number) => seleccionInicio?.r === r && seleccionInicio?.c === c;

  return (
    <div className="p-4 md:p-8 w-full max-w-5xl mx-auto min-h-screen">
      <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <button onClick={() => router.push(`/dashboard`)} className="text-[#2A5C82] hover:text-blue-800 mb-2 font-bold flex items-center gap-2">
            ← Volver al Mapa
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-[#FF8C00]">Sopa de Letras 🔍</h1>
          <p className="text-gray-600 mt-2">Encuentra las palabras ocultas. Toca la primera y luego la última letra.</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500 font-bold uppercase">Progreso</p>
          <p className="text-xl font-bold text-[#4CAF50]">{encontradas.length} / {PALABRAS.length}</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 flex justify-center">
          <Card className="bg-white shadow-xl border-t-4 border-t-[#FF8C00] inline-block p-4">
            <div 
              className="grid gap-1 md:gap-2" 
              style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}
            >
              {grid.map((row, r) => 
                row.map((letra, c) => (
                  <button
                    key={`${r}-${c}`}
                    onClick={() => handleCellClick(r, c)}
                    className={`
                      w-8 h-8 md:w-12 md:h-12 flex items-center justify-center text-lg md:text-xl font-bold rounded-md transition-all
                      ${isResaltada(r, c) ? 'bg-[#FFD700] text-amber-900 scale-105 shadow-inner' : 
                        isSeleccionInicio(r, c) ? 'bg-[#2A5C82] text-white ring-4 ring-blue-300 scale-110' : 
                        'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                    `}
                  >
                    {letra}
                  </button>
                ))
              )}
            </div>
          </Card>
        </div>

        <div>
          <Card className="bg-white shadow-md border-none">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-[#2A5C82] mb-4">Palabras a buscar:</h2>
              <ul className="space-y-3">
                {PALABRAS.map(palabra => (
                  <li 
                    key={palabra} 
                    className={`text-lg font-bold p-3 rounded-lg flex items-center gap-2 transition-all
                      ${encontradas.includes(palabra) ? 'bg-[#4CAF50]/20 text-[#4CAF50] line-through decoration-2' : 'bg-gray-50 text-gray-700'}
                    `}
                  >
                    {encontradas.includes(palabra) && <span>✔️</span>}
                    {palabra}
                  </li>
                ))}
              </ul>
              
              {encontradas.length === PALABRAS.length && (
                <div className="mt-8 text-center animate-in fade-in slide-in-from-bottom-4">
                  <div className="text-5xl mb-2">🎉</div>
                  <h3 className="text-xl font-bold text-[#FF8C00] mb-4">¡Todas encontradas!</h3>
                  <Button className="w-full bg-[#FF8C00] hover:bg-orange-600 shadow-md py-6 text-lg" onClick={generarSopa}>
                    Jugar de Nuevo
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
