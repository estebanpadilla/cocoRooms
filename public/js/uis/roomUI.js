/**
* @name RoomUI
* @extends View
* @file roomUI.js
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/
class RoomUI extends View {
	/**
	* @param {data type} name - description.
	*/
	constructor(model, parent, app) {
		super(model, parent, app);
		this.addUI();
		this.isEdited = false;
	}

	addUI() {

		this.top = document.createElement('div');
		this.middle = document.createElement('div');
		this.bottom = document.createElement('div');
		this.iconsContainer = document.createElement('div');
		this.titleTxt = document.createElement('h1');
		this.descriptionTxt = document.createElement('pre');
		this.userTxt = document.createElement('p');
		this.usersBtn = document.createElement('i');
		this.deleteBtn = document.createElement('i');
		this.colorsBtn = document.createElement('i');
		this.arrowBtn = document.createElement('i');

		this.container.appendChild(this.top);
		this.container.style.backgroundColor = this.model.color;
		this.container.appendChild(this.middle);
		this.colorsUI = new ColorsUI(null, this.container, this.app, this.changeColor.bind(this));
		this.colorsUI.hide();
		this.container.appendChild(this.bottom);
		this.top.appendChild(this.titleTxt);
		this.top.appendChild(this.descriptionTxt);
		this.bottom.appendChild(this.userTxt);
		this.bottom.appendChild(this.iconsContainer);
		this.iconsContainer.appendChild(this.usersBtn);
		this.iconsContainer.appendChild(this.deleteBtn);
		this.iconsContainer.appendChild(this.colorsBtn);
		this.iconsContainer.appendChild(this.arrowBtn);

		this.titleTxt.innerHTML = this.model.title;
		this.descriptionTxt.innerHTML = this.model.description;
		this.userTxt.innerHTML = this.app.dataManager.getUserFullName(this.model.user) + ' - ' + this.model.timestamp.toLocaleDateString();

		this.titleTxt.contentEditable = this.app.dataManager.isMine(this.model.user);
		this.descriptionTxt.contentEditable = this.app.dataManager.isMine(this.model.user);;

		if (this.app.dataManager.isMine(this.model.user)) {
			this.usersBtn.innerHTML = 'group';
			this.deleteBtn.innerHTML = 'delete';
			this.colorsBtn.innerHTML = 'color_lens';

			this.usersBtn.className = 'material-icons';
			this.deleteBtn.className = 'material-icons';
			this.colorsBtn.className = 'material-icons';

			this.usersBtn.classList.add('iconBtn');
			this.deleteBtn.classList.add('iconBtn');
			this.colorsBtn.classList.add('iconBtn');

			this.usersBtn.onclick = this.usersBtnClick.bind(this);
			this.deleteBtn.onclick = this.deleteBtnClick.bind(this);
			this.colorsBtn.onclick = this.colorsBtnClick.bind(this);
		}

		this.arrowBtn.innerHTML = 'arrow_forward_ios';
		this.arrowBtn.className = 'material-icons';
		this.arrowBtn.classList.add('iconBtn');
		this.arrowBtn.onclick = this.onclick.bind(this);

		this.container.className = 'roomContainer';
		this.middle.className = 'middleContainer';
		this.bottom.className = 'bottomContainer';
		this.iconsContainer.className = 'iconsContainer';
		this.userTxt.className = 'userTxt';

		this.titleTxt.onblur = this.onblur.bind(this);
		this.descriptionTxt.onblur = this.onblur.bind(this);

		this.titleTxt.onfocus = this.onfocus.bind(this);
		this.descriptionTxt.onfocus = this.onfocus.bind(this);
		this.descriptionTxt.onpaste = this.onpaste.bind(this);
		this.titleTxt.onkeydown = this.onkeydown.bind(this);
		this.descriptionTxt.onkeydown = this.onkeydown.bind(this);

		if (!this.model.isUserInRoom(this.app.dataManager.user.key)) {
			this.iconsContainer.removeChild(this.arrowBtn);
		}
	}

	onclick(e) {
		this.app.dataManager.selectedRoom = this.model;
		this.app.navManager.goto('room');
	}

	usersBtnClick(e) {
		this.app.dataManager.selectedRoom = this.model;
		this.app.navManager.goto('users');
	}

	updateBtnClick(e) {
		this.app.navManager.updatingRoom(this.model);
	}

	deleteBtnClick(e) {
		if (confirm('Are you sure?')) {
			this.app.dataManager.deleteRoom(this.model);
			this.app.navManager.refresh();
		}
	}

	colorsBtnClick(e) {
		this.colorsUI.toogle();
	}

	changeColor(color) {
		this.model.color = color;
		this.app.dataManager.updateRoom(this.model);
	}

	onkeydown(e) {
		this.isEdited = true;
	}

	onblur(e) {

		if (this.isEdited) {
			this.model.title = this.titleTxt.innerHTML;
			this.model.description = this.descriptionTxt.innerHTML;
			this.app.dataManager.updateRoom(this.model);
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