// assets/controllers/footer_controller.js

import { Controller } from '@hotwired/stimulus';
import React from 'react';
import ReactDOM from 'react-dom';
import Footer from '../react/controllers/Footer';

export default class extends Controller {
  connect() {
    ReactDOM.render(<Footer />, this.element);
  }
  
  disconnect() {
    ReactDOM.unmountComponentAtNode(this.element);
  }
}
