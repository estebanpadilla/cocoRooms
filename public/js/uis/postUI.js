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
		this.addUI();

	}

	addUI() {

		this.addReplyUI = null;

		this.top = document.createElement('div');
		this.middle = document.createElement('div');
		this.repliesContainer = document.createElement('div');
		this.bottom = document.createElement('div');
		this.titleTxt = document.createElement('h1');
		this.descriptionTxt = document.createElement('pre');
		this.userTxt = document.createElement('p');
		this.replyBtn = document.createElement('i');
		this.updateBtn = document.createElement('i');
		this.deleteBtn = document.createElement('i');

		this.container.appendChild(this.top);
		this.container.appendChild(this.middle);
		this.container.appendChild(this.repliesContainer);
		this.container.appendChild(this.bottom);
		this.top.appendChild(this.titleTxt);
		this.top.appendChild(this.descriptionTxt);
		this.middle.appendChild(this.userTxt);
		this.bottom.appendChild(this.replyBtn);
		this.bottom.appendChild(this.updateBtn);
		this.bottom.appendChild(this.deleteBtn);

		this.titleTxt.innerHTML = this.model.title;
		this.descriptionTxt.innerHTML = this.model.body;
		this.userTxt.innerHTML = this.app.dataManager.getUserFullName(this.model.user) + ' - ' + this.model.timestamp.toLocaleDateString();

		this.replyBtn.innerHTML = 'reply';
		this.updateBtn.innerHTML = 'edit';
		this.deleteBtn.innerHTML = 'delete';

		this.replyBtn.onclick = this.replyBtnClick.bind(this);
		this.updateBtn.onclick = this.updateBtnClick.bind(this);
		this.deleteBtn.onclick = this.deleteBtnClick.bind(this);

		this.replyBtn.className = 'material-icons';
		this.updateBtn.className = 'material-icons';
		this.deleteBtn.className = 'material-icons';
		this.replyBtn.classList.add('iconBtn');
		this.updateBtn.classList.add('iconBtn');
		this.deleteBtn.classList.add('iconBtn');

		this.container.className = 'postContainer';
		this.middle.className = 'middleContainer';
		this.repliesContainer.className = 'repliesContainer';
		this.bottom.className = 'bottomContainer';
		this.userTxt.className = 'userTxt';

		if (!this.app.dataManager.isMine(this.model.user)) {
			this.updateBtn.hidden = true;
			this.deleteBtn.hidden = true;
		}

		this.addReplies();
	}

	addReplies() {
		if (this.model.replies) {
			this.model.replies.forEach(reply => {
				var replyUI = new ReplyUI(reply, this.repliesContainer, this.app);
			});
		}

		this.addReplyUI = new AddReplyUI(this.model, this.container, this.app);
	}

	replyBtnClick(e) {
		this.addReplyUI.show();
	}

	updateBtnClick(e) {
		this.app.navManager.updatingPost(this.model);
	}

	deleteBtnClick(e) {
		if (confirm('Are yuo sure?')) {
			this.app.dataManager.deletePost(this.model);
		}
	}
}