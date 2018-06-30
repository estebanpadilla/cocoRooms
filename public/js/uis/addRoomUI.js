/**
* @name AddRoomUI
* @extends View
* @file addRoomUI.js
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/
class AddRoomUI extends View {
	constructor(model, parent, app) {
		super(model, parent, app);
		this.counter = 3;
		this.colors = ['#fd8a82', '#fed085', '#fffe94', '#cdfd95', '#aafeeb', '#83d9fd', '#84b3fc', '#b38bfc', '#f7bcd0', '#d7ccc9', '#cfd8dc'];
		this.addUI();
		this.hide();
		this.selectedColor = this.colors[0];
	}

	addUI() {
		this.container.className = 'addRoomContainer';
		this.top = document.createElement('div');
		this.colorsContainer = document.createElement('div');
		this.bottom = document.createElement('div');
		this.titleTxt = document.createElement('input');
		this.descriptionTxt = document.createElement('textarea');
		this.okBtn = document.createElement('button');
		this.cancelBtn = document.createElement('button');

		this.container.appendChild(this.top);
		this.container.appendChild(this.colorsContainer);
		this.container.appendChild(this.bottom);
		this.top.appendChild(this.titleTxt);
		this.top.appendChild(this.descriptionTxt);
		this.bottom.appendChild(this.okBtn);
		this.bottom.appendChild(this.cancelBtn);

		for (let i = 0; i < this.colors.length; i++) {
			var colorBtn = document.createElement('button');
			colorBtn.className = 'colorBtn';
			colorBtn.color = this.colors[i];
			colorBtn.style.backgroundColor = this.colors[i];
			this.colorsContainer.appendChild(colorBtn);
			colorBtn.onclick = this.colorBtnClick.bind(this);
		}

		this.titleTxt.placeholder = 'Title';
		this.descriptionTxt.placeholder = 'Description';
		this.okBtn.innerHTML = 'OK';
		this.cancelBtn.innerHTML = 'CANCEL';

		this.okBtn.onclick = this.okBtnClick.bind(this);
		this.cancelBtn.onclick = this.cancelBtnClick.bind(this);
	}

	okBtnClick(e) {
		if (this.titleTxt.value === '' || this.descriptionTxt.value === '') {
			alert('Oops, forgot to enter information?')
		} else {
			if (this.model) {
				this.model.title = this.titleTxt.value;
				this.model.description = this.descriptionTxt.value;
				this.model.timestamp = Date.now();
				this.model.color = this.selectedColor;
				this.app.dataManager.updateRoom(this.model);
				this.model = null;
			} else {
				this.model = new Room('--' + this.counter, this.titleTxt.value, this.descriptionTxt.value, [], [], Date.now(), this.app.dataManager.user.key, this.selectedColor);
				this.app.dataManager.addRoom(this.model);
				this.model = null;
				this.counter++;
			}
		}
	}

	cancelBtnClick(e) {
		this.hide();
		this.model = null;
		this.titleTxt.value = '';
		this.descriptionTxt.value = '';
	}

	updatingRoom(value) {
		this.show();
		this.model = value;
		this.titleTxt.value = this.model.title;
		this.descriptionTxt.value = this.model.description;
		this.selectedColor = this.model.color;
	}

	//Override methods
	hide() {
		this.container.hidden = true;
	}

	show() {
		this.container.hidden = false;
	}

	colorBtnClick(e) {
		console.log(e.target.color);
		this.selectedColor = e.target.color;
	}
}