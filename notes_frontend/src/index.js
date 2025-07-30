import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// Export generated components so that test and dev tools can tree-shake properly
import './components/Header';
import './components/Sidebar';
import './components/NoteEditor';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
