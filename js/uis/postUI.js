/**
* @name PostUI
* @extends View
* @file postUI.js
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/
class PostUI extends View {

	constructor(model, parent, app) {
		super(model, parent, app);

		this.container.className = 'postContainer';

		this.top = document.createElement('div');
		this.repliesContainer = document.createElement('div');
		this.bottom = document.createElement('div');
		this.titleTxt = document.createElement('h1');
		this.descriptionTxt = document.createElement('p');
		this.replyBtn = document.createElement('button');
		this.updateBtn = document.createElement('button');
		this.deleteBtn = document.createElement('button');

		this.container.appendChild(this.top);
		this.container.appendChild(this.bottom);
		this.container.appendChild(this.repliesContainer);
		this.top.appendChild(this.titleTxt);
		this.top.appendChild(this.descriptionTxt);
		this.bottom.appendChild(this.replyBtn);
		this.bottom.appendChild(this.updateBtn);
		this.bottom.appendChild(this.deleteBtn);

		this.titleTxt.innerHTML = model.title;
		this.descriptionTxt.innerHTML = model.body;

		this.repliesContainer.className = 'repliesContainer';
		this.replyBtn.innerHTML = 'REPLY';
		this.updateBtn.innerHTML = 'UPDATE';
		this.deleteBtn.innerHTML = 'DELETE';

		this.replyBtn.onclick = this.replyBtnClick.bind(this);
		this.updateBtn.onclick = this.updateBtnClick.bind(this);
		this.deleteBtn.onclick = this.deleteBtnClick.bind(this);

		this.addReplies();
	}

	addReplies() {
		this.model.replies.forEach(reply => {
			var replyUI = new ReplyUI(reply, this.repliesContainer, this.app);
		});
	}

	replyBtnClick(e) {

	}

	updateBtnClick(e) {
		this.app.navManager.updatingPost(this.model);
	}

	deleteBtnClick(e) {
		this.app.dataManager.deletePost(this.model);
		this.app.navManager.refresh();
	}
}