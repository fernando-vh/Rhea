import React from 'react';
import ReactDOM from 'react-dom';
import Rhea from './Rhea';

import 'react-h5-audio-player/lib/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Rhea />
  </React.StrictMode>,
  document.getElementById('root')
);

