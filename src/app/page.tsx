import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-[var(--color-paper-cream)] p-4">
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
            <span className="bg-[#FFD700] text-gray-900 px-4 py-2 rounded-full text-sm font-bold shadow-sm">Crea</span>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <Card className="w-full mx-auto shadow-xl border-t-4 border-t-[#2A5C82]">
            <CardContent className="p-8 flex flex-col gap-4">
              <div className="text-center space-y-2 mb-4">
                <h2 className="text-2xl font-bold text-[#2A5C82]">Ingreso de Estudiantes</h2>
                <p className="text-sm text-gray-500">Selecciona tu perfil de prueba</p>
              </div>
              
              <Link href="/dashboard?estudiante=mateo&grado=5" className="w-full">
                <Button className="w-full text-lg shadow-md flex justify-between px-6 bg-white border-2 border-[#2A5C82] text-[#2A5C82] hover:bg-blue-50">
                  <span className="flex items-center gap-2">👦 Mateo Rojas</span>
                  <span className="bg-[#2A5C82] text-white text-xs px-2 py-1 rounded-full">5to Básica</span>
                </Button>
              </Link>

              <Link href="/dashboard?estudiante=ana&grado=6" className="w-full">
                <Button className="w-full text-lg shadow-md flex justify-between px-6 bg-white border-2 border-[#4CAF50] text-[#4CAF50] hover:bg-green-50">
                  <span className="flex items-center gap-2">👧 Ana Gómez</span>
                  <span className="bg-[#4CAF50] text-white text-xs px-2 py-1 rounded-full">6to Básica</span>
                </Button>
              </Link>

              <Link href="/dashboard?estudiante=diego&grado=7" className="w-full">
                <Button className="w-full text-lg shadow-md flex justify-between px-6 bg-white border-2 border-[#FF8C00] text-[#FF8C00] hover:bg-orange-50">
                  <span className="flex items-center gap-2">👦 Diego Torres</span>
                  <span className="bg-[#FF8C00] text-white text-xs px-2 py-1 rounded-full">7mo Básica</span>
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="w-full mx-auto shadow-md border-t-4 border-t-gray-800">
            <CardContent className="p-6">
              <Link href="/profesor" className="w-full">
                <Button className="w-full text-lg shadow-md flex gap-2 bg-gray-800 hover:bg-gray-900 text-white">
                  👨‍🏫 Entrar al Panel Docente
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
