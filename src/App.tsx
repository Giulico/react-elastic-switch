import * as React from 'react';
import './App.css';

import ElasticSwitch from './components/ElasticSwitch';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="u-container">
          <ElasticSwitch />
        </div>
        <div className="u-container">
          <ElasticSwitch horizontal={true} />
        </div>
      </div>
    );
  }
}

export default App;
