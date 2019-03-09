import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import useDraft from './hooks/useDraft';

import Config from './components/Config';
import Combinations from './components/Combinations';

function App() {
  const [properties, setProperties] = useDraft([
    // {
    //   id: 0,
    //   name: 0,
    //   values: ['0,2,4,6', '1,3,5,7']
    // },
    // {
    //   id: 1,
    //   name: 1,
    //   values: ['0,1,4,5', '2,3,6,7']
    // },
    // {
    //   id: 1,
    //   name: 3,
    //   values: ['0,1,2,3', '4,5,6,7']
    // }
  ]);

  const [isValid, setIsValid] = useState(false);

  return (
    <div>
      <Config
        propertiesState={{ properties, setProperties }}
        setIsValid={setIsValid}
      />
      <Combinations properties={properties} isValid={isValid} />
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
