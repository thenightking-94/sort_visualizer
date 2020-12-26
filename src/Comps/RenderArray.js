import React, { useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';
import '../CSS/dashboard.css';


export default function RenderArray(props) {
    const [array, setarray] = useState([]);
    useEffect(() => {
        let size = props.size;
        let arr = [], count = 0;
        while (true) {
            var number = Math.floor(Math.random() * 50) + 1;
            arr = [...arr, number];
            count++;
            if (count == size)
                break;
        }
        setarray(arr);
    }, [])


    return (
        <div>
            <br />
            <div className='flexRow baseline'>
                {array && array.map(item =>
                    <Paper id={item} style={{ height: item + 'px' }} id='paper' />
                )}
            </div>
        </div>
    )

}