import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({title, targetTime}){
    const timer = useRef();
    const dialog = useRef();

    // const [timerExpired, setTimerExpired] = useState(false);
    // const [timerStarted, setTimerStarted] = useState(false);
    
    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    if(timeRemaining <= 0) {
        clearInterval(timer.current);
        dialog.current.open();
    }

    function handleReset(){
        setTimeRemaining(targetTime * 1000);

    }
    function handleStart(){
        
        timer.current = setInterval(()=>{
            // setTimerExpired(true);
            // dialog.current.open();
            setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
        },10);

        // setTimerStarted(true);
    }

    function handleStop(){
        dialog.current.open();
        clearInterval(timer.current);
    }
    
    return (
    <>
    <ResultModal 
    ref={dialog} 
    targetTime={targetTime} 
    remainingTime={timeRemaining}
    onReset={handleReset}
    />
    <section className="challenge"> 
        <h2>{title}</h2>
        
        <p className="challenge-time">
            {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>
        <p>
            <button onClick={timerIsActive ? handleStop : handleStart}>
                {timerIsActive ? 'Stop' : 'Start'} Challenge
            </button>
        </p>
        <p className={timerIsActive ? 'active' : undefined}>
            {timerIsActive ? 'Time is running' : 'Timer inactive'}
        </p>
    </section>
    
    
    
    </>
    
    
    );
}