import { Chart } from 'react-google-charts';

import React, {useEffect, useState} from 'react';
import './flowChart.css';

function FlowChart(props) {
  
  
  return (
  
      <div className='main'>
        <h2 >Et flytdiagram med kobling mellom dokumenter og SDGer</h2>
        <p className='split-para'>Documenter <span>SDG</span></p>
        <Chart
          width={'100%'}
          height={'1500px'}
          chartType="Sankey"
          loader={<div>Loading Chart</div>}
          data={props.sankeyData} 
                  />
      </div>
      );
}

export default FlowChart