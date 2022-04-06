import './App.css';

import React, {useEffect,useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import axios from 'axios';

import TableView from './pages/tableView';
import FlowChart from './pages/flowChart';
import Home from './pages/home';
import PieChartPage from './pages/pieChart';
import FooterPage from './components/footer';

import { Navbar, Nav, Container } from 'react-bootstrap';




function App () {
  const [documents, setDocuments] = useState([]);
  const [sdgs, setSdgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sankeyData, setSankeyData] = useState([['From','To','Weight']]);
  const [sdgCount,setSdgCount] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  const [pieData,setPieData] =useState(1);
  const [colors,setColors] = useState([]);
  const [labels,setLabels] = useState([]);

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
  },[]);

  useEffect (() => {
    /*
    waiting for the fetching of data from backend before making the data structure for the sankey chart
    */
    
    documents.map((document) => document.sdg_strength.split(',').map((sdg,ind) => {
      if(parseFloat(sdg)>0){
        setSankeyData(old => [...old,[document.name,ind.toString(),parseFloat(sdg)]])
      }}
        ));
    documents.map((document) => document.sdg_strength.split(',').map((sdg,ind)=>setSdgCount(existingItems  => [...existingItems.slice(0,ind),existingItems[ind]+parseFloat(sdg),...existingItems.slice(ind+1)])));
    sdgs.map(e => setColors(old => [...old,e.hex]));
    sdgs.map(e => setLabels(old => [...old,e.description]))
  },[documents,sdgs]);

  useEffect(()=> {
    /*
    waiting for sdgCount to finish
    */
    setPieData([{
      labels  : labels,
      datasets: [
          {
              label:'SDG styrke',
              data: sdgCount,
              backgroundColor: colors
          }]}]);
    console.log(colors);
  },[sdgCount,colors,labels]);


  
  useEffect(()=>{
    setLoading(false);
    console.log(pieData);
  },[pieData]);


  
  
  return(
    <div>
      <div>
          <Navbar collapseOnSelect fixed='top' expand='sm' bg='secondary' variant='dark'>
            <Container>
              <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
              <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className="mr-auto">
                  <Nav.Link href='/'> Hjem</Nav.Link>
                  <Nav.Link href='/tabell'> Tabell</Nav.Link>
                  <Nav.Link href={'/flyt'} >Flytdiagram</Nav.Link>
                  <Nav.Link href={'/kake'} >Kakediagram</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        <Router>
          <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/tabell' element={<TableView documents={documents} sdgs={sdgs} />} />
              <Route path='/flyt' element={<FlowChart sankeyData={sankeyData} sdgs={sdgs}/>} />
              <Route path='/kake' element={<PieChartPage pieData={pieData} sdgs={sdgs} loading={loading}/>} />
          </Routes>
        </Router>

        
      </div>
        <div className='footer'>
          <FooterPage></FooterPage>
        </div>
    </div>
    )
}

export default App;




              


