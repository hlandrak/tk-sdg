import './App.css';
import React, {Component} from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import TableView from './components/tableView';
import FlowChart from './components/flowChart';
import BubbleChart from './components/bubbleChart';


class App extends Component {
  constructor(props) {
    super(props);
    
    /*this.state = {
      documents: document,
      sdgs: sdg,
    };*/
  }



  render() {
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
