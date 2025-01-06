import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { PlusCircle, Save, Pencil, Trash, Check, X } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  createdBy: string;
}

export const QuizManager = () => {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0
  });

  useEffect(() => {
    const savedQuestions = JSON.parse(localStorage.getItem('quizQuestions') || '[]');
    setQuestions(savedQuestions);
  }, []);

  const handleSaveQuestion = () => {
    const questions = JSON.parse(localStorage.getItem('quizQuestions') || '[]');
    if (editingId) {
      const index = questions.findIndex((q: Question) => q.id === editingId);
      questions[index] = { ...newQuestion, id: editingId, createdBy: user?.email };
    } else {
      const newQuestionWithId = {
        ...newQuestion,
        id: Date.now().toString(),
        createdBy: user?.email
      };
      questions.push(newQuestionWithId);
    }
    localStorage.setItem('quizQuestions', JSON.stringify(questions));
    setQuestions(questions);
    setIsCreating(false);
    setEditingId(null);
    setNewQuestion({ question: '', options: ['', '', '', ''], correctAnswer: 0 });
  };

  const handleEdit = (question: Question) => {
    setNewQuestion({
      question: question.question,
      options: question.options,
      correctAnswer: question.correctAnswer
    });
    setEditingId(question.id);
    setIsCreating(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta pregunta?')) {
      const questions = JSON.parse(localStorage.getItem('quizQuestions') || '[]');
      const filtered = questions.filter((q: Question) => q.id !== id);
      localStorage.setItem('quizQuestions', JSON.stringify(filtered));
      setQuestions(filtered);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <button
        onClick={() => setIsCreating(true)}
        className="flex items-center gap-2 mb-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
      >
        <PlusCircle size={20} />
        Crear Nueva Pregunta
      </button>

      {/* Lista de preguntas existentes */}
      <div className="space-y-4 mb-8">
        {questions.map((question) => (
          <div key={question.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold">{question.question}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(question)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Pencil size={20} />
                </button>
                <button
                  onClick={() => handleDelete(question.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash size={20} />
                </button>
              </div>
            </div>
            <div className="space-y-2">
              {question.options.map((option, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-md ${
                    index === question.correctAnswer
                      ? 'bg-green-100 border-green-500'
                      : 'bg-gray-50'
                  }`}
                >
                  {option}
                  {index === question.correctAnswer && (
                    <Check className="inline ml-2 text-green-500" size={20} />
                  )}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Creada por: {question.createdBy}
            </p>
          </div>
        ))}
      </div>

      {isCreating && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingId ? 'Editar Pregunta' : 'Crear Nueva Pregunta'}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pregunta
              </label>
              <input
                type="text"
                value={newQuestion.question}
                onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                className="w-full p-2 border rounded-md"
                placeholder="Escribe tu pregunta aquí"
              />
            </div>
            {newQuestion.options.map((option, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Opción {index + 1} {index === newQuestion.correctAnswer && '(Correcta)'}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...newQuestion.options];
                      newOptions[index] = e.target.value;
                      setNewQuestion({ ...newQuestion, options: newOptions });
                    }}
                    className="w-full p-2 border rounded-md"
                    placeholder={`Opción ${index + 1}`}
                  />
                  <button
                    onClick={() => setNewQuestion({ ...newQuestion, correctAnswer: index })}
                    className={`px-3 py-1 rounded-md ${
                      index === newQuestion.correctAnswer
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200'
                    }`}
                  >
                    Correcta
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setIsCreating(false);
                  setEditingId(null);
                  setNewQuestion({ question: '', options: ['', '', '', ''], correctAnswer: 0 });
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveQuestion}
                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                <Save size={20} />
                {editingId ? 'Guardar Cambios' : 'Guardar Pregunta'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};