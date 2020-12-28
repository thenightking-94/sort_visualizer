import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import '../CSS/dashboard.css';


export default function RenderArray(props) {
    const [array, setarray] = useState([]);

    useEffect(() => {
        renderBasic();
    }, [])

    
    useEffect(() => {
        renderBasic();
    }, [props.size])



    const renderBasic = () => {
      
        if (!localStorage.getItem('arraySize')) {
            let size = props.size;
            let arr = [], count = 0, obj = {};
            while (true) {
                let number = Math.floor(Math.random() * 50) + 1;
                count++;
                obj.value = number;
                obj.id = (count - 1);
                let newobj = {};
                newobj = { ...obj };
                arr = [...arr, newobj];
                if (count === size)
                    break;
            }
            localStorage.setItem('array', JSON.stringify(arr));
            localStorage.setItem('arraySize', Number(props.size));
            setarray(arr);
        }
        else {
            if (Number(localStorage.getItem('arraySize')) === props.size) {
                let res = [];
                res = JSON.parse(localStorage.getItem('array'));
                res = res.map(item => (item))
                localStorage.setItem('array', JSON.stringify(res));
                localStorage.setItem('arraySize', Number(props.size));
                setarray(res);
            }
            if (Number(localStorage.getItem('arraySize')) < props.size) {
                let size = props.size - localStorage.getItem('arraySize');
                let arr = [], count = (props.size - size), obj = {};
                while (true) {
                    let number = Math.floor(Math.random() * 50) + 1;
                    count++;
                    obj.value = number;
                    obj.id = (count - 1);
                    let newobj = {};
                    newobj = { ...obj };
                    arr = [...arr, newobj];
                    if (count === props.size)
                        break;
                }
                let res = [];
                res = JSON.parse(localStorage.getItem('array'));
                res = res.map(item => (item))
                res = [...res, ...arr];
                localStorage.setItem('array', JSON.stringify(res));
                localStorage.setItem('arraySize', Number(props.size));
                setarray(res);
            }
            if (Number(localStorage.getItem('arraySize')) > props.size) {
                let deduction = localStorage.getItem('arraySize') - props.size;
                let res = [];
                res = JSON.parse(localStorage.getItem('array'));
                res = res.map(item => (item));
                let arr = [], count = 0;
                for (let i = 0; i < res.length; i++) {
                    arr = [...arr, res[i]];
                    count++;
                    if (count === (res.length - deduction))
                        break;
                }
                localStorage.setItem('array', JSON.stringify(arr));
                localStorage.setItem('arraySize', Number(props.size));
                setarray(arr);
            }

        }
    }

    return (
        <div>
            <br />
            <br />
            {
                array &&
                <Button id='generateBtn' onClick={() => {
                    localStorage.removeItem('arraySize');
                    renderBasic();
                }}>
                    Generate Different Array
                </Button>
            }
            <div className='flexRow baseline'>
                {array && array.map(item =>
                    <p key={item.id} id={item.id} style={{ height: (item.value * 10) + 'px' }} className='paper' >{item.value}</p>
                )}
            </div>
        </div>
    )

}