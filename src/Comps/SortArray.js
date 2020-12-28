import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import '../CSS/dashboard.css';
import '../CSS/sorting.css';

export default function RenderArray(props) {
    const [array, setarray] = useState([]);
    const [sorting, setsorting] = useState(false);
    const [swapValue, setswap] = useState(false);

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
                    let i, j, temp;
                    let res = [];
                    res = [...props.array];
                    let swapped;
                    for (i = 0; i < props.sizeArray - 1; i++) {
                        swapped = false;
                        for (j = 0; j < props.sizeArray - i - 1; j++) {
                            if (res[j].value > res[j + 1].value) {
                                // swap arr[j] and arr[j+1] 
                                temp = res[j].value;
                                res[j].value = res[j + 1].value;
                                res[j + 1].value = temp;
                                swapped = true;
                                swap(j);
                            }
                        }
                        if (swapped == false)
                            break;
                    }
                    break;

                default:
                    break;
            }

        }

    }, [sorting])

    const swap = (j) => {
        //changing the 'innerHTML of the p-elemnts because 'item.value' equivalent is the 'innerHTML' of the element
        //changing the heights of the p-elemnts because 'item.value' also equivalent is the 'height' of the element
        //while the 'item.id' is the equivalent of the 'array-index
        setTimeout(() => {
            let elJ = document.querySelector("p[id=" + CSS.escape(j) + "]");
            let elJplus1 = document.querySelector("p[id=" + CSS.escape(j + 1) + "]");
            if (elJ && elJplus1) {
                elJ.style.backgroundColor = '#ad1b02';
                elJplus1.style.backgroundColor = '#e88d14';
                let height = elJ.style.height;
                elJ.style.height = elJplus1.style.height;
                elJplus1.style.height = height;
                let text = elJ.innerHTML;
                elJ.innerHTML = elJplus1.innerHTML;
                elJplus1.innerHTML = text;
                elJ.style.backgroundColor = '#FFBF01';
                elJplus1.style.backgroundColor = '#FFBF01';
            }
        }, 1000)


    }
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
                    array && sorting &&
                    array.map(item =>
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