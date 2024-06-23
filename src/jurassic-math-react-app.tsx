import React, { useState, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';

const questions = [
  {
    question: "Owen has 3 Velociraptors in his pack. If 2 more Velociraptors join the pack, how many Velociraptors does Owen have now?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 2
  },
  {
    question: "A Brachiosaurus eats 250 pounds of plants per day. How many pounds will it eat in a week?",
    options: ["1,000", "1,500", "1,750", "2,000"],
    correctAnswer: 2
  },
  {
    question: "If a T-Rex is 40 feet long and a Stegosaurus is 30 feet long, how much longer is the T-Rex?",
    options: ["5 feet", "10 feet", "15 feet", "20 feet"],
    correctAnswer: 1
  },
  {
    question: "A paleontologist finds 24 fossils. If 1/4 of them are dinosaur bones, how many dinosaur bones did they find?",
    options: ["4", "6", "8", "10"],
    correctAnswer: 1
  },
  {
    question: "The Jurassic period lasted for about 56 million years. If the Cretaceous period lasted 79 million years, how many years longer was the Cretaceous period?",
    options: ["13 million", "23 million", "33 million", "43 million"],
    correctAnswer: 1
  },
  {
    question: "A Pteranodon can fly at 60 mph. If it flies for 2.5 hours, how far can it travel?",
    options: ["120 miles", "135 miles", "150 miles", "165 miles"],
    correctAnswer: 2
  },
  {
    question: "If a museum has 5 halls, and each hall can display 8 dinosaur skeletons, how many skeletons can be displayed in total?",
    options: ["30", "35", "40", "45"],
    correctAnswer: 2
  },
  {
    question: "A Triceratops weighs 6 tons. If a car weighs 2 tons, how many cars would equal the weight of one Triceratops?",
    options: ["2", "3", "4", "5"],
    correctAnswer: 1
  }
];

const DinoRanks = [
  { min: 7, rank: "Dinosaur Math Master", icon: "🦖" },
  { min: 5, rank: "Junior Paleontologist", icon: "🦕" },
  { min: 3, rank: "Fossil Finder", icon: "🦴" },
  { min: 1, rank: "Dino Apprentice", icon: "🥚" },
  { min: 0, rank: "Prehistoric Beginner", icon: "🌿" }
];

const useQuiz = (questions) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerClick = useCallback((selectedIndex) => {
    setSelectedAnswer(selectedIndex);
    if (selectedIndex === questions[currentQuestion]?.correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }
  }, [currentQuestion, questions]);

  const handleNextQuestion = useCallback(() => {
    setSelectedAnswer(null);
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(prevQuestion => prevQuestion + 1);
    } else {
      setShowScore(true);
    }
  }, [currentQuestion, questions.length]);

  const resetQuiz = useCallback(() => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
  }, []);

  return {
    currentQuestion,
    score,
    showScore,
    selectedAnswer,
    handleAnswerClick,
    handleNextQuestion,
    resetQuiz
  };
};

const Question = React.memo(({ question, options, selectedAnswer, onAnswerClick }) => (
  <div className="space-y-4">
    <p className="text-lg font-semibold mb-4 text-amber-700">{question}</p>
    <div className="grid grid-cols-2 gap-4">
      {options.map((option, index) => (
        <Button
          key={index}
          onClick={() => onAnswerClick(index)}
          variant={selectedAnswer === index ? "secondary" : "outline"}
          className={`w-full h-16 text-lg font-bold transition-all duration-300 ${
            selectedAnswer === index ? 'bg-green-500 text-white scale-105' : 'bg-amber-100 hover:bg-amber-200'
          }`}
        >
          {option}
        </Button>
      ))}
    </div>
  </div>
));

export default function JurassicMathApp() {
  const {
    currentQuestion,
    score,
    showScore,
    selectedAnswer,
    handleAnswerClick,
    handleNextQuestion,
    resetQuiz
  } = useQuiz(questions);

  const finalRank = useMemo(() => {
    for (let rank of DinoRanks) {
      if (score >= rank.min) return rank;
    }
    return DinoRanks[DinoRanks.length - 1]; // Default to lowest rank if none found
  }, [score]);

  const progressPercentage = useMemo(() => 
    questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0
  , [currentQuestion, questions.length]);

  if (showScore) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8 bg-gradient-to-b from-amber-100 to-amber-300 shadow-lg">
        <CardHeader className="text-3xl font-bold text-center text-amber-800">Quiz Complete!</CardHeader>
        <CardContent className="text-center">
          <div className="text-6xl mb-4">{finalRank.icon}</div>
          <p className="text-2xl font-bold mb-2">Your score: {score} out of {questions.length}</p>
          <p className="text-xl">Your rank: {finalRank.rank}</p>
        </CardContent>
        <CardFooter className="justify-center">
          <Button onClick={resetQuiz} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105">
            Play Again
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const currentQuestionData = questions[currentQuestion];

  if (!currentQuestionData) {
    return (
      <Alert variant="destructive">
        <AlertDescription>Error: Question not found. Please try resetting the quiz.</AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-8 bg-gradient-to-b from-amber-100 to-amber-300 shadow-lg">
      <CardHeader className="text-xl font-bold text-center text-amber-800">
        Jurassic Math Challenge
        <div className="text-sm font-normal mt-2">Question {currentQuestion + 1} of {questions.length}</div>
      </CardHeader>
      <CardContent>
        <Progress value={progressPercentage} className="mb-4" />
        <Question
          question={currentQuestionData.question}
          options={currentQuestionData.options}
          selectedAnswer={selectedAnswer}
          onAnswerClick={handleAnswerClick}
        />
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-lg font-bold text-amber-800">Score: {score}</div>
        <Button 
          onClick={handleNextQuestion} 
          disabled={selectedAnswer === null}
          className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentQuestion + 1 === questions.length ? "Finish" : "Next"}
        </Button>
      </CardFooter>
    </Card>
  );
}
