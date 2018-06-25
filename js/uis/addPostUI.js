/**
* @name AddPostUI
* @extends View
* @file addPostUI.js
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/
class AddPostUI extends View {
	constructor(model, parent, app) {
		super(model, parent, app);
		this.addUI();
		this.hide();
	}

	addUI() {
		this.container.className = 'addPostContainer';
		this.top = document.createElement('div');
		this.bottom = document.createElement('div');
		this.titleTxt = document.createElement('input');
		this.bodyTxt = document.createElement('textarea');
		this.okBtn = document.createElement('button');
		this.cancelBtn = document.createElement('button');

		this.container.appendChild(this.top);
		this.container.appendChild(this.bottom);
		this.top.appendChild(this.titleTxt);
		this.top.appendChild(this.bodyTxt);
		this.bottom.appendChild(this.okBtn);
		this.bottom.appendChild(this.cancelBtn);

		this.titleTxt.placeholder = 'Title';
		this.bodyTxt.placeholder = 'Body';
		this.okBtn.innerHTML = 'OK';
		this.cancelBtn.innerHTML = 'CANCEL';

		this.okBtn.onclick = this.okBtnClick.bind(this);
		this.cancelBtn.onclick = this.cancelBtnClick.bind(this);
	}

	okBtnClick(e) {
		if (this.titleTxt.value === '' || this.bodyTxt.value === '') {
			alert('Oops, forgot to enter information?')
		} else {
			if (this.model) {
				this.model.title = this.titleTxt.value;
				this.model.body = this.bodyTxt.value;
				this.model.timestamp = Date.now();
				// this.app.dataManager.updatePost(this.model);
				this.app.navManager.refresh();
				this.model = null;
			} else {
				this.model = new Post('', this.titleTxt.value, this.bodyTxt.value, [], Date.now());
				this.app.dataManager.addPost(this.model);
				this.app.navManager.refresh();
				this.model = null;
			}
		}
	}

	cancelBtnClick(e) {
		this.hide();
		this.model = null;
		this.titleTxt.value = '';
		this.bodyTxt.value = '';
	}

	updatingPost(value) {
		this.show();
		this.model = value;
		this.titleTxt.value = this.model.title;
		this.bodyTxt.value = this.model.body;
	}

	//Override methods
	hide() {
		this.container.hidden = true;
	}

	show() {
		this.container.hidden = false;
	}
}