import React,  {useEffect,useState} from 'react';
import BubbleChart from "@weknow/react-bubble-chart-d3";import ReactDOM from "react-dom";
import ErrorBoundary from '../components/errorBoundary';

function BubbleChartComponent (props) {
    
    const [data,setData] = useState(
        ['SDG', 'x-koord', 'y-koord', 'hex', 'amount'],
        ['1',0.5,0.5,'#E5243B',0],
        ['2',1.5,0.5,'#DDA63A',0],
        ['3',0.5,1.5,'#4C9F38',0],
        ['4',1.5,1.5,'#C5192D',0],
        ['5',2.5,0.5,'#FF3A21',0],
        ['6',2.5,1.5,'#26BDE2',0],
        ['7',0.5,2.5,'#FCC30B',0],
        ['8',1.5,2.5,'#A21942',0],
        ['9',2.5,2.5,'#FD6925',0],
        ['10',3.5,0.5,'#DD1367',0],
        ['11',3.5,1.5,'#FD9D24',0],
        ['12',3.5,2.5,'#BF8B2E',0],
        ['13',0.5,3.5,'#3F7E44',0],
        ['14',1.5,3.5,'#0A97D9',0],
        ['15',2.5,3.5,'#56C02B',0],
        ['16',3.5,3.5,'#00689D',0],
        ['17',4,4,'#19486A',0],
    );
    const [loading,setLoading] =useState(true);

    useEffect(() => {
        setLoading(false);
    },[]);

    //props.documents.map((document) => document.sdg_strength.split(',').map((sdg,idx)=>)set)
    const bubbleClick = (label) => {
        console.log("Custom bubble click func");
      };
      const legendClick = (label) => {
        console.log("Customer legend click func");
      };
    
        
    
    console.log(React.version);
    return( 
        <div>
        {loading ?  <p>loading</p> :
                <BubbleChart
                graph={{
                zoom: 1
                }}
                width={1300}
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
                { label: "Front End", value: 26 },
                { label: "Content", value: 26 }
                ]}
            />
    }
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