import './polyfills';
import React from 'react';
import ReactDOM from 'react-dom';
import objectFitImages from 'object-fit-images';

// Any global CSS imported here should also be imported in `../.storybook/preview.js`
import './index.css';
import App from './App';

// used to ensure IE compat on object-fit styles
objectFitImages();

ReactDOM.render(<App />, document.getElementById('root'));
