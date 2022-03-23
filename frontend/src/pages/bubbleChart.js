import React, {Component} from 'react';
import BubbleChart from '@weknow/react-bubble-chart-d3';
import ReactDOM from "react-dom";
import ErrorBoundary from '../components/errorBoundary';

function BubbleChartComponent () {
    
    const size = '1000px';
    const bubbleClick = (label) => {
      console.log("Custom bubble click func");
    };
    const legendClick = (label) => {
      console.log("Customer legend click func");
    };
        
    return( 
        <div>
        <ErrorBoundary>
          <BubbleChart
              graph={{
                zoom: 1.1,
                offsetX: -0.05,
                offsetY: -0.01
              }}
              
              bubbleClickFunc={bubbleClick}
              legendClickFun={legendClick}
              data={[
                { label: "CRM", value: 1 },
                { label: "API", value: 1 },
                { label: "Data", value: 1 },
                { label: "Commerce", value: 1 },
                { label: "AI", value: 3 },
                { label: "Management", value: 5 },
                { label: "Testing", value: 6 },
                { label: "Mobile", value: 9 },
                { label: "Conversion", value: 9 }
                ]}
          />
        </ErrorBoundary>
    </div>
    )
        
}

export default BubbleChartComponent


 /*
    constructData = () =>{
        //this.props.sdgs.map(sdg => this.setState( {data: [data, {key:sdg.number  ,label: sdg.number, value: 0 ,color:sdg.hex}]}));    
    }
    
    countSDGs = () => {
        this.props.documents.map(element => {
            let arr = element.sdgs.split(",");
            for (let i =0 ; i < arr.length; i++){
                this.setState(prevState => ({
                    data: prevState.data.map(
                        obj => (obj.label === i+1 ? Object.assign(obj, {value: obj.value + parseInt(arr[i])/2}): obj) //hvorfor må man dele på 2 her ?!
                    )
                }));
            }
        });

    
    

    renderSDGS(){
        const sdgCounter = this.state.data.map(el=>{
            return {
                label: "SDG " + el.label.toString(),
                value: el.value,
                color: el.color
            };
        });
        
        console.log(sdgCounter);
        return (
            <div>
                <p>Halla</p> 
        </div>
  );
    }
    */