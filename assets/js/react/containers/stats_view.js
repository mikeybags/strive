import React, {Component} from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area, BarChart, Legend, Brush, ReferenceLine, Bar} from 'recharts';

let data = [
    {name: 'Page A', user1: 4000, user2: 2400, user3: 2400},
    {name: 'Page B', user1: 3000, user2: 1398, user3: 2210},
    {name: 'Page C', user1: 2000, user2: 9800, user3: 2290},
    {name: 'Page D', user1: 2780, user2: 3908, user3: 2000},
    {name: 'Page E', user1: 1890, user2: 4800, user3: 2181},
    {name: 'Page F', user1: 2390, user2: 3800, user3: 2500},
    {name: 'Page G', user1: 3490, user2: 4300, user3: 2100},
  ];

let bardata = [
      {name: '1', uv: 300, pv: 456},
      {name: '2', uv: -145, pv: 230},
      {name: '3', uv: -100, pv: 345},
      {name: '4', uv: -8, pv: 450},
      {name: '5', uv: 100, pv: 321},
      {name: '6', uv: 9, pv: 235},
      {name: '7', uv: 53, pv: 267},
      {name: '8', uv: 252, pv: -378},
      {name: '9', uv: 79, pv: -210},
      {name: '10', uv: 294, pv: -23},
      {name: '12', uv: 43, pv: 45},
      {name: '13', uv: -74, pv: 90},
      {name: '14', uv: -71, pv: 130},
      {name: '15', uv: -117, pv: 11},
      {name: '16', uv: -186, pv: 107},
      {name: '17', uv: -16, pv: 926},
      {name: '18', uv: -125, pv: 653},
      {name: '19', uv: 222, pv: 366},
      {name: '20', uv: 372, pv: 486},
      {name: '21', uv: 182, pv: 512},
      {name: '22', uv: 164, pv: 302},
      {name: '23', uv: 316, pv: 425},
      {name: '24', uv: 131, pv: 467},
      {name: '25', uv: 291, pv: -190},
      {name: '26', uv: -47, pv: 194},
      {name: '27', uv: -415, pv: 371},
      {name: '28', uv: -182, pv: 376},
      {name: '29', uv: -93, pv: 295},
      {name: '30', uv: -99, pv: 322},
      {name: '31', uv: -52, pv: 246},
      {name: '32', uv: 154, pv: 33},
      {name: '33', uv: 205, pv: 354},
      {name: '34', uv: 70, pv: 258},
      {name: '35', uv: -25, pv: 359},
      {name: '36', uv: -59, pv: 192},
      {name: '37', uv: -63, pv: 464},
      {name: '38', uv: -91, pv: -2},
      {name: '39', uv: -66, pv: 154},
      {name: '40', uv: -50, pv: 186}
    ];

class StatsView extends Component {
  render () {
    if(1==2){
      //line type is the loop
    	return (
        <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line type="monotone" dataKey="user1" stroke="#430fe0" />
          <Line type="monotone" dataKey="user2" stroke="#8884d8" />
          <Line type="monotone" dataKey="user3" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      )
    }
    else if(1==3){
      //area type is the loop
      return(
      <AreaChart width={600} height={400} data={data} margin={{top: 10, right: 30, left: 0, bottom: 0}}>
        <XAxis dataKey="name"/>
        <YAxis/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Area type='monotone' dataKey='user1' stackId="1" stroke='#8884d8' fill='#8884d8' />
        <Area type='monotone' dataKey='user2' stackId="1" stroke='#82ca9d' fill='#82ca9d' />
        <Area type='monotone' dataKey='user3' stackId="1" stroke='#ffc658' fill='#ffc658' />
      </AreaChart>
      );
    }
    else{
      //bar is the loop
      return(
        <BarChart width={600} height={300} data={bardata} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
         <XAxis dataKey="name"/>
         <YAxis/>
         <CartesianGrid strokeDasharray="3 3"/>
         <Tooltip/>
         <Legend verticalAlign="top" wrapperStyle={{lineHeight: '40px'}}/>
         <ReferenceLine y={0} stroke='#000'/>
         <Brush dataKey='name' height={30} stroke="#8884d8"/>
         <Bar dataKey="pv" fill="#8884d8" />
         <Bar dataKey="uv" fill="#82ca9d" />
        </BarChart>
      )
    }
  }
}

export default StatsView