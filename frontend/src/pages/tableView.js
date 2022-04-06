import React, {useEffect, useState} from 'react';


import SdgPerPage from '../components/sdgPerPage';

import './tableView.css';
import { Modal, Button, ButtonGroup, ToggleButton } from "react-bootstrap";
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);



function TableView (props) {
    const [name,setName] = useState(0);
    const[url,setUrl] = useState(0);

    const [sdgStrength,setSdgStrength] = useState(0);

    const [sdg1,setSdg1] = useState(0);
    const [sdg2,setSdg2] = useState(0);
    const [sdg3,setSdg3] = useState(0);
    const [sdg4,setSdg4] = useState(0);
    const [sdg5,setSdg5] = useState(0);
    const [sdg6,setSdg6] = useState(0);
    const [sdg7,setSdg7] = useState(0);
    const [sdg8,setSdg8] = useState(0);
    const [sdg9,setSdg9] = useState(0);
    const [sdg10,setSdg10] = useState(0);
    const [sdg11,setSdg11] = useState(0);
    const [sdg12,setSdg12] = useState(0);
    const [sdg13,setSdg13] = useState(0);
    const [sdg14,setSdg14] = useState(0);
    const [sdg15,setSdg15] = useState(0);
    const [sdg16,setSdg16] = useState(0);
    const [sdg17,setSdg17] = useState(0);
    const [barData,setBarData] = useState(0);
    const [documentSdgData,setDocuments] = useState([1,1,1,1]);


    const[showModal,setShowModal] = useState(false);
    const[showModalHelp,setShowModalHelp] = useState(false);


    useEffect(()=>{
        setBarData({labels:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17'],
                datasets:[
                    {data: sdgStrength,
                    backgroundColor: colors,
                    label: null
                    }
                ]})
        setShowModal(showModalHelp);
  

    },[showModalHelp]);    
    
    const rowEvent = (document)=> {
        console.log(props.sdgCount);
        /*
        Setting sdg counts, and urls and for the construction for the bar charts for each sdg in the modal
        */
        console.log(document.name);
        setName(document.name);
        setUrl(document.url);
        setSdgStrength(document.sdg_strength.split(','));
        setDocuments([document.sdg1,document.sdg2,document.sdg3,document.sdg4,document.sdg5,document.sdg6,document.sdg7,document.sdg8,
            document.sdg9,document.sdg10,document.sdg11,document.sdg12,document.sdg13,document.sdg14,document.sdg15,document.sdg16,document.sdg17]);
        setSdg1(document.sdg1);
        setSdg2(document.sdg2);
        setSdg3(document.sdg3);
        setSdg4(document.sdg4);
        setSdg5(document.sdg5);
        setSdg6(document.sdg6);
        setSdg7(document.sdg7);
        setSdg8(document.sdg8);
        setSdg9(document.sdg9);
        setSdg10(document.sdg10);
        setSdg11(document.sdg11);
        setSdg12(document.sdg12);
        setSdg13(document.sdg13);
        setSdg14(document.sdg14);
        setSdg15(document.sdg15);
        setSdg16(document.sdg16);
        setSdg17(document.sdg17);
        setShowModalHelp(true);

    }


   
    const [checked,setChecked] = useState(true)
    const colors = props.sdgs.map(e => e.hex);
    const sdgNames = props.sdgs.map(e => e.description);    
   
    const onHide = (e) => {
        setChecked(true);
        setShowModal(false);
        setShowModalHelp(false);
    }
    return(
    <div className='table'>
     
        <table className="table table-bordered" data-filter-control="true" data-show-search-clear-button="true">
            <thead>
                <tr>
                    <th key={0}>Dokumentnavn</th>
                    {props.sdgs.map((sdg)=>(
                    <th key={sdg.id} style={{backgroundColor: sdg.hex}}>{sdg.number}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {props.documents.map((document)=>(
                    <tr key={document.id} onClick={()=>rowEvent(document)}>
                        <td className="column2" >{document.name} </td>
                        <td className="column" style={{backgroundColor: document.sdgs.split(",")[0] == 1 ? colors[0] : "#FFFFFF"}}></td>
                        <td className="column" style={{backgroundColor: document.sdgs.split(",")[1] == 1 ? colors[1] : "#FFFFFF"}}></td>
                        <td className="column" style={{backgroundColor: document.sdgs.split(",")[2] == 1 ? colors[2] : "#FFFFFF"}}></td>
                        <td className="column" style={{backgroundColor: document.sdgs.split(",")[3] == 1 ? colors[3] : "#FFFFFF"}}></td>
                        <td className="column" style={{backgroundColor: document.sdgs.split(",")[4] == 1 ? colors[4] : "#FFFFFF"}}></td>
                        <td className="column" style={{backgroundColor: document.sdgs.split(",")[5] == 1 ? colors[5] : "#FFFFFF"}}></td>
                        <td className="column" style={{backgroundColor: document.sdgs.split(",")[6] == 1 ? colors[6] : "#FFFFFF"}}></td>
                        <td className="column" style={{backgroundColor: document.sdgs.split(",")[7] == 1 ? colors[7] : "#FFFFFF"}}></td>
                        <td className="column" style={{backgroundColor: document.sdgs.split(",")[8] == 1 ? colors[8] : "#FFFFFF"}}></td>
                        <td className="column" style={{backgroundColor: document.sdgs.split(",")[9] == 1 ? colors[9] : "#FFFFFF"}}></td>
                        <td className="column" style={{backgroundColor: document.sdgs.split(",")[10] == 1 ? colors[10] : "#FFFFFF"}}></td>
                        <td className="column" style={{backgroundColor: document.sdgs.split(",")[11] == 1 ? colors[11] : "#FFFFFF"}}></td>
                        <td className="column" style={{backgroundColor: document.sdgs.split(",")[12] == 1 ? colors[12] : "#FFFFFF"}}></td>
                        <td className="column" style={{backgroundColor: document.sdgs.split(",")[13] == 1 ? colors[13] : "#FFFFFF"}}></td>
                        <td className="column" style={{backgroundColor: document.sdgs.split(",")[14] == 1 ? colors[14] : "#FFFFFF"}}></td>
                        <td className="column" style={{backgroundColor: document.sdgs.split(",")[15] == 1 ? colors[15] : "#FFFFFF"}}></td>
                        <td className="column" style={{backgroundColor: document.sdgs.split(",")[16] == 1 ? colors[16] : "#FFFFFF"}}></td>
                    </tr>
                    ))}</tbody>
        </table>
        
        {showModal ?
        <div> 
            <Modal show={showModal} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>{name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                    <ButtonGroup className="mb-2">
                        
                        <ToggleButton
                            id='toggle-check'
                            type='checkbox'
                            variant={checked ? 'secondary' :'primary'}
                            checked={checked}
                            value="1"
                            onChange={(e) =>setChecked(e.currentTarget.checked)}
                        >
                        {checked ? 'Total SDG stryke':'SDG styrke per side og SDG'}
                        </ToggleButton>
                        
                    </ButtonGroup>
                    </>
                    {checked ? 
                    <Bar 
                        
                        data={barData}
                        
                        options={{
                            plugins:{
                              title:'SDG styrke for hele dokumentet per SDG',
                              legend: {position: 'none',display: false},
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
                    /> : 
                   <SdgPerPage
                        colors={colors}
                        documentSdgData={documentSdgData}
                        sdgNames={sdgNames}
                   />
                    }
                    <a href={url}>Link til dokumentet</a>   
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => onHide()}>
                    Lukk
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
        : <></>}
    </div>
    )
}


    
export default TableView;