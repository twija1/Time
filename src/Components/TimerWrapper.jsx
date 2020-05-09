import {idGenerator, updateElement} from "../helpers";
import React, {useEffect, useState} from "react";
import TimeRecordItem from "./TimeRecordItem";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Timer from "./Timer";
import {getUserTimeRecords, addTimeRecord, deleteTimeRecord, editTimeRecord} from '../helpers'

const indexGenerator = idGenerator();

function TimerWrapper() {
    const [time0, setTime0] = useState(Date.now());
    const [isOn, setRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [fetchedListOfTimes, setFetchedListOfTimes] = useState([]);

    const addTime = () => {
        const index = indexGenerator.next().value;
        addTimeRecord({name: `Time ${index}`, timeElapsed: elapsedTime, startDate: Date.now(), endDate: Date.now()}).then(response => {
            updateTimeRecords();
        })
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

    const updateTimeRecords = () => {
        getUserTimeRecords().then(response => {
            const fetchedRecords = response.map(({name, timeElapsed, id, startDate, endDate}) => ({name, timeElapsed, id, startDate, endDate}));
            setFetchedListOfTimes(fetchedRecords);
        });
    };

    useEffect(() => {
        updateTimeRecords();
    }, []);

    useEffect(() => {
        if (isOn) {
            const idInterval = setInterval(refreshTimeElapsed, 10);
            return () => clearInterval(idInterval)
        }
    });

    const editName = ({id, name}) => {
        const editingTimeRecord = fetchedListOfTimes.find(time => time.id === id);
        editTimeRecord({...editingTimeRecord, name}).then(response => {
            updateTimeRecords()
        })
    };

    const deleteItem = (id) => {
        deleteTimeRecord({id}).then(response => {
            updateTimeRecords()
        })
    };

    const showListofTimes = fetchedListOfTimes.map((time) => <TimeRecordItem time={time.timeElapsed} key={time.id} deleteItem={deleteItem} id={time.id} name={time.name} editName={editName} endDate={new Date(time.endDate)} startDate={new Date(time.startDate)}/>);

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