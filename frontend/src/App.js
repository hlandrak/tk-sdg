import './App.css';

import React, {useEffect,useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import axios from 'axios';

import TableView from './pages/tableView';
import FlowChart from './pages/flowChart';
//import BubbleChart from './pages/bubbleChart';
import BubbleChartComponent from './pages/bubbleChart';
import { Navbar,NavItem, Nav } from 'react-bootstrap';


function App () {
  const [documents, setDocuments] = useState([]);
  const [sdgs, setSdgs] = useState([]);
  const [loading, setLoading] = useState(true);

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
      console.log(documents);
  },[]);


  console.log(documents);

      
  return(
      <div>
      <h2>Trondheim kommune SDG oversikt</h2>
        <Router>
          <Navbar class="navbar navbar-expand-lg navbar-light bg-light">
            <Navbar.Collapse>
            <Nav class="mr-auto">
              <NavItem><Link to='/'> Tabell</Link></NavItem>
              <NavItem><Link to={'/bobble'} >Bobblediagram</Link></NavItem>
              <NavItem><Link to={'/flyt'} >Flytdiagram</Link></NavItem>
              </Nav>
              </Navbar.Collapse>
          </Navbar>
          <Routes>
              <Route path='/' element={<TableView documents={documents} sdgs={sdgs}/>} />
              <Route path='/bobble' element={<BubbleChartComponent  documents={documents} sdgs={sdgs}/>} />
              <Route path='/flyt' element={<FlowChart />} />
          </Routes>
      </Router>
      </div>
    )
}

export default App;




              


