import { Typography } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import '../CSS/dashboard.css';
import '../CSS/sorting.css';

export default function SortBubble(props) {
    const [array, setarray] = useState([]);
    const [sorting, setsorting] = useState(false);
    const [processedArray, setprocessedArray] = useState([]);
    const [hasStarted, sethasStarted] = useState(false)
    const [finished, setfinished] = useState(false);
    const unsorted = useRef();
    const timer = useRef();

    useEffect(() => {
        let ObjectArray = props.array;
        setarray(ObjectArray)
        setTimeout(() => {
            setsorting(true)
        }, 1000);
    }, [])

    useEffect(() => {
        if (array)
            unsorted.current = array;
    }, [array])


    useEffect(() => {
        if (sorting) {
            timer.current = setInterval(() => {
                swapper();
            }, 150);
        }
        return () => {
            clearInterval(timer.current);
        }


    }, [sorting])

    const swapper = () => {
        let i, j, res = [], temp, swap = false;
        res = processedArray.length > 0 ? processedArray : [...unsorted.current];
        for (i = 0; i < res.length; i++) {
            for (j = i + 1; j < res.length; j++) {
                if (res[i].value > res[j].value) {
                    temp = res[i].value;
                    res[i].value = res[j].value;
                    res[j].value = temp;
                    swap = true;
                    let el = document.querySelector("p[id=" + CSS.escape(i) + "]");
                    let elm = document.querySelector("p[id=" + CSS.escape(j) + "]");
                    if (el && elm) {
                        el.style.backgroundColor = "#FEDB5E";
                        elm.style.backgroundColor = "#e88d14";
                    }
                }
                //renew array after each swap
                setprocessedArray(res)
                sethasStarted(true)
                if (swap)
                    break;
            }
            if (swap)
                break;
        }
    }

    useEffect(() => {
        if (processedArray.length === unsorted.current.length && !finished) {
            let checkArray = [...unsorted.current];
            checkArray.sort(function (a, b) { return (a - b) });
            let bool = false;
            for (let i = 0; i < checkArray.length; i++) {
                if (checkArray[i] !== processedArray[i])
                    bool = true;
            }
            if (!bool) {
                clearInterval(timer.current);
                setfinished(true)
            }
        }
        if (finished) {
            let el = document.querySelectorAll("p[class='paper_sort']");
            if (el) {
                for (let i = 0; i < el.length; i++)
                    el[i].style.backgroundColor = 'green';
            }
        }

    }, [processedArray, finished])

    return (
        <div>
            <br />
            <br />
            <div className='flexRow baseline'>

                {array && !sorting && array.map(item =>
                    <p key={item.id} id={item.id} style={{ height: (item.value * 10) + 'px' }} className='paper' >{item.value}</p>
                )}

                {/* Sorting section below */}

                {
                    array && sorting && !hasStarted &&
                    array.map(item =>
                        <p key={item.id} id={item.id} style={{ height: (item.value * 10) + 'px' }} className='paper_sort' >{item.value}</p>
                    )
                }
                {
                    processedArray.length > 0 && sorting && hasStarted &&
                    processedArray.map(item =>
                        <p key={item.id} id={item.id} style={{ height: (item.value * 10) + 'px' }} className='paper_sort' >{item.value}</p>
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