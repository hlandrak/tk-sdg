
import React, {useEffect, useState} from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


const SdgPerPage=(props) => {
        return(
            <>            
            {props.documentSdgData.map((e,idx) => (
                <Bar
                    key={'Bar-$'+idx}
                    data={{labels:[e.split(',').length],
                            datasets:[
                                {data: e.split(','),
                                backgroundColor: props.colors[idx],
                                label: idx+1
                            }
                    ]}}
                    options={{
                        title:{
                          display:false,
                        },
                        legend:{
                            display:true,
                            position:'right'
                          }
                    }}
                />
            ))}
         </>

        )


}

export default SdgPerPage;