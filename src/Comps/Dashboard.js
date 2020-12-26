import React, { useEffect, useState } from 'react';
import '../CSS/dashboard.css';
import { Card, Select, MenuItem, Typography } from '@material-ui/core';
import RenderArray from './RenderArray';
import { SentimentVeryDissatisfiedOutlined } from '@material-ui/icons';

const Dashboard = () => {
    let [arraySize, setSize] = useState('');
    let [decideCompleted, setCompleted] = useState(false);
    let [visual, setvisual] = useState('');

    useEffect(() => {
        //more concrete checking added for extra cushion
        if (arraySize && !decideCompleted)
            setCompleted(true)

        if (visual)
            localStorage.setItem('visual', visual)

    }, [arraySize, decideCompleted, visual])


    return (
        <div style={{ height: '100vh' }}>
            <Card className='header flexRow'>
                Data Visualizer
            </Card>
            <br />
            <br />
            <div className='flexRow'>
                <Typography className='titles'>
                    Select type of Sort :
                </Typography>
                <Typography className='titles'>
                    Select size of array :
                </Typography>
            </div>
            <br />
            <br />
            <div className='flexRow'>
                <Select
                    value={visual}
                    onChange={(e) => {
                        setvisual(e.target.value)
                    }}
                    className='selecComp'
                >
                    <MenuItem value={"Bubble"}>Bubble Sort</MenuItem>
                    <MenuItem value={"Insertion"}>Insertion Sort</MenuItem>
                    <MenuItem value={"Quick"}>Quick Sort</MenuItem>
                    <MenuItem value={"Merge"}>Merge Sort</MenuItem>
                    <MenuItem value={"Selection"}>Selection Sort</MenuItem>

                </Select>
                &nbsp;&nbsp;
                <Select
                    value={arraySize}
                    onChange={(e) => {
                        setSize(e.target.value);
                        if (decideCompleted)
                            setCompleted(false);
                    }}
                    className='selecComp'
                >
                    <MenuItem value={20}>Twenty elements</MenuItem>
                    <MenuItem value={35}>Thirty-five elements</MenuItem>
                    <MenuItem value={45}>fourty-five elements</MenuItem>
                </Select>
            </div>
            <br />
            {
                decideCompleted && arraySize &&
                <RenderArray size={arraySize} />
            }



        </div>
    )
}
export default Dashboard;