import React from 'react';
import './App.css';
import Data from './Data';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Data scraped</h1>
            </header>
            <main>
                <Data />
            </main>
        </div>
    );
}

export default App;