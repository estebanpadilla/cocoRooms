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
		this.isEdited = false;
	}

	addUI() {

		this.addReplyUI = null;

		this.top = document.createElement('div');
		this.middle = document.createElement('div');
		this.repliesContainer = document.createElement('div');
		this.bottom = document.createElement('div');
		this.iconsContainer = document.createElement('div');
		this.titleTxt = document.createElement('h1');
		this.descriptionTxt = document.createElement('pre');
		this.userTxt = document.createElement('p');
		this.replyBtn = document.createElement('i');
		this.deleteBtn = document.createElement('i');

		this.container.appendChild(this.top);
		this.container.appendChild(this.middle);
		this.container.appendChild(this.repliesContainer);
		this.container.appendChild(this.bottom);
		this.top.appendChild(this.titleTxt);
		this.top.appendChild(this.descriptionTxt);
		this.bottom.appendChild(this.userTxt);
		this.bottom.appendChild(this.iconsContainer);
		this.iconsContainer.appendChild(this.deleteBtn);
		this.iconsContainer.appendChild(this.replyBtn);


		this.titleTxt.innerHTML = this.model.title;
		this.descriptionTxt.innerHTML = this.model.body;
		this.userTxt.innerHTML = this.app.dataManager.getUserFullName(this.model.user) + ' - ' + this.model.timestamp.toLocaleDateString();

		this.titleTxt.contentEditable = this.app.dataManager.isMine(this.model.user);
		this.descriptionTxt.contentEditable = this.app.dataManager.isMine(this.model.user);;

		this.replyBtn.innerHTML = 'comment';
		this.replyBtn.onclick = this.replyBtnClick.bind(this);
		this.replyBtn.className = 'material-icons';
		this.replyBtn.classList.add('iconBtn');

		if (this.app.dataManager.isMine(this.model.user)) {
			this.deleteBtn.innerHTML = 'delete';
			this.deleteBtn.onclick = this.deleteBtnClick.bind(this);
			this.deleteBtn.className = 'material-icons';
			this.deleteBtn.classList.add('iconBtn');
		}

		this.container.className = 'postContainer';
		this.middle.className = 'middleContainer';
		this.repliesContainer.className = 'repliesContainer';
		this.bottom.className = 'bottomContainer';
		this.userTxt.className = 'userTxt';

		this.titleTxt.onblur = this.onblur.bind(this);
		this.descriptionTxt.onblur = this.onblur.bind(this);

		this.titleTxt.onfocus = this.onfocus.bind(this);
		this.descriptionTxt.onfocus = this.onfocus.bind(this);
		this.descriptionTxt.onpaste = this.onpaste.bind(this);
		this.titleTxt.onkeydown = this.onkeydown.bind(this);
		this.descriptionTxt.onkeydown = this.onkeydown.bind(this);

		this.addReplies();

		this.container.style.backgroundColor = this.app.dataManager.selectedRoom.color;

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
		// this.addReplyUI.show();
		this.addReplyUI.toogle();
	}

	updateBtnClick(e) {
		this.app.navManager.updatingPost(this.model);
	}

	deleteBtnClick(e) {
		if (confirm('Are yuo sure?')) {
			this.app.dataManager.deletePost(this.model);
		}
	}

	onkeydown(e) {
		this.isEdited = true;
	}

	onblur(e) {

		if (this.isEdited) {
			this.model.title = this.titleTxt.innerHTML;
			this.model.body = this.descriptionTxt.innerHTML;
			this.app.dataManager.updateRoom(this.app.dataManager.selectedRoom);
			e.target.classList.remove('focus');
		}

		this.isEdited = false;
	}

	onfocus(e) {
		e.target.classList.add('focus');
	}

	onpaste(e) {

		var clipboardData, pastedData;

		// Get pasted data via clipboard API
		clipboardData = e.clipboardData || window.clipboardData;
		pastedData = clipboardData.getData('Text');

		if (this.app.dataManager.validateURL(pastedData)) {
			// Stop data actually being pasted into div
			e.stopPropagation();
			e.preventDefault();

			console.log(pastedData);
			var text = this.descriptionTxt.innerHTML;
			this.descriptionTxt.innerHTML = '';
			text += "<a href=" + pastedData + ' contentEditable="false">' + pastedData + '</a>';
			this.descriptionTxt.innerHTML = text;
		}
	}
}