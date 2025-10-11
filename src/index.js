import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { NotesProvider } from './context/NotesContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NotesProvider>
      <App />
    </NotesProvider>
  </React.StrictMode>
);


