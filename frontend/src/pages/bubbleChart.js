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
