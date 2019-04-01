import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import useDraft from './hooks/useDraft';

import Config from './components/Config';
import Combinations from './components/Combinations';

function App() {
  const [properties, setProperties] = useDraft([
    // {
    //   name: 'a',
    //   values: ['1', '2']
    // },
    // {
    //   name: 'b',
    //   values: ['1', '2']
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
