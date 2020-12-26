import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../src/Comps/Dashboard';

function App() {
  let [force, setforce] = useState(0);
  useEffect(() => {
    window.addEventListener('resize', forceRender);
    return () => { window.removeEventListener('resize', forceRender) }
  }, [])

  const forceRender = () => {
    setforce(force => force + 1);
  }

  return (
    <div className='body'>
      <Switch>
        <Route exact path='/' component={Dashboard} />
      </Switch>
    </div>
  );
}

export default App;
