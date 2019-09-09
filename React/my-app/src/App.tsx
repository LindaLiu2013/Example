import * as React from 'react';
import Header from './components/Header';
import InternalData  from './components/InternalData';
import BetAccount from './components/BetAccount';

import { Route } from "react-router-dom";

/*function Internal(){
  return {InternalData};
}*/

function External(){
  return <div>sdfdd</div>;
}


const App: React.FC = () => {
  return (
    <div>
  <Router>
    <Header/>
    <div>
     <Route exact path='/' component={InternalData} />
     <Route path="/external" component={BetAccount} />
    </div>
  </Router>
    </div>
  );
}

export default App;
