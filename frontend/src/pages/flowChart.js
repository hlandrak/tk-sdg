import { Chart } from 'react-google-charts';

import React, {useEffect, useState} from 'react';
import './flowChart.css';

function FlowChart(props) {
  
  return (
    
    
      <div className="container mt-5">
        <h2 margin-top="1000px">React Simple Sankey Chart Example</h2>
        <Chart
          width={'100%'}
          height={'1500px'}
          chartType="Sankey"
          loader={<div>Loading Chart</div>}
          data={props.sankeyData} 
          rootProps={{ 'data-testid': '1' }}
        />
      </div>
      );
}

export default FlowChart