import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";

function TimerWraper() {
    const [time0, setTime0] = useState(Date.now());
    const [isOn, setRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);

    const resetTimer = () => {
        setTime0(Date.now());
        setElapsedTime(0);
        setRunning(false);
    };

    const startTimer = () => {
        if (!isOn) {
            setTime0(Date.now() - elapsedTime);
            setRunning(true);
        }
    };

    const stopTimer = () => {
        if (isOn) {
            setElapsedTime(Date.now() - time0);
            setRunning(false);
        }
    };

    return (
        <div>
            <Timer time0={time0} isOn={isOn}/>
            <Button onClick={resetTimer}>reset</Button>
            <Button onClick={startTimer}>start</Button>
            <Button onClick={stopTimer}>stop</Button>
        </div>
    )
}

function Timer({time0, isOn}) {
    const [timer, setTimer] = useState('00:00');

    const refreshTimer = () => {
        const timeElapsed = new Date(Date.now() - time0);
        const minutes = timeElapsed.getMinutes().toString().padStart(2, '0');
        const seconds = timeElapsed.getSeconds().toString().padStart(2, '0');
        setTimer(`${minutes}:${seconds}`)
    };

    useEffect(() => {
        if (isOn) {
            const idInterval = setInterval(refreshTimer, 1000);
            return () => clearInterval(idInterval)
        }
    });

    useEffect(() => {
        refreshTimer()
    }, [time0]);

    return (
        <div>
            <div>{timer}</div>
        </div>
    )
}

export default TimerWraper