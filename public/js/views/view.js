/**
* @name View
* @extends
* @file viewUI.js
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/
class View {
	/**
	* @param {data type} name - description.
	*/
	constructor(model, parent, app) {
		this.model = model;
		this.parent = parent;
		this.app = app;
		this.container = document.createElement('div');
		this.parent.appendChild(this.container);
	}

	hide() {
		this.container.hidden = true;
	}

	show() {
		this.container.hidden = false;
	}

	delete() {
		this.parent.innerHTML = '';
	}

	clean() {
		this.container.innerHTML = '';
	}

	refresh() {
		this.clean();
		this.addUI();
	}
}