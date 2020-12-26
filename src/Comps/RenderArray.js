import React, { useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';
import '../CSS/dashboard.css';


export default function RenderArray(props) {
    const [array, setarray] = useState([]);
    
    useEffect(() => {
        renderBasic();
    }, [])
   
    const renderBasic = () => {
        if (!localStorage.getItem('arraySize')) {
            let size = props.size;
            let arr = [], count = 0;
            while (true) {
                let number = Math.floor(Math.random() * 50) + 1;
                arr = [...arr, number];
                count++;
                if (count === size)
                    break;
            }
            localStorage.setItem('array', arr);
            localStorage.setItem('arraySize', Number(props.size));
            setarray(arr);
        }
        else if (localStorage.getItem('arraySize') !== props.size) {
            if (localStorage.getItem('arraySize') < props.size) {
                let size = props.size - localStorage.getItem('arraySize');
                let arr = [], count = 0;
                while (true) {
                    let number = Math.floor(Math.random() * 50) + 1;
                    arr = [...arr, number];
                    count++;
                    if (count === size)
                        break;
                }
                let res = [];
                res = localStorage.getItem('array').split(',');
                res = res.map(item => Number(item))
                res = [...res, ...arr];
                localStorage.setItem('array', res);
                localStorage.setItem('arraySize', Number(props.size));
                setarray(res);
            }
            if (localStorage.getItem('arraySize') > props.size) {
                let deduction = localStorage.getItem('arraySize') - props.size;
                let res = [];
                res = localStorage.getItem('array').split(',');
                res = res.map(item => Number(item));
                let arr = [], count = 0;
                for (let i = 0; i < res.length; i++) {
                    arr = [...arr, res[i]];
                    count++;
                    if (count === (res.length - deduction))
                        break;
                }
                localStorage.setItem('array', arr);
                localStorage.setItem('arraySize', Number(props.size));
                setarray(arr);
            }
        }
        else if (localStorage.getItem('arraySize') === props.size) {
            let res = [];
            res = localStorage.getItem('array').split(',');
            res = res.map(item => Number(item))
            localStorage.setItem('array', res);
            localStorage.setItem('arraySize', Number(props.size));
            setarray(res);
        }
    }

    return (
        <div>
            <br />
            <br />
            <div className='flexRow baseline'>
                {array && array.map(item =>
                    <Paper id={item} style={{ height: (item * 10) + 'px' }} id='paper' >{item}</Paper>
                )}
            </div>
        </div>
    )

}