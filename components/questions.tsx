import React, { useState, useEffect } from "react";
import { Progress } from "@nextui-org/progress";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Spinner } from "@nextui-org/spinner";
import { FaArrowRight, FaRedoAlt } from 'react-icons/fa';

export default function Questions() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctOptionId, setCorrectOptionId] = useState(null);
  const [timer, setTimer] = useState(15);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/api/ConsultarPreguntas")
      .then(response => response.json())
      .then(data => {
        const randomizedQuestions = data.map(question => {
          const options = question.options;
          const shuffledOptions = options.sort(() => Math.random() - 0.5);
          const correctOptionId = shuffledOptions.find(option => option.Is_Correct).Id_Options;
          return {
            ...question,
            options: shuffledOptions,
            correctOptionId: correctOptionId
          };
        });
        setQuestions(randomizedQuestions);
      })
      .catch(error => console.error("Error al obtener preguntas:", error));
  }, []);

  useEffect(() => {
    let countdownTimer;
    if (timer > 0 && !showFeedback && !quizCompleted) {
      countdownTimer = setTimeout(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && !showFeedback && !quizCompleted) {
      handleTimeUp();
    }
    return () => clearTimeout(countdownTimer);
  }, [timer, showFeedback, quizCompleted]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleRestartExam = () => {
    window.location.reload();
  };

  const handleTimeUp = () => {
    const correctOptionId = currentQuestion.correctOptionId;
    setCorrectOptionId(correctOptionId);
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setSelectedOption(null);
    setIsCorrect(false);
    setCorrectOptionId(null);
    setTimer(15);

    if (currentQuestionIndex + 1 === questions.length) {
      setQuizCompleted(true);
    } else {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }
  };

  const handleOptionSelect = (optionId) => {
    if (showFeedback) {
      return;
    }

    const selectedOptionObj = currentQuestion.options.find(option => option.Id_Options === optionId);
    const isCorrect = selectedOptionObj.Is_Correct;

    setIsCorrect(isCorrect);

    if (!isCorrect) {
      const correctOptionId = currentQuestion.correctOptionId;
      setSelectedOption(optionId);
      setCorrectOptionId(correctOptionId);
    } else {
      setSelectedOption(optionId);
      setScore(prevScore => prevScore + 1);
      setCorrectOptionId(optionId);
    }

    setShowFeedback(true);
  };

  const calculateGrade = () => {
    if (score >= 8) {
      return "4 de 5";
    } else if (score >= 5 && score <= 7) {
      return "3 de 5";
    } else if (score >= 1 && score <= 4) {
      return "2 de 5";
    } else {
      return "0 de 5";
    }
  };

  if (questions.length === 0) return <Spinner className="mt-40" label="Cargando..." size="lg" color="primary" />;

  if (quizCompleted) {
    return (
      <div className="max-w-md mx-auto p-4">
        <Card className="mt-28">
          <CardHeader>
            <h2 className="text-xl font-semibold">Resultado del Quizz</h2>
          </CardHeader>
          <CardBody className="-mt-2">
            <p>Has completado el Quizz.</p>
            <p>Tu calificación es: {calculateGrade()}</p>
          </CardBody>
          <Button color="primary" variant="solid" onPress={handleRestartExam}>
            REINICIAR QUIZZ
            <FaRedoAlt size={20} />
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <Card className="mt-8">
        <CardHeader>
          <h2 className="text-xl font-semibold">Pregunta {currentQuestionIndex + 1}</h2>
        </CardHeader>
        <CardBody>
          <p className="-mt-2">{currentQuestion.question}</p>
          <ul className="space-y-2 mt-2 mb-4">
            {currentQuestion.options.map(option => {
              const isOptionSelected = selectedOption === option.Id_Options;
              const isOptionCorrect = option.Id_Options === correctOptionId;
              let optionClass = "w-full p-2 rounded-md";

              if (showFeedback) {
                if (isOptionSelected && !isCorrect) {
                  optionClass = "w-full p-2 rounded-md bg-red-500 text-white";
                } else if (isOptionCorrect) {
                  optionClass = "w-full p-2 rounded-md bg-green-500 text-white";
                }
              }

              // Ajuste del texto para mostrar bien los caracteres
              let optionText = option.Option_;
              if (optionText.length > 50) {
                optionText = optionText.substring(0, 50) + '...';
              }

              return (
                <li key={option.Id_Options}>
                  <Button
                    theme={isOptionSelected && !isCorrect ? "danger" : isOptionCorrect ? "success" : "default"}
                    className={`${optionClass} ${isOptionSelected ? 'selected' : ''} text-left truncate`}
                    onPress={() => handleOptionSelect(option.Id_Options)}
                    disabled={selectedOption !== null || quizCompleted}
                    aria-label={`Option ${option.Id_Options}`}
                  >
                    {optionText}
                  </Button>
                </li>
              );
            })}
          </ul>
          <div className="w-full relative">
            <Progress
              value={timer * (100 / 15)}
              max={100}
              min={0}
              color="success"
              size="lg"
              label={false}
            />
          </div>
          {showFeedback && (
            <div className="mt-4 flex justify-between items-center">
              <p className={`font-semibold ${isCorrect ? 'text-green-600' : 'text-red-600'} mr-2`}>
                {isCorrect ? '¡Correcto!' : 'Incorrecto'}
              </p>
              <Button color="primary" variant="solid" onPress={handleNextQuestion}>
                Siguiente
                <FaArrowRight size={20} />
              </Button>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
