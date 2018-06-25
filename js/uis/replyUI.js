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

		this.container.className = 'replyContainer';

		this.bodyTxt = document.createElement('p');

		this.container.appendChild(this.bodyTxt);

		this.bodyTxt.innerHTML = model.body;

	}
}