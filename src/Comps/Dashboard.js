import React, { useEffect, useState } from 'react';
import '../CSS/dashboard.css';
import { Card, Select, MenuItem, Typography, Button } from '@material-ui/core';
import RenderArray from './RenderArray';
import SortBubble from './SortBubble';
import SortSelection from './SortSelection';


const Dashboard = () => {
    let [arraySize, setSize] = useState('');
    let [visual, setvisual] = useState('');
    let [startSort, setStartSort] = useState(false);


    useEffect(() => {
        if (visual)
            localStorage.setItem('visual', visual)
    }, [visual])


    return (
        <div >
            <Card className='header flexRow'>
                Data Visualizer
            </Card>
            <br />
            <br />
            <div className='flexRow optimizeSpace' >
                <Typography className='titles'>
                    Select size of Array :
                </Typography>
                <Typography className='titles'>
                    Select type of VisualSort :
                </Typography>
            </div>
            <br />
            <br />
            <div className='flexRow'>

                <Select
                    value={arraySize}
                    onChange={(e) => {
                        setSize(e.target.value);
                        //setting it false for the next sorting session; and rendering the new updated array currently
                        if (startSort)
                            setStartSort(false)
                    }}
                    className='selecComp'
                >
                    <MenuItem value={20}>Twenty elements</MenuItem>
                    <MenuItem value={35}>Thirty-five elements</MenuItem>
                    <MenuItem value={45}>fourty-five elements</MenuItem>
                </Select>
                &nbsp;&nbsp;
                <Select
                    value={visual}
                    onChange={(e) => {
                        setvisual(e.target.value)
                        if (startSort)
                            setStartSort(false)
                    }}
                    className='selecComp'
                >
                    <MenuItem value={"Bubble"}>Bubble Sort</MenuItem>
                    <MenuItem value={"Insertion"}>Insertion Sort</MenuItem>
                    <MenuItem value={"Quick"}>Quick Sort</MenuItem>
                    <MenuItem value={"Merge"}>Merge Sort</MenuItem>
                    <MenuItem value={"Selection"}>Selection Sort</MenuItem>

                </Select>

            </div>
            <br />

            {
                arraySize && !startSort &&
                <RenderArray size={arraySize} />
            }
            {visual && arraySize &&
                <Button className='sortBtn' onClick={() => {
                    setStartSort(true)
                }}>
                    {startSort ? "Sorting In Progress" : "Start Sort"}
                </Button>
            }
            {
                startSort && visual === 'Bubble' &&
                < SortBubble sizeArray={arraySize} type={visual} array={JSON.parse(localStorage.getItem('array'))} />
            }
            {
                startSort && visual === 'Selection' &&
                <SortSelection sizeArray={arraySize} type={visual} array={JSON.parse(localStorage.getItem('array'))} />
            }

        </div>
    )
}
export default Dashboard;