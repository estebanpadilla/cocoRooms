/**
* @name ColorsUI
* @extends View
* @file colorsUI.js
* @author Add Your Name Here <addyouremail@gmail.com>
* @version 1.0.0
*/
class ColorsUI extends View {

	constructor(model, parent, app, callback) {
		super(model, parent, app);
		this.callback = callback;
		this.isShowing = false;
		this.colors = ['#fd8a82', '#fed085', '#fffe94', '#cdfd95', '#aafeeb', '#83d9fd', '#84b3fc', '#b38bfc', '#f7bcd0', '#d7ccc9', '#cfd8dc'];

		this.addUI();

	}

	addUI() {

		this.container.className = 'colorsContainer';
		for (let i = 0; i < this.colors.length; i++) {
			var colorBtn = document.createElement('button');
			colorBtn.className = 'colorBtn';
			colorBtn.color = this.colors[i];
			colorBtn.style.backgroundColor = this.colors[i];
			this.container.appendChild(colorBtn);
			colorBtn.onclick = this.colorBtnClick.bind(this);
		}
	}

	toogle() {
		this.isShowing = !this.isShowing;
		if (!this.isShowing) {
			this.hide();
		} else {
			this.show();
		}
	}

	colorBtnClick(e) {
		this.toogle();
		this.callback(e.target.color);
	}
}

