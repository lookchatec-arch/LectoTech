import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const fallbacks = [
  "¿Sabías que la letra 'E' es la vocal más utilizada en el idioma español? 🤓",
  "¿Sabías que el español es el segundo idioma más hablado del mundo por número de hablantes nativos? 🌍",
  "¡Ojo con la tilde! 'Pérdida' significa extraviar algo, pero 'perdida' puede significar estar despistada. ⚠️",
  "¿Sabías que la palabra 'reconocer' se lee igual de izquierda a derecha que de derecha a izquierda? ¡Se llama palíndromo! 🔄",
  "El punto y coma (;) sirve para hacer una pausa más larga que la coma, pero más corta que el punto. ¡Úsalo para unir ideas! ⏳",
  "¿Sabías que la palabra 'murciélago' contiene las cinco vocales? ¡Búscala bien! 🦇"
];

export async function GET() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === '' || apiKey === 'tu-api-key-de-gemini') {
    // Si no hay API key configurada, retorna un fallback aleatorio
    const randomTip = fallbacks[Math.floor(Math.random() * fallbacks.length)];
    return NextResponse.json({ tip: randomTip });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = "Genera un dato curioso corto, lúdico y muy amigable (estilo '¿Sabías que...?') para niños de 10 a 12 años sobre ortografía, gramática, o la lectura en español. No uses introducciones, solo entrega el dato curioso y acompáñalo de un emoji al final.";

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();

    return NextResponse.json({ tip: text });
  } catch (error) {
    console.error("Error generating AI content:", error);
    const randomTip = fallbacks[Math.floor(Math.random() * fallbacks.length)];
    return NextResponse.json({ tip: randomTip });
  }
}
