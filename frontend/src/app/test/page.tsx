"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Definición de tipos para las preguntas y respuestas
interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    value: number;
  }[];
}

const BeckAnxietyTest: React.FC = () => {
  const router = useRouter();
  // Preguntas actualizadas del Test de Ansiedad de Beck
  const beckAnxietyQuestions: Question[] = [
    {
      id: 1,
      text: "Torpe o entumecido",
      options: [
        { text: "Nada", value: 0 },
        { text: "Ligeramente", value: 1 },
        { text: "Moderadamente", value: 2 },
        { text: "Severamente", value: 3 }
      ]
    },
    {
      id: 2,
      text: "Acalorado",
      options: [
        { text: "Nada", value: 0 },
        { text: "Ligeramente", value: 1 },
        { text: "Moderadamente", value: 2 },
        { text: "Severamente", value: 3 }
      ]
    },
    {
      id: 3,
      text: "Con temblor en las piernas",
      options: [
        { text: "Nada", value: 0 },
        { text: "Ligeramente", value: 1 },
        { text: "Moderadamente", value: 2 },
        { text: "Severamente", value: 3 }
      ]
    },
    {
      id: 4,
      text: "Incapaz de relajarse",
      options: [
        { text: "Nada", value: 0 },
        { text: "Ligeramente", value: 1 },
        { text: "Moderadamente", value: 2 },
        { text: "Severamente", value: 3 }
      ]
    },
    {
      id: 5,
      text: "Con temor a que ocurra lo peor",
      options: [
        { text: "Nada", value: 0 },
        { text: "Ligeramente", value: 1 },
        { text: "Moderadamente", value: 2 },
        { text: "Severamente", value: 3 }
      ]
    },
    {
      id: 6,
      text: "Mareado, o que se le va la cabeza",
      options: [
        { text: "Nada", value: 0 },
        { text: "Ligeramente", value: 1 },
        { text: "Moderadamente", value: 2 },
        { text: "Severamente", value: 3 }
      ]
    },
    {
      id: 7,
      text: "Con latidos del corazón fuertes y acelerados",
      options: [
        { text: "Nada", value: 0 },
        { text: "Ligeramente", value: 1 },
        { text: "Moderadamente", value: 2 },
        { text: "Severamente", value: 3 }
      ]
    },
    {
      id: 8,
      text: "Inestable",
      options: [
        { text: "Nada", value: 0 },
        { text: "Ligeramente", value: 1 },
        { text: "Moderadamente", value: 2 },
        { text: "Severamente", value: 3 }
      ]
    },
    {
      id: 9,
      text: "Atemorizado o asustado",
      options: [
        { text: "Nada", value: 0 },
        { text: "Ligeramente", value: 1 },
        { text: "Moderadamente", value: 2 },
        { text: "Severamente", value: 3 }
      ]
    },
    {
      id: 10,
      text: "Nervioso",
      options: [
        { text: "Nada", value: 0 },
        { text: "Ligeramente", value: 1 },
        { text: "Moderadamente", value: 2 },
        { text: "Severamente", value: 3 }
      ]
    },
    {
      id: 11,
      text: "Con sensación de bloqueo",
      options: [
        { text: "Nada", value: 0 },
        { text: "Ligeramente", value: 1 },
        { text: "Moderadamente", value: 2 },
        { text: "Severamente", value: 3 }
      ]
    },
    {
      id: 12,
      text: "Con temblores en las manos",
      options: [
        { text: "Nada", value: 0 },
        { text: "Ligeramente", value: 1 },
        { text: "Moderadamente", value: 2 },
        { text: "Severamente", value: 3 }
      ]
    },
    {
      id: 13,
      text: "Inquieto, inseguro",
      options: [
        { text: "Nada", value: 0 },
        { text: "Ligeramente", value: 1 },
        { text: "Moderadamente", value: 2 },
        { text: "Severamente", value: 3 }
      ]
    },
    {
      id: 14,
      text: "Con miedo a perder el control",
      options: [
        { text: "Nada", value: 0 },
        { text: "Ligeramente", value: 1 },
        { text: "Moderadamente", value: 2 },
        { text: "Severamente", value: 3 }
      ]
    },
    {
      id: 15,
      text: "Con sensación de ahogo",
      options: [
        { text: "Nada", value: 0 },
        { text: "Ligeramente", value: 1 },
        { text: "Moderadamente", value: 2 },
        { text: "Severamente", value: 3 }
      ]
    },
    {
      id: 16,
      text: "Con temor a morir",
      options: [
        { text: "Nada", value: 0 },
        { text: "Ligeramente", value: 1 },
        { text: "Moderadamente", value: 2 },
        { text: "Severamente", value: 3 }
      ]
    },
    {
      id: 17,
      text: "Con miedo",
      options: [
        { text: "Nada", value: 0 },
        { text: "Ligeramente", value: 1 },
        { text: "Moderadamente", value: 2 },
        { text: "Severamente", value: 3 }
      ]
    },
    {
      id: 18,
      text: "Con problemas digestivos",
      options: [
        { text: "Nada", value: 0 },
        { text: "Ligeramente", value: 1 },
        { text: "Moderadamente", value: 2 },
        { text: "Severamente", value: 3 }
      ]
    },
    {
      id: 19,
      text: "Con desvanecimientos",
      options: [
        { text: "Nada", value: 0 },
        { text: "Ligeramente", value: 1 },
        { text: "Moderadamente", value: 2 },
        { text: "Severamente", value: 3 }
      ]
    },
    {
      id: 20,
      text: "Con rubor facial",
      options: [
        { text: "Nada", value: 0 },
        { text: "Ligeramente", value: 1 },
        { text: "Moderadamente", value: 2 },
        { text: "Severamente", value: 3 }
      ]
    },
    {
      id: 21,
      text: "Con sudores, frios o calientes",
      options: [
        { text: "Nada", value: 0 },
        { text: "Ligeramente", value: 1 },
        { text: "Moderadamente", value: 2 },
        { text: "Severamente", value: 3 }
      ]
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [testCompleted, setTestCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [anxietyLevel, setAnxietyLevel] = useState<{level: string, description: string} | null>(null);

  useEffect(() => {
    // Verificar si el usuario ya completó el test inicial
    const hasCompletedInitialTest = localStorage.getItem('hasCompletedInitialTest');
    const savedResults = localStorage.getItem('initialTestResults');
    
    if (hasCompletedInitialTest && savedResults) {
      const results = JSON.parse(savedResults);
      setAnxietyLevel(results.anxietyLevel);
      setTestCompleted(true);
    }
  }, []);

  const evaluateTest = (answers: number[]) => {
    const totalScore = answers.reduce((sum, score) => sum + score, 0);

    let level: {level: string, description: string};
    if (totalScore <= 4) {
      level = {
        level: "Ansiedad Mínima",
        description: "Indica un nivel muy bajo de síntomas de ansiedad."
      };
    } else if (totalScore <= 8) {
      level = {
        level: "Ansiedad Leve",
        description: "Presenta síntomas leves de ansiedad, pero generalmente manejables."
      };
    } else if (totalScore <= 15) {
      level = {
        level: "Ansiedad Moderada",
        description: "Muestra síntomas de ansiedad que pueden requerir atención profesional."
      };
    } else {
      level = {
        level: "Ansiedad Severa",
        description: "Indica un alto nivel de síntomas de ansiedad que requiere evaluación profesional."
      };
    }

    setAnxietyLevel(level);
    setTestCompleted(true);

    // Guardar los resultados en localStorage
    localStorage.setItem('initialTestResults', JSON.stringify({
      answers,
      totalScore,
      anxietyLevel: level,
      date: new Date().toISOString()
    }));

    // Marcar el test como completado
    localStorage.setItem('hasCompletedInitialTest', 'true');
  };

  const handleAnswer = (value: number) => {
    const newAnswers = [...selectedAnswers, value];
    setSelectedAnswers(newAnswers);

    if (currentQuestion < beckAnxietyQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      evaluateTest(newAnswers);
    }
  };

  const currentQuestionData = beckAnxietyQuestions[currentQuestion];

  const handleDashboardClick = () => {
    router.push('/dashboard');
  };

  if (testCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-green-50 py-10">
        <Card className="w-full max-w-2xl mx-auto bg-white shadow-xl">
          <CardHeader className="border-b border-green-100">
            <CardTitle className="text-3xl font-bold text-green-900 text-center">
              Test Completado
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 text-center">
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-green-900 mb-4">{anxietyLevel?.level}</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {anxietyLevel?.description}
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-green-100 mb-8">
              <p className="text-gray-700">
                Recuerda que este test es una herramienta de evaluación y no sustituye 
                un diagnóstico profesional. Consulta a un especialista en salud mental 
                para una evaluación completa.
              </p>
            </div>

            <Button
              onClick={handleDashboardClick}
              className="w-full py-6 text-lg font-medium bg-green-600 hover:bg-green-700 text-white transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] rounded-md"
            >
              Ir al Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 py-10">
      <Card className="w-full max-w-2xl mx-auto bg-white shadow-xl">
        <CardHeader className="border-b border-purple-100">
          <CardTitle className="text-3xl font-bold text-purple-900 text-center">
            Test Inicial de Ansiedad
          </CardTitle>
          <p className="text-center text-gray-600 mt-2">
            Por favor, complete este test antes de continuar.
          </p>
        </CardHeader>
        <CardContent className="p-8">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-purple-600 font-medium">
                Pregunta {currentQuestion + 1} de {beckAnxietyQuestions.length}
              </div>
              <div className="w-1/3 bg-purple-100 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / beckAnxietyQuestions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <p className="text-2xl font-semibold text-purple-900 mb-8 text-center">
              {currentQuestionData.text}
            </p>

            <div className="space-y-4">
              {currentQuestionData.options.map((option, index) => (
                <div
                  key={index}
                  className="transform transition-all duration-200"
                >
                  <Button 
                    onClick={() => handleAnswer(option.value)}
                    disabled={isSubmitting}
                    className="w-full py-6 text-lg font-medium bg-white hover:bg-purple-50 border-2 border-purple-200 text-purple-900 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {option.text}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BeckAnxietyTest;