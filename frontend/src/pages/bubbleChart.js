import React, {Component} from 'react';
import BubbleChart from "@weknow/react-bubble-chart-d3";

class BubbleChartPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            data : null
        };
    }

    
    constructData = () =>{
        console.log(this.props.sdgs);
        this.data = this.props.sdgs.map(sdg => {
            return {
                label: sdg.name,
                value:0,
                color: sdg.hex,
            };
        });
        console.log('Hei');
        /*
        for (let i = 0 ; i < this.data.length ; i++) {
            for (let j=0; j < this.props.documents.length; j++){
                this.data[i].value += this.props.documents.sdg[j];
            }
        }
        */
    }
    
    componentDidMount(){
        console.log(this.state.sdgs)
        //this.ConstructData();
        console.log(this.state.documents)
        console.log(this.state.data)
        
    }
    render(){
        return(
        <div>
            <p>Bubble chart blir lagd</p>
        </div>
        )
    }
        
}

export default BubbleChartPage;