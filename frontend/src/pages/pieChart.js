import React, {useEffect, useState} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import './pieChart.css';

ChartJS.register(ArcElement, Tooltip, Legend);


function PieChartPage(props) {
    const [loading,setLoading] = useState(true);
   

    useEffect(()=>{
        setLoading(false);
        console.log(loading);
    })
    return (
        <div className='main'>{loading?<p>Loading</p>: 
        <div>
            
            <div className='chart'>
                <Pie
                    data={props.pieData[0]}
                    options={{
                        responsive:true,
                        plugins: {
                        legend: {
                            display:true,
                            position:'right',
                            font:{
                                size: '10px'
                            }
                        },
                        title:{
                            display:true,
                            text: "Total score SDGer Trondheim kommune",
                            font: {
                                weight: 'bold',
                                size: '20px'
                            }
                        }
                    }
                    }}
                />
            </div>
        </div>}
        </div>
      )
}

export default PieChartPage;