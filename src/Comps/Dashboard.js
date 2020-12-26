import React, { useEffect, useState } from 'react';
import '../CSS/dashboard.css';
import { Card, Select, MenuItem, Typography } from '@material-ui/core';
import RenderArray from './RenderArray';

const Dashboard = () => {
    let [typeSort, setType] = useState('');
    let [decideSort, setdecideSort] = useState(false);
    let [decideSize, setdecideSize] = useState(false);
    let [arraySize, setSize] = useState('');
    let [decideCompleted, setCompleted] = useState(false);

    useEffect(() => {
        if ((decideSort || decideSize) && !decideCompleted) {
            //combining both checks with OR logic....ie if any one of them changes ---> for better flow for subsequent checking
            setdecideSort(false)
            setdecideSize(false)
            setCompleted(true)
        }

    }, [decideSort, decideSize, decideCompleted])


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
                    value={typeSort}
                    onChange={(e) => {
                        setType(e.target.value);
                        setdecideSort(true);
                        if (decideCompleted)
                            setCompleted(false);

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
                        setdecideSize(true);
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
                decideCompleted && arraySize && typeSort &&
                <RenderArray size={arraySize} visual={typeSort} />
            }



        </div>
    )
}
export default Dashboard;