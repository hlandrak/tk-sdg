import './App.css';

import React, {useEffect,useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import axios from 'axios';

import TableView from './pages/tableView';
import FlowChart from './pages/flowChart';
import BubbleChartComponent from './pages/bubbleChart';

import Navigatiom from './components/navigation';

import { Navbar, Nav, Container } from 'react-bootstrap';



function App () {
  const [documents, setDocuments] = useState([]);
  const [sdgs, setSdgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sankeyData, setSankeyData] = useState([['From','To','Weight']]);
  const [sdgCount,setSdgCount] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);


  useEffect (() => {
      
      axios
      .get("http://localhost:8000/api/documents/")
      .then(function (response){ 
        setDocuments( response.data)
      })
      .catch(function(error){console.log(error)
      });
      axios.get("http://localhost:8000/api/sdgs/").then((res)=>setSdgs(res.data)).catch((err)=>console.log(err));
      setLoading(false);
  },[]);

  useEffect (() => {
    documents.map((document) => document.sdg_strength.split(',').map((sdg,ind) => setSankeyData(old => [...old,[document.name,ind.toString(),parseFloat(sdg)]])));
    countSDGs();
    
  },[documents]);

  const countSDGs = () => {
    let count = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    documents.map(element => {
        let arr = element.sdgs.split(",");
        
        for (let i =0 ; i < arr.length; i++){
            count[i] += parseFloat(arr[i]);
        }
    });

    setSdgCount(count);
}

  console.log(sdgCount);

  return(
      <div>
          <Navbar collapseOnSelect fixed='top' expand='sm' bg='dark' variant='dark'>
            <Container>
              <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
              <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className="mr-auto">
                  <Nav.Link href='/'> Tabell</Nav.Link>
                  <Nav.Link href={'/flyt'} >Flytdiagram</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        <Router>
          <Routes>
              <Route path='/' element={<TableView documents={documents} sdgs={sdgs}/>} />
              <Route path='/flyt' element={<FlowChart sankeyData={sankeyData} sdgs={sdgs}/>} />
          </Routes>
        </Router>
      </div>
    )
}

export default App;




              


