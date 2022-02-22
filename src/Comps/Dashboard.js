import React, { useEffect, useState } from 'react';
import '../CSS/dashboard.css';
import { Card, Select, MenuItem, Typography, Button } from '@material-ui/core';
import RenderArray from './RenderArray';
import SortBubble from './SortBubble';
import SortSelection from './SortSelection';
import SortInsertion from './SortInsertion';


const Dashboard = () => {
    let [arraySize, setSize] = useState('');
    let [visual, setvisual] = useState('');
    let [startSort, setStartSort] = useState(false);
    let [nameChange, setName] = useState(false);


    useEffect(() => {
        if (visual)
            localStorage.setItem('visual', visual)
    }, [visual])

    const changeName = (data) => {
        if (data)
            setName(true);
        if (!data)
            setName(false)
    }


    return (
        <div >
            <Card onClick={() => {
                window.location.assign('/')
            }} className='header flexRow'>
                Data Visualizer
            </Card>
            <br />
            <br />
            <div className='flexRow optimizeSpace' >
                <Typography className='titles'>
                    Select size of Array :
                </Typography>
                &nbsp;&nbsp;&nbsp;
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
                    <MenuItem value={window.innerWidth > `${768}` ? 20 : 10}>{window.innerWidth > `${768}` ? 'Twenty elements' : 'Ten elements'}</MenuItem>
                    <MenuItem value={window.innerWidth > `${768}` ? 35 : 15}>{window.innerWidth > `${768}` ? 'Thirty-five elements' : 'Fifteen elements'}</MenuItem>
                    <MenuItem value={window.innerWidth > `${768}` ? 45 : 20}>{window.innerWidth > `${768}` ? 'fourty-five elements' : 'Twenty elements'}</MenuItem>
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
                    {startSort ? (nameChange ? "Array is Sorted" : "Sorting In Progress") : "Start Sort"}
                </Button>
            }
            {
                startSort && visual === 'Bubble' &&
                < SortBubble childToParentDataCallback={changeName} sizeArray={arraySize} type={visual} array={JSON.parse(localStorage.getItem('array'))} />
            }
            {
                startSort && visual === 'Selection' &&
                <SortSelection childToParentDataCallback={changeName} sizeArray={arraySize} type={visual} array={JSON.parse(localStorage.getItem('array'))} />
            }
            {
                startSort && visual === 'Insertion' &&
                <SortInsertion childToParentDataCallback={changeName} sizeArray={arraySize} type={visual} array={JSON.parse(localStorage.getItem('array'))} />
            }

        </div>
    )
}
export default Dashboard;