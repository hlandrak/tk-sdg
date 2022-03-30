import './App.css';

import React, {useEffect,useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import axios from 'axios';

import TableView from './pages/tableView';
import FlowChart from './pages/flowChart';
import Home from './pages/home';


import { Navbar, Nav, Container } from 'react-bootstrap';



function App () {
  const [documents, setDocuments] = useState([]);
  const [sdgs, setSdgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sankeyData, setSankeyData] = useState([['From','To','Weight']]);
  const [sdgCount,setSdgCount] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);


  useEffect (() => {
      /*
      fetching data from bakcend with axios
      */
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
    /*
    waiting for the fetching of data from backend before making the data structure for the sankey chart
    */
    documents.map((document) => document.sdg_strength.split(',').map((sdg,ind) => setSankeyData(old => [...old,[document.name,ind.toString(),parseFloat(sdg)]])));

  },[documents]);



  
  return(
      <div>
          <Navbar collapseOnSelect fixed='top' expand='sm' bg='dark' variant='dark'>
            <Container>
              <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
              <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className="mr-auto">
                  <Nav.Link href='/'> Hjem</Nav.Link>
                  <Nav.Link href='/tabel'> Tabell</Nav.Link>
                  <Nav.Link href={'/flyt'} >Flytdiagram</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        <Router>
          <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/tabel' element={<TableView documents={documents} sdgs={sdgs}/>} />
              <Route path='/flyt' element={<FlowChart sankeyData={sankeyData} sdgs={sdgs}/>} />
          </Routes>
        </Router>
      </div>
    )
}

export default App;




              


