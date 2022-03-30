import React,  {useEffect,useState} from 'react';

function BubbleChartComponent (props) {
    
    const [loading,setLoading] = useState(true);
    const [Data,setData] = useState([]);
    const [sdgCount,setSdgCount] = useState([]);



    useEffect(()=>{
        console.log(props.sdgCount);
        setSdgCount(props.sdgCount);
        console.log(sdgCount);
        setData([]);
    },[props.sdgCount]);

    useEffect(()=>{
        constructData();
        console.log(Data);
        setLoading(false);
    },[sdgCount]);

    function constructData (){
       
        props.sdgs.map(sdg => setData(old => [...old,{key:sdg.number,label: sdg.number, value: sdgCount[sdg.number-1] ,color:sdg.hex}]));
    }

    

    console.log(Data); 

    

    return( 
        <div>
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