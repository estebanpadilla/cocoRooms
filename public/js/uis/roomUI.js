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
		this.isEditing = false;
	}

	addUI() {

		this.top = document.createElement('div');
		this.middle = document.createElement('div');
		this.bottom = document.createElement('div');
		this.titleTxt = document.createElement('h1');
		this.descriptionTxt = document.createElement('pre');
		this.userTxt = document.createElement('p');
		this.usersBtn = document.createElement('i');
		// this.updateBtn = document.createElement('i')	;
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
		this.middle.appendChild(this.userTxt);
		this.bottom.appendChild(this.usersBtn);
		// this.bottom.appendChild(this.updateBtn);
		this.bottom.appendChild(this.deleteBtn);
		this.bottom.appendChild(this.colorsBtn);
		this.bottom.appendChild(this.arrowBtn);

		this.titleTxt.innerHTML = this.model.title;
		this.descriptionTxt.innerHTML = this.model.description;
		this.userTxt.innerHTML = this.app.dataManager.getUserFullName(this.model.user) + ' - ' + this.model.timestamp.toLocaleDateString();

		this.titleTxt.contentEditable = this.app.dataManager.isMine(this.model.user);
		this.descriptionTxt.contentEditable = this.app.dataManager.isMine(this.model.user);;

		this.usersBtn.innerHTML = 'group';
		// this.updateBtn.innerHTML = 'edit';
		this.deleteBtn.innerHTML = 'delete';
		this.colorsBtn.innerHTML = 'color_lens';
		this.arrowBtn.innerHTML = 'arrow_forward_ios';

		this.usersBtn.className = 'usersBtn';
		this.usersBtn.hidden = !this.app.dataManager.user.isAdmin;
		// this.updateBtn.hidden = !this.app.dataManager.user.isAdmin;
		this.colorsBtn.hidden = !this.app.dataManager.user.isAdmin;
		this.deleteBtn.hidden = !this.app.dataManager.user.isAdmin;

		this.container.className = 'roomContainer';
		this.middle.className = 'middleContainer';
		this.bottom.className = 'bottomContainer';
		this.userTxt.className = 'userTxt';
		this.usersBtn.className = 'material-icons';
		// this.updateBtn.className = 'material-icons';
		this.deleteBtn.className = 'material-icons';
		this.colorsBtn.className = 'material-icons';
		this.arrowBtn.className = 'material-icons';

		this.usersBtn.classList.add('iconBtn');
		// this.updateBtn.classList.add('iconBtn');
		this.deleteBtn.classList.add('iconBtn');
		this.colorsBtn.classList.add('iconBtn');
		this.arrowBtn.classList.add('iconBtn');

		// this.top.ondblclick = this.onclick.bind(this);
		this.usersBtn.onclick = this.usersBtnClick.bind(this);
		// this.updateBtn.onclick = this.updateBtnClick.bind(this);
		this.deleteBtn.onclick = this.deleteBtnClick.bind(this);
		this.colorsBtn.onclick = this.colorsBtnClick.bind(this);
		this.arrowBtn.onclick = this.onclick.bind(this);

		this.titleTxt.onblur = this.onblur.bind(this);
		this.descriptionTxt.onblur = this.onblur.bind(this);

		this.titleTxt.onfocus = this.onfocus.bind(this);
		this.descriptionTxt.onfocus = this.onfocus.bind(this);
		this.descriptionTxt.onpaste = this.onpaste.bind(this);
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

	onblur(e) {
		this.model.title = this.titleTxt.innerHTML;
		this.model.description = this.descriptionTxt.innerHTML;
		this.app.dataManager.updateRoom(this.model);
		e.target.classList.remove('focus');
		this.isEditing = false;
	}

	onfocus(e) {
		this.isEditing = true;
		e.target.classList.add('focus');
	}

	onpaste(e) {

		var clipboardData, pastedData;

		// Get pasted data via clipboard API
		clipboardData = e.clipboardData || window.clipboardData;
		pastedData = clipboardData.getData('Text');

		if (this.validate(pastedData)) {
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

	validate(url) {
		var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
		if (pattern.test(url)) {
			return true;
		}
		return false;

	}

}