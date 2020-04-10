import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

import React from 'react';
import Menu from '../template/Menu';
import Routes from './Routes';

const App = () => {
    return (    
        <div className="container" >
            <Menu/>
            <Routes/>
        </div>
    );
};

export default App;