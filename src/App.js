import './App.css';

import React, {useEffect,useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import axios from 'axios';

import TableView from './pages/tableView';
import FlowChart from './pages/flowChart';
//import BubbleChart from './pages/bubbleChart';
import BubbleChartComponent from './pages/bubbleChart';


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
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <ul class="navbar-nav mr-auto">
              <li class='nav-item'><Link to='/'> Tabell</Link></li>
              <li class='nav-item'><Link to={'/bobble'} >Bobblediagram</Link></li>
              <li class='nav-item'><Link to={'/flyt'} >Flytdiagram</Link></li>
            </ul>
          </nav>
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




              


