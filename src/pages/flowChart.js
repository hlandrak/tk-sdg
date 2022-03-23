import { Chart } from 'react-google-charts';
import React from 'react';

const FlowChart = (props) => {
  let data = [
        ['Cohort Number', 'Awesomeness', 'Stress Levels'],
        ['53',  1000,      400],
        ['54',  1170,      460],
        ['55',  660,       1120],
        ['56',  1201,      602],
        ['57',  1250,      650],
        ['58',  1500,      630],
        ['59',  1030,      800]
      ]

  return (
    <div className={'my-pretty-chart-container'}>
      <div>
        <h2> Below is an example Line Chart</h2>
        <Chart
          chartType="LineChart"
          data={data}
          options={{}}
          graph_id="LineChart"
          width="100%"
          height="400px"
          loader={<div>Loading Chart</div>}
        />
      </div>
    </div>
  );
}

export default FlowChart