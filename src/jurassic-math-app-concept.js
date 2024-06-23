import React, { useState } from 'react';

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
  { min: 13, rank: "Dinosaur Math Master" },
  { min: 10, rank: "Junior Paleontologist" },
  { min: 7, rank: "Fossil Finder" },
  { min: 4, rank: "Dino Apprentice" },
  { min: 0, rank: "Prehistoric Beginner" }
];

function JurassicMathReactApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerClick = (selectedIndex) => {
    setSelectedAnswer(selectedIndex);
    if (selectedIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
  };

  const getFinalRank = () => {
    for (let rank of DinoRanks) {
      if (score >= rank.min) return rank.rank;
    }
    return DinoRanks[DinoRanks.length - 1].rank;
  };

  if (showScore) {
    return (
      <div>
        <h2>Quiz Complete!</h2>
        <p>Your score: {score} out of {questions.length}</p>
        <p>Your rank: {getFinalRank()}</p>
        <button onClick={resetQuiz}>Play Again</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Question {currentQuestion + 1} of {questions.length}</h2>
      <p>{questions[currentQuestion].question}</p>
      <div>
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(index)}
            style={{ display: 'block', margin: '10px 0' }}
          >
            {option}
          </button>
        ))}
      </div>
      <p>Score: {score}</p>
      <button onClick={handleNextQuestion} disabled={selectedAnswer === null}>
        {currentQuestion + 1 === questions.length ? "Finish" : "Next"}
      </button>
    </div>
  );
}

export default JurassicMathReactApp;