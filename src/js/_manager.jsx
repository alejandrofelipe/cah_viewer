import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import alertify from 'alertify.js';

alertify
	.logPosition('bottom right')
	.maxLogItems(2)
	.cancelBtn('Cancelar');

export default class ModalManager {
	static render(selector, name, props, customFolder) {
		let M = require('./' + (customFolder || 'components') + '/' + name).default;
		this.__render(selector, M, props);
	}

	static renderComponent({name, props, selector} = {}) {
		this.render((selector || '#main'), name, null, props);
	}

	static renderElement(selector, name, props) {
		this.render(selector, name, 'elements', props);
	}

	static openModal(name, props) {
		this.__render('#modal-holder', require('./modals/modal_' + name).default, props);
	}

	static __render(selector, component, props) {
		ReactDOM.unmountComponentAtNode($(selector)[0]);
		ReactDOM.render(React.createElement(component, props || {}), $(selector)[0]);
	}
}

ModalManager.alertify = alertify;
