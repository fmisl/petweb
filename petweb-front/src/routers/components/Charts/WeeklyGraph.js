import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

  const divStyle = {
    background: 'rgba(25, 25, 25, 0.15)',
  };
const WeeklyGraph = ({recent7dates, NofPIBbyDay, NofFMMbyDay, NofFBPbyDay, NofFBBbyDay}) =>{
    const data = [
      {
        name: recent7dates[6],
        PIB: NofPIBbyDay[6],
        FMM: NofFMMbyDay[6],
        FBB: NofFBPbyDay[6],
        FBP: NofFBBbyDay[6],
      },
      {
        name: recent7dates[5],
        PIB: NofPIBbyDay[5],
        FMM: NofFMMbyDay[5],
        FBB: NofFBPbyDay[5],
        FBP: NofFBBbyDay[5],
      },
      {
        name: recent7dates[4],
        PIB: NofPIBbyDay[4],
        FMM: NofFMMbyDay[4],
        FBB: NofFBPbyDay[4],
        FBP: NofFBBbyDay[4],
      },
      {
        name: recent7dates[3],
        PIB: NofPIBbyDay[3],
        FMM: NofFMMbyDay[3],
        FBB: NofFBPbyDay[3],
        FBP: NofFBBbyDay[3],
      },
      {
        name: recent7dates[2],
        PIB: NofPIBbyDay[2],
        FMM: NofFMMbyDay[2],
        FBB: NofFBPbyDay[2],
        FBP: NofFBBbyDay[2],
      },
      {
        name: recent7dates[1],
        PIB: NofPIBbyDay[1],
        FMM: NofFMMbyDay[1],
        FBB: NofFBPbyDay[1],
        FBP: NofFBBbyDay[1],
      },
      {
        name: recent7dates[0],
        PIB: NofPIBbyDay[0],
        FMM: NofFMMbyDay[0],
        FBB: NofFBPbyDay[0],
        FBP: NofFBBbyDay[0],
      }
    ];
    return(
        <LineChart width={871} height={500} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid stroke="#292D30" vertical={false}/>
            <Line dataKey="PIB" stroke="#b2f711" strokeWidth={3} activeDot={{ r: 5 }} dot={{fill:"#b2f711"}}/>
            <Line dataKey="FMM" stroke="#118AF7" strokeWidth={3} activeDot={{ r: 5 }} dot={{fill:"#118AF7"}}/>
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