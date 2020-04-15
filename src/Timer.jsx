import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import TimeItem from './TimeItem'

const nowafunkcja = function*() {
    let index = 1;
    while (true){
        yield index++
    }
};
const indexGenerator = nowafunkcja();

function TimerWraper() {
    const [time0, setTime0] = useState(Date.now());
    const [isOn, setRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [listOfTimes, setListOfTimes] = useState([]);

    const addTime = () => {
        const timeElapsed = new Date(elapsedTime);
        const minutes = timeElapsed.getMinutes().toString().padStart(2, '0');
        const seconds = timeElapsed.getSeconds().toString().padStart(2, '0');
        const milliseconds = timeElapsed.getMilliseconds().toString().slice(0, -1).padStart(2, '0');
        setListOfTimes([{id: indexGenerator.next().value, timeElapsed: `${minutes}:${seconds}:${milliseconds}`}, ...listOfTimes])
    };

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

    const refreshTimeElapsed = () => {
        setElapsedTime(Date.now() - time0);
    };

    useEffect(() => {
        if (isOn) {
            const idInterval = setInterval(refreshTimeElapsed, 10);
            return () => clearInterval(idInterval)
        }
    });

    const showListofTimes = listOfTimes.map((time, index) => <TimeItem time={time} key={index}/>);

    return (
        <div>
            <Timer time0={time0} isOn={isOn}/>
            <Button onClick={resetTimer}>reset</Button>
            {!isOn?<Button onClick={startTimer}>start</Button>:<Button onClick={stopTimer}>stop</Button>}
            <Button onClick={addTime}>add time</Button>
            <List>
                {showListofTimes}
            </List>
        </div>
    )
}

function Timer({time0, isOn}) {
    const [timer, setTimer] = useState('00:00:00');

    const refreshTimer = () => {
        const timeElapsed = new Date(Date.now() - time0);
        const minutes = timeElapsed.getMinutes().toString().padStart(2, '0');
        const seconds = timeElapsed.getSeconds().toString().padStart(2, '0');
        const milliseconds = timeElapsed.getMilliseconds().toString().slice(0, -1).padStart(2, '0');
        setTimer(`${minutes}:${seconds}:${milliseconds}`)
    };

    useEffect(() => {
        if (isOn) {
            const idInterval = setInterval(refreshTimer, 10);
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