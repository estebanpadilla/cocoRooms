/**
* @name ReplyUI
* @extends View
* @file replyUI.js
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/
class ReplyUI extends View {

	constructor(model, parent, app) {
		super(model, parent, app);
		this.addUI();
	}

	addUI() {

		this.bodyTxt = document.createElement('pre');
		this.userTxt = document.createElement('p');

		this.container.appendChild(this.bodyTxt);
		this.container.appendChild(this.userTxt);

		this.bodyTxt.className = 'replyUI_bodyTxt';
		this.container.className = 'replyContainer';
		this.userTxt.className = 'userTxt';

		this.bodyTxt.innerHTML = this.model.body;
		this.userTxt.innerHTML = this.app.dataManager.getUserFullName(this.model.user) + ' - ' + this.model.timestamp.toLocaleDateString();
	}
}