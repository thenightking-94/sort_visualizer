import React from 'react';
import '../CSS/dashboard.css';
import { Card, Select, MenuItem } from '@material-ui/core';

const Dashboard = () => {
    return (
        <div>
            <Card className='header flexRow'>
                Data Visualizer
            </Card>
            <br />
            <div className='flexRow'>

                <Select
                    value={null}
                    onChange={() => {
                        console.log('we are changing')
                    }}
                    className='selecComp'
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                &nbsp;&nbsp;
                <Select
                    value={null}
                    onChange={() => {
                        console.log('we are changing')
                    }}
                    className='selecComp'
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </div>

        </div>
    )
}
export default Dashboard;