import React, {Component} from 'react';
import BubbleChart from '@weknow/react-bubble-chart-d3';


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
        <BubbleChart
        graph={{
          zoom: 1
        }}
        width={size.width}
        height={1300}
        padding={0} // optional value, number that set the padding between bubbles
        showLegend={false} // optional value, pass false to disable the legend.
        legendPercentage={20} // number that represent the % of with that legend going to use.
        legendFont={{
          family: "Arial",
          size: 12,
          color: "#000",
          weight: "bold"
        }}
        valueFont={{
          family: "Arial",
          size: 12,
          color: "#fff",
          weight: "bold"
        }}
        labelFont={{
          family: "Arial",
          size: 16,
          color: "#fff",
          weight: "bold"
        }}
        //Custom bubble/legend click functions such as searching using the label, redirecting to other page
        bubbleClickFunc={bubbleClick()}
        legendClickFun={legendClick()}
        data={[
          { label: "CRM", value: 1 },
          { label: "API", value: 1 },
          { label: "Data", value: 1 },
          { label: "Commerce", value: 1 },
          { label: "AI", value: 3 },
          { label: "Management", value: 5 },
          { label: "Testing", value: 6 },
          { label: "Mobile", value: 9 },
          { label: "Conversion", value: 9 },
          { label: "Misc", value: 21 },
          { label: "Databases", value: 22 },
          { label: "DevOps", value: 22 },
          { label: "Javascript", value: 23 },
          { label: "Languages / Frameworks", value: 25 },
          { label: "Front End", value: "26" },
          { label: "Content", value: 26 }
        ]}
      />
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