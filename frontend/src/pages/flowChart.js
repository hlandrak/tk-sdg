import { Chart } from 'react-google-charts';

import React, {useEffect, useState} from 'react';
import './flowChart.css';

function FlowChart(props) {
  
  return (
    
    <div className='main'>
      <div className="container mt-5">
        <h2 margin-top="1000px">React Simple Sankey Chart Example</h2>
        <Chart
          width={700}
          height={'350px'}
          chartType="Sankey"
          loader={<div>Loading Chart</div>}
          data={props.sankeyData} 
          rootProps={{ 'data-testid': '1' }}
        />
      </div>
    </div>
  );
}

export default FlowChart