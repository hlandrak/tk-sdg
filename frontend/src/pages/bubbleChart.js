import React, {Component} from 'react';

class BubbleChart extends Component{
    constructor(props){
        super(props);
        this.state = {
        };
    }


    componentDidMount(){
        console.log(this.props)
    }
    render(){
        return(
        <div>
            <p>Bubble chart blir lagd</p>
        </div>
        )
    }
        
}

export default BubbleChart;