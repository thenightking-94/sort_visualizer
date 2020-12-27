import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import '../CSS/dashboard.css';
import '../CSS/sorting.css';


export default function RenderArray(props) {
    const [array, setarray] = useState([]);
    const [sorting, setsorting] = useState(false);

    useEffect(() => {
        let ObjectArray = props.array;
        setarray(ObjectArray)
        setTimeout(() => {
            setsorting(true)
        }, 2500);
    }, [])

    useEffect(() => {
        if (sorting) {

            switch (props.type) {
                case 'Bubble':

                    break;

                default:
                    break;
            }

        }

    }, [sorting])


    return (
        <div>
            <br />
            <br />
            <div className='flexRow baseline'>

                {array && !sorting && array.map(item =>
                    <p key={item.id} id={item.id} style={{ height: (item.value * 10) + 'px' }} id='paper' >{item.value}</p>
                )}

                {/* Sorting section below */}

                {
                    array && sorting &&
                    array.map(item =>
                        <p key={item.id} id={item.id} style={{ height: (item.value * 10) + 'px' }} id='paper_sort' >{item.value}</p>
                    )
                }
            </div>
            <br />
            <div className='flexRow'>
                <Typography className='textTypo'>
                    Visualization of&nbsp;{props.type}&nbsp;Sorting
                </Typography>
            </div>
        </div>
    )

}