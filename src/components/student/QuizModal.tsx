import React, { useState, useEffect } from 'react';
import { AssessmentQuiz, AssessmentResult } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, Clock, CheckCircle2, AlertCircle, Award, ArrowRight, RotateCcw } from 'lucide-react';

interface QuizModalProps {
  quiz: AssessmentQuiz | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ quiz, isOpen, onClose }) => {
  const { recordAssessmentScore } = useApp();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  useEffect(() => {
    if (isOpen && quiz) {
      setCurrentIndex(0);
      setSelectedAnswers({});
      setTimeLeft(quiz.durationMinutes * 60);
      setIsSubmitted(false);
      setResult(null);
    }
  }, [isOpen, quiz]);

  // Timer countdown
  useEffect(() => {
    if (!isOpen || isSubmitted || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, isSubmitted, timeLeft]);

  if (!isOpen || !quiz) return null;

  const currentQ = quiz.questions[currentIndex];

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionIndex
    }));
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    quiz.questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount += 1;
      }
    });

    const percentage = Math.round((correctCount / quiz.questions.length) * 100);
    const passed = percentage >= quiz.passingPercentage;

    const res: AssessmentResult = {
      quizId: quiz.id,
      quizTitle: quiz.title,
      category: quiz.category,
      score: correctCount,
      totalQuestions: quiz.questions.length,
      percentage,
      passed,
      takenAt: new Date().toISOString().split('T')[0],
      badge: passed ? quiz.badgeName : 'Participated'
    };

    setResult(res);
    setIsSubmitted(true);
    recordAssessmentScore(res);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div>
            <div className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider">
              {quiz.category}
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {quiz.title}
            </h3>
          </div>

          <div className="flex items-center gap-4">
            {!isSubmitted && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-xs font-mono font-semibold">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTime(timeLeft)}</span>
              </div>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {!isSubmitted ? (
            <>
              {/* Progress Bar & Question Index */}
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-slate-700">
                  Question {currentIndex + 1} of {quiz.questions.length}
                </span>
                <span className="font-mono">
                  Answered: {Object.keys(selectedAnswers).length}/{quiz.questions.length}
                </span>
              </div>

              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / quiz.questions.length) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <p className="text-sm font-semibold text-slate-900 leading-relaxed">
                  {currentQ.question}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((option, idx) => {
                  const isSelected = selectedAnswers[currentQ.id] === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-3 text-xs rounded-xl border transition-all flex items-start gap-3 ${
                        isSelected 
                          ? 'border-indigo-600 bg-indigo-50/60 text-slate-900 shadow-xs font-medium'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-[10px] ${
                        isSelected ? 'border-indigo-600 bg-indigo-600 text-white font-bold' : 'border-slate-300 text-slate-500'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className="leading-snug">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Pagination Controls */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex(prev => prev - 1)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Previous
                </button>

                {currentIndex < quiz.questions.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentIndex(prev => prev + 1)}
                    className="px-4 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmitQuiz}
                    className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm"
                  >
                    Submit Test & Grade
                  </button>
                )}
              </div>
            </>
          ) : (
            /* Result Screen */
            <div className="space-y-6">
              
              <div className={`p-6 rounded-2xl border text-center ${
                result?.passed 
                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950' 
                  : 'bg-amber-50/80 border-amber-200 text-amber-950'
              }`}>
                <div className="inline-flex p-3 rounded-2xl bg-white shadow-sm mb-3">
                  <Award className={`w-8 h-8 ${result?.passed ? 'text-emerald-600' : 'text-amber-600'}`} />
                </div>
                
                <h4 className="text-xl font-bold">
                  {result?.passed ? 'Congratulations! Test Passed' : 'Test Completed'}
                </h4>
                <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                  {result?.passed 
                    ? `You scored ${result.score}/${result.totalQuestions} (${result.percentage}%) and earned the verified badge "${result.badge}".`
                    : `You scored ${result?.score}/${result?.totalQuestions} (${result?.percentage}%). Minimum passing score is ${quiz.passingPercentage}%.`}
                </p>

                <div className="mt-4 inline-flex items-center gap-3 px-4 py-2 bg-white rounded-xl border border-slate-200 text-xs font-medium">
                  <span className="font-mono text-base font-bold text-slate-900">
                    {result?.percentage}%
                  </span>
                  <span className="text-slate-300">|</span>
                  <span className="text-slate-600">{result?.score} of {result?.totalQuestions} Correct</span>
                </div>
              </div>

              {/* Review Answers */}
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Question Review & Explanations
                </h5>
                <div className="space-y-3">
                  {quiz.questions.map((q, idx) => {
                    const userSelected = selectedAnswers[q.id];
                    const isCorrect = userSelected === q.correctIndex;

                    return (
                      <div 
                        key={q.id}
                        className={`p-3.5 rounded-xl border text-xs ${
                          isCorrect ? 'border-emerald-200 bg-emerald-50/30' : 'border-red-200 bg-red-50/30'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <span className="font-semibold text-slate-900">
                            {idx + 1}. {q.question}
                          </span>
                          {isCorrect ? (
                            <span className="text-emerald-700 font-semibold flex items-center gap-1 shrink-0">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                            </span>
                          ) : (
                            <span className="text-red-700 font-semibold flex items-center gap-1 shrink-0">
                              <AlertCircle className="w-3.5 h-3.5" /> Incorrect
                            </span>
                          )}
                        </div>

                        <div className="text-[11px] text-slate-600 space-y-1">
                          <div>
                            <span className="font-medium text-slate-700">Correct Answer:</span>{' '}
                            {q.options[q.correctIndex]}
                          </div>
                          <div className="text-slate-500 italic">
                            Explanation: {q.explanation}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setCurrentIndex(0);
                    setSelectedAnswers({});
                    setTimeLeft(quiz.durationMinutes * 60);
                  }}
                  className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Test</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm"
                >
                  Done & Back to Profile
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
