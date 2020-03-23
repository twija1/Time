import React, {useEffect, useState} from 'react';

function Clock() {

    const [timer, setTimer] = useState(new Date().toLocaleTimeString());

    const refreshTimer = () => {
        setTimer(new Date().toLocaleTimeString())
    };

    useEffect(() => {
        setInterval(refreshTimer, 1000);
        return () => clearInterval()
    });

    return (
        <div>
            {timer}
        </div>
    )
}

export default Clock