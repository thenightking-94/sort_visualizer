import { Typography } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import '../CSS/dashboard.css';
import '../CSS/sorting.css';

export default function SortSelection(props) {
    const [array, setarray] = useState([]);
    const [sorting, setsorting] = useState(false);
    const [processedArray, setprocessedArray] = useState([]);
    const [hasStarted, sethasStarted] = useState(false)
    const [incrementer, setincrementer] = useState(0);
    const unsorted = useRef();
    const timer = useRef();

    useEffect(() => {
        props.childToParentDataCallback(false);
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


    useEffect(() => {
        //in place checking for array-equality designed
        let checkArray = [...unsorted.current];
        let values_from_ref = checkArray.map(item => item.value);
        values_from_ref.sort(function (a, b) { return (a - b) });
        let values_from_processedArray = processedArray.map(item => item.value);
        let counter = 0;
        for (let i = 0; i < values_from_ref.length; i++) {
            if (values_from_ref[i] === values_from_processedArray[i])
                counter++;
        }
        //if array is sorted then no-need to update any updated-processed array
        if (counter === checkArray.length && counter > 0) {
            props.childToParentDataCallback(true);
            clearInterval(timer.current);
            let el = document.querySelectorAll("p[class='paper_sort']");
            if (el) {
                for (let i = 0; i < el.length; i++)
                    el[i].style.backgroundColor = '#4A5DFC';
            }

        }
        //we are using incrementer here becoz at some point the processed array may already be sorted before completing all iteration through the array
        //in that scenario this useEffect will not run because processedArray hasn't chnanged and its sorted.
        //so we need an incrementer to run the last useEffect after processed array re-render
    }, [processedArray, incrementer])




    const swapper = () => {
        let i, j, res = [], temp, min_index, swap = false;
        res = processedArray.length > 0 ? processedArray : [...unsorted.current];
        for (i = 0; i < res.length - 1; i++) {

            min_index = i;

            for (j = i + 1; j < res.length; j++) {

                if (res[min_index].value > res[j].value) {
                    min_index = j;
                    swap = true;
                }
            }

            temp = res[min_index].value;
            res[min_index].value = res[i].value;
            res[i].value = temp;

            let el = document.querySelector("p[id=" + CSS.escape(min_index) + "]");
            let elm = document.querySelector("p[id=" + CSS.escape(i) + "]");
            if (el && elm) {
                el.style.backgroundColor = "#FEDB5E";
                elm.style.backgroundColor = "#e88d14";
            }

            setprocessedArray(res)
            setincrementer(incrementer => incrementer + 1);
            sethasStarted(true)

            //breaking away from outer loop after any swap on initial/renewed array so that the next render-with-updated-array occurs at next swapper() call
            if (swap)
                break;
        }

    }

    return (
        <div>
            <br />
            <br />
            <div className='flexRow baseline mobileAdjuster'>

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