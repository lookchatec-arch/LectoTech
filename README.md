# LectoTech

## 📌 Objetivo de la Aplicación
LectoTech es una plataforma digital educativa integral diseñada para fortalecer las habilidades de lectoescritura en estudiantes de Educación General Básica (5to a 7mo grado). La aplicación utiliza un enfoque neuroeducativo con psicología del color para reducir la fatiga visual, aumentar la motivación y fomentar el aprendizaje interactivo a través de módulos gamificados (juegos, lectura y talleres de escritura).

## 🏗️ Arquitectura
La aplicación sigue una arquitectura moderna Cliente-Servidor (Client-Server) basada en componentes y orientada al Server-Side Rendering (SSR) y Static Site Generation (SSG) gracias a Next.js.
- **Frontend (Cliente):** Interfaz de usuario responsiva e interactiva construida con React y Tailwind CSS, con ruteo de Next.js (App Router).
- **Backend as a Service (BaaS):** Supabase maneja la autenticación, base de datos (PostgreSQL), almacenamiento de archivos y políticas de seguridad (RLS).
- **Despliegue Continua (Hostinger / GitHub):** El repositorio de GitHub está configurado para permitir el despliegue automático hacia plataformas como Hostinger, de modo que cada cambio local subido a GitHub se refleje automáticamente en línea.

## 🛠️ Tecnologías Utilizadas
- **Framework Principal:** [Next.js](https://nextjs.org/) (React)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Base de Datos & Backend:** [Supabase](https://supabase.com/) (PostgreSQL)
- **Lenguaje:** TypeScript / JavaScript
- **Control de Versiones:** Git & GitHub

## 🚀 Cómo Configurar y Ejecutar Localmente

### 1. Prerrequisitos
- [Node.js](https://nodejs.org/) (versión 18 o superior)
- Git instalado en tu sistema
- Una cuenta y proyecto en [Supabase](https://supabase.com/)

### 2. Clonar el Repositorio
```bash
git clone https://github.com/lookchatec-arch/LectoTech.git
cd LectoTech
```

### 3. Instalar Dependencias
```bash
npm install
```

### 4. Configurar Variables de Entorno
Crea un archivo `.env.local` en la raíz del proyecto (o usa el que ya viene configurado) y agrega tus credenciales de Supabase:
```env
NEXT_PUBLIC_SUPABASE_URL=tu-url-de-proyecto
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
```

### 5. Iniciar el Servidor de Desarrollo
```bash
npm run dev
```
Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## 🤝 Cómo Contribuir o Replicar
1. Haz un **Fork** del repositorio.
2. Crea una nueva rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commits descriptivos (`git commit -m 'Añade nueva funcionalidad X'`).
4. Sube los cambios a tu rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un **Pull Request** para revisión.

¡Toda contribución para mejorar la experiencia educativa es bienvenida!
