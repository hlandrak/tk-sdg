import './App.css';
import React, {Component} from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import axios from 'axios';

import TableView from './pages/tableView';
import FlowChart from './pages/flowChart';
import BubbleChart from './pages/bubbleChart';


class App extends Component {
  constructor(props) {
    super(props);
    //Each document is a object, same for sdg. 
    //Attributes for documents: name, url, sdgs, sdgs_strength. Two last is saved as a commasepeareted integer string, and comma separeted float string
    //attributes for sdg: number, descriptions 

    this.state = {
      documents: [],
      sdgs: [],
    };
  }

componentDidMount() {
  this.refresh();
}

refresh = () => {
  axios.get("http://localhost:8000/api/documents/").then((res)=> this.setState({documents: res.data})).catch((err)=>console.log(err));
  axios.get("http://localhost:8000/api/sdgs/").then((res)=> this.setState({sdg: res.data})).catch((err)=>console.log(err));
  console.log("denne kjører");
};



  render() {
    console.log(this.state.documents);
    return(
      <div>
      <h2>Trondheim kommune SDG oversikt</h2>
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/tabel'} className="nav-link"> Tabell</Link></li>
            <li><Link to={'/bobble'} className="nav-link">Bobblediagram</Link></li>
            <li><Link to={'/flyt'} className="nav-link">Flytdiagram</Link></li>
          </ul>
          </nav>
          <Routes>
              <Route path='/tabel' element={<TableView/>} />
              <Route path='/bobble' element={<BubbleChart/>} />
              <Route path='/flyt' element={<FlowChart/>} />
          </Routes>
      </Router>
      </div>
    )
  }
}

export default App;
