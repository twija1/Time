import {idGenerator, updateElement} from "./helpers";
import React, {useEffect, useState} from "react";
import TimeRecordItem from "./TimeRecordItem";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Timer from "./Timer";

const indexGenerator = idGenerator();

function TimerWrapper() {
    const [time0, setTime0] = useState(Date.now());
    const [isOn, setRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [listOfTimes, setListOfTimes] = useState([]);

    const addTime = () => {
        const index = indexGenerator.next().value;
        setListOfTimeRecords([{id: index, name: `Time ${index}`, timeElapsed: elapsedTime, date: new Date(), ownerID: 1}, ...listOfTimeRecords])
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

    const editName = (id, newName) => {
        setListOfTimes(updateElement(listOfTimes, id, 'name', newName));
    };

    const deleteItem = (id) => {
        setListOfTimes(listOfTimes.filter((time) => time.id !== id))
    };

    const showListofTimes = listOfTimeRecords.map((time) => <TimeRecordItem time={time.timeElapsed} key={time.id} deleteItem={deleteItem} id={time.id} name={time.name} editName={editName} date={time.date}/>);

    return (
        <div>
            <Timer isOn={isOn} timeElapsed={elapsedTime}/>
            <Button onClick={resetTimer}>reset</Button>
            {!isOn?<Button onClick={startTimer}>start</Button>:<Button onClick={stopTimer}>stop</Button>}
            <Button onClick={addTime}>add time</Button>
            <List>
                {showListofTimes}
            </List>
        </div>
    )
}

export default TimerWrapper