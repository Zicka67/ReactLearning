import { Controller } from '@hotwired/stimulus';
import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../react/controllers/Header';

export default class extends Controller {
  connect() {
    ReactDOM.render(<Header />, this.element);
  }
  
  disconnect() {
    ReactDOM.unmountComponentAtNode(this.element);
  }
}
