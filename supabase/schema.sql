-- Esquema Inicial para LectoTech

-- Habilitar extensión UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla de Perfiles (Se llena con triggers desde auth.users o manualmente)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  role TEXT NOT NULL CHECK (role IN ('teacher', 'student')),
  name TEXT NOT NULL,
  avatar_url TEXT,
  class_code TEXT, -- Usado por estudiantes para unirse a una clase
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Tabla de Clases
CREATE TABLE public.classes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  teacher_id UUID REFERENCES public.profiles(id) NOT NULL,
  code TEXT UNIQUE NOT NULL, -- Ej: LECTO-5A
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Tabla de Actividades (Juegos, lecturas creadas por profesor)
CREATE TABLE public.activities (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  class_id UUID REFERENCES public.classes(id) NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('reading', 'quiz', 'verbs', 'synonyms', 'game')),
  title TEXT NOT NULL,
  content JSONB NOT NULL, -- Datos específicos del juego/lectura
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Tabla de Progreso / Estadísticas del Estudiante
CREATE TABLE public.student_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id UUID REFERENCES public.profiles(id) NOT NULL,
  activity_type TEXT NOT NULL, -- Ej: 'parejas_sinonimos', 'lectura_volcan'
  score INTEGER NOT NULL,
  time_spent INTEGER, -- En segundos (opcional)
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_progress ENABLE ROW LEVEL SECURITY;

-- Políticas de Seguridad Rápidas (Permisivas para el MVP)
CREATE POLICY "Permitir lectura publica" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Permitir escritura de perfiles autenticados" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Permitir update propio" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Ver clases" ON public.classes FOR SELECT USING (true);
CREATE POLICY "Profesor crea clases" ON public.classes FOR INSERT WITH CHECK (true);

CREATE POLICY "Ver progreso" ON public.student_progress FOR SELECT USING (true);
CREATE POLICY "Crear progreso" ON public.student_progress FOR INSERT WITH CHECK (true);
CREATE POLICY "Ver actividades" ON public.activities FOR SELECT USING (true);
CREATE POLICY "Crear actividades" ON public.activities FOR INSERT WITH CHECK (true);
