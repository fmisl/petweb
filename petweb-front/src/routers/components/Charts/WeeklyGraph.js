import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const data = [
    {
      name: 'Monday',
      CPIB: 4,
      FBP: 0,
      FBB: 2,
    },
    {
      name: 'Tuesday',
      CPIB: 3,
      FBP: 1,
      FBB: 0,
    },
    {
      name: 'Wednesday',
      CPIB: 5,
      FBP: 0,
      FBB: 1,
    },
    {
      name: 'Thursday',
      CPIB: 1,
      FBP: 2,
      FBB: 0,
    },
    {
      name: 'Friday',
      CPIB: 3,
      FBP: 2,
      FBB: 0,
    }
  ];
  const divStyle = {
    background: 'rgba(25, 25, 25, 0.15)',
  };
const WeeklyGraph = (props) =>{
    return(
        <LineChart width={871} height={500} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid stroke="#292D30" vertical={false}/>
            <Line dataKey="CPIB" stroke="#118AF7" strokeWidth={3} activeDot={{ r: 5 }} dot={{fill:"#FF6D4C"}}/>
            <Line dataKey="FBP" stroke="#1AFFD6" strokeWidth={3} activeDot={{ r: 5 }} dot={{fill:"#1AFFD6"}}/>
            <Line dataKey="FBB" stroke="#FF6D4C" strokeWidth={3} activeDot={{ r: 5 }} dot={{fill:"#118AF7"}}/>
            <XAxis dataKey="name" />
            <YAxis tickCount={8}/>
            <Tooltip contentStyle={divStyle}/>
            <Legend iconSize={15} iconType={'circle'}/>
        </LineChart>
    );
}
export default WeeklyGraph;