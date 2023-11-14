import React, { useRef, useState } from 'react'
import ResultModal from './ResultModal'

// let timer;

const TimerChallenge = ({ title, targetTime }) => {
  const timer = useRef(); // clearInterval ile durdurmak için
  const dialog = useRef();

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000)

  const isTimerActive = timeRemaining > 0 && timeRemaining < targetTime * 1000

  if (timeRemaining <= 0) { // Süre dolarsa interval'in durması lazım çünkü interval sadece her 10 ms'de ateşleyecek.
    clearInterval(timer.current);
    dialog.current.open() // Süre bitince modal'ımı göstermek isterim.
  }

  function handleReset() {
    setTimeRemaining(targetTime * 1000)
  }

  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10) // her 10 ms'de 10 ms çıkartacağız.
    }, 10);
  }

  function handleStop() {
    dialog.current.open() // Stop Butonuna basınca modal'ımı göstermek isterim.
    clearInterval(timer.current)
  }

  return (
    <>
      <ResultModal onReset={handleReset} ref={dialog} targetTime={targetTime} remainingTime={timeRemaining} />
      <section className='challenge'>
        <h2>{title}</h2>
        <p className='challenge-time'>{targetTime} second{targetTime > 1 && "s"}</p>
        <p>
          <button onClick={isTimerActive ? handleStop : handleStart}>{isTimerActive ? "Stop" : "Start"} Challenge</button> {/** Start - stop button */}
        </p>
        <p className={isTimerActive ? "active" : undefined}>{isTimerActive ? "Time is running" : "Timer inactive"}</p> {/* active class if running*/}
      </section>
    </>
  )
}

export default TimerChallenge