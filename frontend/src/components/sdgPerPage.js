
import React, {useEffect, useState} from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


const SdgPerPage=(props) => {
    props.documentSdgData.map((e,idx)=> console.log(idx));
        return(
            <>            
            {props.documentSdgData.map((e,idx) => (
                <Bar
                    key={'Bar-$'+idx}
                    data={{labels:[...Array(e.split(',').length).keys()],
                            datasets:[
                                {data: e.split(','),
                                backgroundColor: props.colors[idx],
                                label: props.sdgNames[idx]
                            }
                    ]}}
                    options={{
                        title:{
                          display:false,
                        },
                        legend:{
                            display:true,
                            position:'right'
                          },
                          scales: {
                            y:
                              {
                                min: 0,
                                max: 1,
                                stepSize: 0.1,
                              },
                        }
                    }}
                />
            ))}
         </>

        )


}

export default SdgPerPage;