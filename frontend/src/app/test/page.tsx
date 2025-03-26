'use client';

import { useState, useEffect } from 'react';

interface Question {
  id: number;
  text: string;
  options: {
    value: number;
    label: string;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "¿Cómo te sientes en este momento?",
    options: [
      { value: 1, label: "Muy tranquilo" },
      { value: 2, label: "Relativamente tranquilo" },
      { value: 3, label: "Ligeramente ansioso" },
      { value: 4, label: "Ansioso" },
      { value: 5, label: "Muy ansioso" }
    ]
  },
  {
    id: 2,
    text: "¿Has tenido dificultades para dormir últimamente?",
    options: [
      { value: 1, label: "Ninguna dificultad" },
      { value: 2, label: "Ocasionalmente" },
      { value: 3, label: "A veces" },
      { value: 4, label: "Frecuentemente" },
      { value: 5, label: "Casi siempre" }
    ]
  },
  {
    id: 3,
    text: "¿Cómo manejas las situaciones estresantes?",
    options: [
      { value: 1, label: "Muy bien" },
      { value: 2, label: "Bien" },
      { value: 3, label: "Regular" },
      { value: 4, label: "Mal" },
      { value: 5, label: "Muy mal" }
    ]
  },
  {
    id: 4,
    text: "¿Te sientes fatigado o con falta de energía?",
    options: [
      { value: 1, label: "Nunca" },
      { value: 2, label: "Raramente" },
      { value: 3, label: "A veces" },
      { value: 4, label: "Frecuentemente" },
      { value: 5, label: "Casi siempre" }
    ]
  },
  {
    id: 5,
    text: "¿Tienes dificultad para concentrarte?",
    options: [
      { value: 1, label: "Nunca" },
      { value: 2, label: "Raramente" },
      { value: 3, label: "A veces" },
      { value: 4, label: "Frecuentemente" },
      { value: 5, label: "Casi siempre" }
    ]
  },
  {
    id: 6,
    text: "¿Experimentas palpitaciones o latidos cardíacos acelerados?",
    options: [
      { value: 1, label: "Nunca" },
      { value: 2, label: "Raramente" },
      { value: 3, label: "A veces" },
      { value: 4, label: "Frecuentemente" },
      { value: 5, label: "Casi siempre" }
    ]
  },
  {
    id: 7,
    text: "¿Sientes tensión muscular?",
    options: [
      { value: 1, label: "Nunca" },
      { value: 2, label: "Raramente" },
      { value: 3, label: "A veces" },
      { value: 4, label: "Frecuentemente" },
      { value: 5, label: "Casi siempre" }
    ]
  },
  {
    id: 8,
    text: "¿Tienes preocupaciones excesivas?",
    options: [
      { value: 1, label: "Nunca" },
      { value: 2, label: "Raramente" },
      { value: 3, label: "A veces" },
      { value: 4, label: "Frecuentemente" },
      { value: 5, label: "Casi siempre" }
    ]
  },
  {
    id: 9,
    text: "¿Experimentas sudoración excesiva?",
    options: [
      { value: 1, label: "Nunca" },
      { value: 2, label: "Raramente" },
      { value: 3, label: "A veces" },
      { value: 4, label: "Frecuentemente" },
      { value: 5, label: "Casi siempre" }
    ]
  },
  {
    id: 10,
    text: "¿Tienes dificultad para respirar?",
    options: [
      { value: 1, label: "Nunca" },
      { value: 2, label: "Raramente" },
      { value: 3, label: "A veces" },
      { value: 4, label: "Frecuentemente" },
      { value: 5, label: "Casi siempre" }
    ]
  },
  {
    id: 11,
    text: "¿Sientes temblores o escalofríos?",
    options: [
      { value: 1, label: "Nunca" },
      { value: 2, label: "Raramente" },
      { value: 3, label: "A veces" },
      { value: 4, label: "Frecuentemente" },
      { value: 5, label: "Casi siempre" }
    ]
  },
  {
    id: 12,
    text: "¿Tienes miedo a perder el control?",
    options: [
      { value: 1, label: "Nunca" },
      { value: 2, label: "Raramente" },
      { value: 3, label: "A veces" },
      { value: 4, label: "Frecuentemente" },
      { value: 5, label: "Casi siempre" }
    ]
  },
  {
    id: 13,
    text: "¿Experimentas mareos o sensación de desmayo?",
    options: [
      { value: 1, label: "Nunca" },
      { value: 2, label: "Raramente" },
      { value: 3, label: "A veces" },
      { value: 4, label: "Frecuentemente" },
      { value: 5, label: "Casi siempre" }
    ]
  },
  {
    id: 14,
    text: "¿Tienes dificultad para tomar decisiones?",
    options: [
      { value: 1, label: "Nunca" },
      { value: 2, label: "Raramente" },
      { value: 3, label: "A veces" },
      { value: 4, label: "Frecuentemente" },
      { value: 5, label: "Casi siempre" }
    ]
  },
  {
    id: 15,
    text: "¿Sientes irritabilidad?",
    options: [
      { value: 1, label: "Nunca" },
      { value: 2, label: "Raramente" },
      { value: 3, label: "A veces" },
      { value: 4, label: "Frecuentemente" },
      { value: 5, label: "Casi siempre" }
    ]
  },
  {
    id: 16,
    text: "¿Tienes miedo a morir?",
    options: [
      { value: 1, label: "Nunca" },
      { value: 2, label: "Raramente" },
      { value: 3, label: "A veces" },
      { value: 4, label: "Frecuentemente" },
      { value: 5, label: "Casi siempre" }
    ]
  },
  {
    id: 17,
    text: "¿Experimentas sensación de entumecimiento u hormigueo?",
    options: [
      { value: 1, label: "Nunca" },
      { value: 2, label: "Raramente" },
      { value: 3, label: "A veces" },
      { value: 4, label: "Frecuentemente" },
      { value: 5, label: "Casi siempre" }
    ]
  },
  {
    id: 18,
    text: "¿Tienes dificultad para relajarte?",
    options: [
      { value: 1, label: "Nunca" },
      { value: 2, label: "Raramente" },
      { value: 3, label: "A veces" },
      { value: 4, label: "Frecuentemente" },
      { value: 5, label: "Casi siempre" }
    ]
  },
  {
    id: 19,
    text: "¿Sientes que estás al borde de un ataque de nervios?",
    options: [
      { value: 1, label: "Nunca" },
      { value: 2, label: "Raramente" },
      { value: 3, label: "A veces" },
      { value: 4, label: "Frecuentemente" },
      { value: 5, label: "Casi siempre" }
    ]
  },
  {
    id: 20,
    text: "¿Tienes dificultad para tragar?",
    options: [
      { value: 1, label: "Nunca" },
      { value: 2, label: "Raramente" },
      { value: 3, label: "A veces" },
      { value: 4, label: "Frecuentemente" },
      { value: 5, label: "Casi siempre" }
    ]
  },
  {
    id: 21,
    text: "¿Sientes que las cosas no son reales o que estás separado de ti mismo?",
    options: [
      { value: 1, label: "Nunca" },
      { value: 2, label: "Raramente" },
      { value: 3, label: "A veces" },
      { value: 4, label: "Frecuentemente" },
      { value: 5, label: "Casi siempre" }
    ]
  }
];

