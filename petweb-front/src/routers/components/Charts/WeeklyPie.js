import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'CPIB', count: 31 },
  { name: 'FBP', count: 10 },
  { name: 'FBB', count: 4 },
];
const COLORS = ['#118AF7', '#FF6D4C', '#1AFFD6'];

export default class WeeklyPie extends PureComponent {

  render() {
    return (
      <PieChart width={350} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={130}
          outerRadius={170}
          fill="#8884d8"
          paddingAngle={0}
          dataKey="count"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend  iconSize={15} iconType={'circle'} layout={'vertical'} height={1}/>
      </PieChart>
    );
  }
}