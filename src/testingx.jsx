import React, { useState, useEffect } from 'react';
import {
  Button, DatePicker, Input, version,
} from 'antd';
import 'antd/dist/antd.css';

import './index.css';
import logo from './logo.svg';
import './App.css';

function App(props) {
  console.log(props);
  const [num, setNum] = useState(1);
  const [state, setState] = useState({ name: 'Alex', lastName: 'Gusev' });

  useEffect(() => {
    console.log('num changed');
  }, [num]);

  useEffect(() => {
    console.log(123);
    // Обновляем заголовок документа с помощью API браузера
    document.title = state.name;
    return () => {
      console.log(11);
    };
  }, [state]);

  useEffect(() => {
    console.log('Монтируется в самом начале');
    return () => {
      console.log('И размонтируется в самом конце');
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit
          {' '}
          <code>src/App.js</code>
          {' '}
          and save to reload.
        </p>
        <h1>
          Hello
          {' '}
          { num }
        </h1>
        <button onClick={() => setNum(num + 1)} type="button">Click me and add</button>
        <p>
          My name is
          {' '}
          { state.name }
          , and last name is
          {' '}
          { state.lastName }
        </p>
        <Input type="text" value={state.name} onChange={({ target: { value } }) => setState({ ...state, name: value })} />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <div className="App">
        <h1>
          antd version:
          {' '}
          {version}
        </h1>
        <DatePicker />
        <Button type="primary" style={{ marginLeft: 8 }}>
          Primary Button
        </Button>
      </div>
    </div>
  );
}

export default App;
