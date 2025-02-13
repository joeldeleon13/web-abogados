import { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export const QuizSection = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const savedQuestions = JSON.parse(localStorage.getItem('quizQuestions') || '[]');
    setQuestions(savedQuestions);
  }, []);

  const handleAnswer = (questionId: string, selectedOption: number) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: selectedOption }));
  };

  const finishQuiz = () => {
    const correctAnswers = questions.filter(
      (q) => userAnswers[q.id] === q.correctAnswer
    ).length;
    const percentage = (correctAnswers / questions.length) * 100;
    setScore(percentage);
    setQuizFinished(true);
  };

  const getResultMessage = (score: number) => {
    if (score >= 90) return '¡Excelente! ¡Eres un experto!';
    if (score >= 80) return '¡Muy bien! ¡Casi perfecto!';
    if (score >= 70) return '¡Bien hecho! Has aprobado.';
    if (score >= 60) return 'Aprobado, pero puedes mejorar.';
    return 'No has aprobado. ¡Sigue estudiando!';
  };

  if (questions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-600">
        No hay preguntas disponibles en este momento.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Cuestionario de Conocimientos sobre Visas
      </h2>

      {quizFinished && (
        <div
          className={`mb-8 p-6 rounded-lg text-center ${
            score >= 60 ? 'bg-green-100' : 'bg-red-100'
          }`}
        >
          <h3 className="text-2xl font-bold mb-2">
            Tu puntuación: {score.toFixed(1)}%
          </h3>
          <p className="text-lg">{getResultMessage(score)}</p>
        </div>
      )}

      <div className="space-y-6">
        {questions.map((question) => (
          <div key={question.id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(question.id, index)}
                  disabled={quizFinished}
                  className={`w-full text-left p-3 rounded-md transition ${
                    quizFinished
                      ? index === question.correctAnswer
                        ? 'bg-green-100 border-green-500'
                        : userAnswers[question.id] === index
                        ? 'bg-red-100 border-red-500'
                        : 'bg-gray-100'
                      : userAnswers[question.id] === index
                      ? 'bg-blue-100 border-blue-500'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  {option}
                  {quizFinished && index === question.correctAnswer && (
                    <Check className="inline ml-2 text-green-500" size={20} />
                  )}
                  {quizFinished &&
                    userAnswers[question.id] === index &&
                    index !== question.correctAnswer && (
                      <X className="inline ml-2 text-red-500" size={20} />
                    )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {!quizFinished && (
        <button
          onClick={finishQuiz}
          className="mt-6 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Finalizar Cuestionario
        </button>
      )}
    </div>
  );
};
