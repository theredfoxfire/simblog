/*eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';
import BlogView from './blog/BlogView';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <BlogView endpoint="/data/articles.json" />,
    document.querySelector('#app'),
  );

});