export default function Test() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(0));
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);

  const handleStartTest = () => {
    setShowInstructions(false);
  };

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const totalScore = answers.reduce((acc, curr) => acc + curr, 0);
      setScore(totalScore);
      setShowResults(true);
      
      // Set cookie so middleware knows test is completed
      document.cookie = 'testCompleted=true; path=/; max-age=31536000'; // 1 year expiry
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const getResultMessage = (score: number) => {
    if (score <= 21) {
      return {
        title: "¡Excelente! Tu nivel de ansiedad es muy bajo.",
        description: "Mantienes un excelente control emocional y manejas bien las situaciones estresantes. Sigue practicando hábitos saludables para mantener este estado.",
        recommendations: [
          "Continúa con tus rutinas de autocuidado",
          "Mantén un estilo de vida equilibrado",
          "Practica mindfulness regularmente",
          "Comparte tus técnicas de manejo con otros"
        ]
      };
    }
    if (score <= 42) {
      return {
        title: "Bueno. Tu nivel de ansiedad es manejable.",
        description: "Aunque experimentas algunos síntomas de ansiedad, los manejas de manera efectiva. Podrías beneficiarte de algunas técnicas adicionales.",
        recommendations: [
          "Practica ejercicios de respiración profunda",
          "Establece rutinas de relajación diaria",
          "Mantén un diario de emociones",
          "Considera actividades físicas regulares"
        ]
      };
    }
    if (score <= 63) {
      return {
        title: "Moderado. Podrías beneficiarte de más apoyo.",
        description: "Presentas síntomas de ansiedad que podrían afectar tu bienestar. Es importante implementar estrategias de manejo más estructuradas.",
        recommendations: [
          "Aprende técnicas de relajación progresiva",
          "Establece límites saludables",
          "Practica la meditación guiada",
          "Considera hablar con un terapeuta"
        ]
      };
    }
    if (score <= 84) {
      return {
        title: "Alto. Considera buscar ayuda profesional.",
        description: "Tus niveles de ansiedad son significativos y podrían estar afectando tu calidad de vida. La ayuda profesional podría ser muy beneficiosa.",
        recommendations: [
          "Consulta con un profesional de la salud mental",
          "Implementa una rutina de autocuidado diaria",
          "Practica técnicas de manejo de crisis",
          "Considera un grupo de apoyo"
        ]
      };
    }
    return {
      title: "Muy alto. Te recomendamos buscar ayuda profesional inmediatamente.",
      description: "Tus niveles de ansiedad son muy elevados y podrían estar afectando significativamente tu bienestar. La ayuda profesional es importante en este momento.",
      recommendations: [
        "Busca ayuda profesional inmediatamente",
        "Comunica tu situación a seres queridos",
        "Practica técnicas de respiración de emergencia",
        "Considera una evaluación médica completa"
      ]
    };
  };

  const getResultColor = (score: number) => {
    if (score <= 21) return "text-green-500";
    if (score <= 42) return "text-blue-500";
    if (score <= 63) return "text-yellow-500";
    if (score <= 84) return "text-orange-500";
    return "text-red-500";
  };

  const getResultBackground = (score: number) => {
    if (score <= 21) return "from-green-500/10 to-emerald-500/10";
    if (score <= 42) return "from-blue-500/10 to-cyan-500/10";
    if (score <= 63) return "from-yellow-500/10 to-amber-500/10";
    if (score <= 84) return "from-orange-500/10 to-red-500/10";
    return "from-red-500/10 to-pink-500/10";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="relative">
          {/* Background decorative elements */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
            <div className="text-center mb-12">
              <div className="inline-block">
                <h1 className="text-5xl font-bold gradient-text mb-4 relative">
                  Test de Ansiedad
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                </h1>
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Este test te ayudará a evaluar tu nivel de ansiedad actual. Por favor, responde cada pregunta con sinceridad.
              </p>
            </div>

            {!showResults ? (
              showInstructions ? (
                <div className="space-y-8">
                  <div className="bg-gradient-to-br from-white to-blue-50/50 rounded-2xl p-8 shadow-xl border border-white/50 backdrop-blur-sm">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                      Test de Ansiedad de Beck (BAI)
                    </h2>
                    <div className="space-y-6 text-left max-w-2xl mx-auto">
                      <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                        <h3 className="text-lg font-semibold text-blue-800 mb-2">Información General</h3>
                        <p className="text-gray-600">El Inventario de Ansiedad de Beck (BAI) es un cuestionario de auto-evaluación que mide la gravedad de la ansiedad en adultos y adolescentes.</p>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-1">1</span>
                          <p className="text-gray-600">El test consta de 21 preguntas que evalúan diferentes síntomas de ansiedad.</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-1">2</span>
                          <p className="text-gray-600">Para cada pregunta, selecciona la opción que mejor describa cómo te has sentido durante la última semana, incluyendo hoy.</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-1">3</span>
                          <p className="text-gray-600">Responde con sinceridad, pensando en la frecuencia e intensidad de cada síntoma.</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-1">4</span>
                          <p className="text-gray-600">Puedes navegar entre las preguntas usando los botones "Anterior" y "Siguiente" para revisar o modificar tus respuestas.</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-1">5</span>
                          <p className="text-gray-600">Al finalizar, recibirás un análisis detallado de tu nivel de ansiedad y recomendaciones personalizadas basadas en tu puntuación.</p>
                        </div>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 mt-6">
                        <h3 className="text-lg font-semibold text-yellow-800 mb-2">Nota Importante</h3>
                        <p className="text-gray-600">Este test es una herramienta de evaluación y no sustituye el diagnóstico profesional. Si tus síntomas son severos o persistentes, te recomendamos consultar con un profesional de la salud mental.</p>
                      </div>
                    </div>
                    <div className="mt-8 text-center">
                      <button
                        onClick={handleStartTest}
                        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      >
                        Comenzar Test
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-12">
                  {/* Progress Bar */}
                  <div className="relative h-6">
                    <div className="absolute top-0 left-0 w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                      />
                    </div>
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                      <span className="text-sm font-medium text-gray-600">
                        Pregunta {currentQuestion + 1} de {questions.length}
                      </span>
                    </div>
                  </div>

                  {/* Question Card */}
                  <div className="bg-gradient-to-br from-white to-blue-50/50 rounded-2xl p-8 shadow-xl border border-white/50 backdrop-blur-sm">
                    <div className="flex justify-between items-center mb-8">
                      <button
                        onClick={handlePrevious}
                        disabled={currentQuestion === 0}
                        className={`px-6 py-2 rounded-full transition-all duration-300 flex items-center gap-2 transform hover:scale-105 ${
                          currentQuestion === 0
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-blue-600 hover:bg-blue-50 border border-blue-200 shadow-md'
                        }`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Anterior
                      </button>
                      <button
                        onClick={handleNext}
                        disabled={answers[currentQuestion] === 0}
                        className={`px-6 py-2 rounded-full transition-all duration-300 flex items-center gap-2 transform hover:scale-105 ${
                          answers[currentQuestion] === 0
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md'
                        }`}
                      >
                        {currentQuestion === questions.length - 1 ? 'Finalizar' : 'Siguiente'}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>

                    <div>
                      <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center relative">
                        {questions[currentQuestion].text}
                        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                      </h2>
                      <div className="grid gap-4">
                        {questions[currentQuestion].options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleAnswer(option.value)}
                            className={`p-6 rounded-xl border-2 transition-all duration-300 text-left hover:shadow-lg transform hover:-translate-y-1 ${
                              answers[currentQuestion] === option.value
                                ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-xl scale-[1.02]'
                                : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50/50'
                            }`}
                          >
                            <span className="text-lg flex items-center gap-3">
                              <span className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                answers[currentQuestion] === option.value
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-gray-100 text-gray-500'
                              }`}>
                                {String.fromCharCode(65 + index)}
                              </span>
                              {option.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            ) : (
              <div className="text-center space-y-8 relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${getResultBackground(score)} rounded-3xl blur-3xl`}></div>
                <div className="relative">
                  <div className={`text-7xl font-bold ${getResultColor(score)} mb-4 animate-fade-in`}>
                    {score} / {questions.length * 5}
                  </div>
                </div>
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-800 animate-fade-in-up">
                    {getResultMessage(score).title}
                  </h2>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-up">
                    {getResultMessage(score).description}
                  </p>
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4 animate-fade-in-up">
                      Recomendaciones:
                    </h3>
                    <ul className="space-y-3 max-w-xl mx-auto text-left animate-fade-in-up">
                      {getResultMessage(score).recommendations.map((rec, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-600">
                          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <button
                  onClick={() => window.location.href = '/dashboard'}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 animate-fade-in-up"
                >
                  Ir al Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 