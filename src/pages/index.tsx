import { useState } from 'react'
import type { NextPage } from 'next'
import { fetchQuizQuestions } from '../components/api/API'
import styles from 'styles/Home.module.css'
import QuestionCard from 'components/Questions/QuestionCard'
import { QuestionsState, Difficulty } from '../components/api/API'

export type AnswerObject = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}

const TOTAL_QUESTIONS = 10


const Home: NextPage = () => {
  const [gameOver, setGameOver] = useState(true)
  const [questions, setQuestions] = useState<QuestionsState[]>([])
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [loading, setLoading] = useState(false)
  const [number, setNumber] = useState(0)
  const [score, setScore] = useState(0)

  const startTrivia = async () => {
    setLoading(true)
    setGameOver(false)
    const newQuestion = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY,
    )
    setQuestions(newQuestion)
    setScore(0)
    setUserAnswers([])
    setNumber(0)
    setLoading(false)
  }

  const checkAnswer = (e: any) => {
    if (!gameOver) {
      const answer = e.currentTarget.value
      const correct = questions[number].correct_answer === answer
      if (correct) setScore((prev) => prev + 1)
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      }
      setUserAnswers((prev) => [...prev, answerObject])
    }
  }

  const nextQuestion = () => {
    const nextQ = number + 1

    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true)
    } else {
      setNumber(nextQ)
    }
  }

  return (
    <div className={styles.container}>
      <h1>Next.js QUIZ</h1>
      {gameOver ? (
        <button className={styles.start} onClick={startTrivia}>
          start
        </button>
      ) : null}
      {!gameOver ? <p className={styles.score}>Score: {score}</p> : null}
      {loading ? <p>Loading Questions...</p> : null}
      {!loading && !gameOver && (
        <QuestionCard 
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}
      {!gameOver &&
       !loading && 
       userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 ? (
          <button onClick={nextQuestion}>Next Question</button>
        )
       : null}
    </div>
  )
}

export default Home