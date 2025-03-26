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
    if (score <= 21) return "¡Excelente! Tu nivel de ansiedad es muy bajo.";
    if (score <= 42) return "Bueno. Tu nivel de ansiedad es manejable.";
    if (score <= 63) return "Moderado. Podrías beneficiarte de algunas técnicas de relajación.";
    if (score <= 84) return "Alto. Considera hablar con un profesional.";
    return "Muy alto. Te recomendamos buscar ayuda profesional.";
  };

  const getResultColor = (score: number) => {
    if (score <= 21) return "text-green-500";
    if (score <= 42) return "text-blue-500";
    if (score <= 63) return "text-yellow-500";
    if (score <= 84) return "text-orange-500";
    return "text-red-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-8 gradient-text">
            Test de Ansiedad
          </h1>

          {!showResults ? (
            <div className="space-y-8">
              <div className="relative">
                <div className="absolute top-0 left-0 w-full h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between mt-4">
                  {questions.map((_, index) => (
                    <div 
                      key={index}
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                        index < currentQuestion 
                          ? 'bg-green-500 text-white' 
                          : index === currentQuestion 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-200'
                      }`}
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <div className="flex justify-between items-center mb-6">
                  <button
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className={`px-4 py-2 rounded-lg ${
                      currentQuestion === 0
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    Anterior
                  </button>
                  <span className="text-sm text-gray-500">
                    Pregunta {currentQuestion + 1} de {questions.length}
                  </span>
                  <button
                    onClick={handleNext}
                    disabled={answers[currentQuestion] === 0}
                    className={`px-4 py-2 rounded-lg ${
                      answers[currentQuestion] === 0
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    {currentQuestion === questions.length - 1 ? 'Finalizar' : 'Siguiente'}
                  </button>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-6">
                    {questions[currentQuestion].text}
                  </h2>
                  <div className="grid gap-4">
                    {questions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(option.value)}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                          answers[currentQuestion] === option.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-6">
              <div className={`text-4xl font-bold ${getResultColor(score)}`}>
                {score} / {questions.length * 5}
              </div>
              <p className="text-xl">{getResultMessage(score)}</p>
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-200"
              >
                Ir al Dashboard
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 