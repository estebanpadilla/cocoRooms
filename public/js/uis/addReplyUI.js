/**
* @name AddReplyUI
* @extends View
* @file addReplyUI.js
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/
class AddReplyUI extends View {
	constructor(model, parent, app, color) {
		super(model, parent, app);
		this.addUI();
		this.hide();
		this.color = color;
	}

	addUI() {
		this.container.className = 'addReplyContainer';
		// this.top = document.createElement('div');
		this.bottom = document.createElement('div');
		this.bodyTxt = document.createElement('textarea');
		this.okBtn = document.createElement('button');
		this.cancelBtn = document.createElement('button');

		this.container.appendChild(this.bodyTxt);
		this.container.appendChild(this.bottom);
		// this.top.appendChild(this.bodyTxt);
		this.bottom.appendChild(this.okBtn);
		this.bottom.appendChild(this.cancelBtn);

		this.bodyTxt.placeholder = 'Body';
		this.okBtn.innerHTML = 'OK';
		this.cancelBtn.innerHTML = 'CANCEL';

		this.okBtn.className = 'okBtn';
		this.cancelBtn.className = 'cancelBtn';

		this.okBtn.onclick = this.okBtnClick.bind(this);
		this.cancelBtn.onclick = this.cancelBtnClick.bind(this);
		this.container.style.backgroundColor = this.color;

		// this.container.style.backgroundColor = this.app.dataManager.selectedRoom.color;
	}

	okBtnClick(e) {
		if (this.bodyTxt.value === '') {
			alert('Oops, forgot to enter information?')
		} else {

			var reply = new Reply('', this.bodyTxt.value, this.app.dataManager.user.key, Date.now());
			if (this.model.replies) {
				reply.key = this.model.replies.length;
				this.model.replies.push(reply);
			} else {
				reply.key = 0;
				this.model.replies = [];
				this.model.replies.push(reply);
			}

			this.app.dataManager.updatePost(this.model);
		}
	}

	cancelBtnClick(e) {
		this.hide();
		this.bodyTxt.value = '';
	}

	//Override methods
	hide() {
		this.container.hidden = true;
	}

	show() {
		this.container.hidden = false;
	}

	toogle() {
		this.container.hidden = !this.container.hidden;
	}
}