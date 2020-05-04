import React, {useEffect, useState} from "react";
import {timeToString, showDate} from '../helpers'

function Timer({isOn, timeElapsed}) {
    const [timer, setTimer] = useState(0);

    const refreshTimer = () => {
        setTimer(timeElapsed)
    };

    useEffect(() => {
        if (isOn) {
            const idInterval = setInterval(refreshTimer, 10);
            return () => clearInterval(idInterval)
        }
    });

    useEffect(() => {
        refreshTimer()
    }, [timeElapsed]);

    return (
        <div>
            <div>{showDate()}</div>
            <div>{timeToString(timer)}</div>

        </div>
    )
}

export default Timer