/**
* @name LoginView
* @extends View
* @file loginView.js
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/
class LoginView extends View {

	constructor(model, parent, app) {
		super(model, parent, app);
		this.addUI();
	}

	addUI() {
		this.userNameTxt = document.createElement('input');
		this.passwordTxt = document.createElement('input');
		this.loginBtn = document.createElement('button');
		this.registerUPBtn = document.createElement('button');
		this.signOUTBtn = document.createElement('button');

		this.container.appendChild(this.userNameTxt);
		this.container.appendChild(this.passwordTxt);
		this.container.appendChild(this.loginBtn);
		this.container.appendChild(this.registerUPBtn);
		this.container.appendChild(this.signOUTBtn);

		this.userNameTxt.placeholder = 'Username';
		this.passwordTxt.placeholder = 'Password';
		this.passwordTxt.type = 'password';
		this.loginBtn.innerText = 'LOGIN';
		this.registerUPBtn.innerText = 'REGISTER';
		this.signOUTBtn.innerText = 'SIGN OUT';

		this.loginBtn.onclick = this.loginBtnClick.bind(this);
		this.registerUPBtn.onclick = this.registerUPBtnClick.bind(this);
		// this.signOUTBtn.onclick = this.signOUTBtnClick.bind(this);

		// if (this.app.dataManager.setCurrentUser()) {
		// this.app.navManager.goto('rooms');
		// }
	}

	loginBtnClick(e) {

		var email = this.userNameTxt.value;
		var password = this.passwordTxt.value;
		var auth = firebase.auth();
		var promise = auth.signInWithEmailAndPassword(email, password);

		promise.then(this.singSuccesfull.bind(this));
		promise.catch(e => {
			alert('Register please!');
			console.log(e.message)
		});

		// if (this.app.dataManager.validateUser(this.userNameTxt.value, this.passwordTxt.value)) {
		//this.app.navManager.goto('rooms');
		// }
	}

	singSuccesfull() {
		if (this.app.dataManager.setCurrentUser()) {
			this.app.navManager.goto('rooms');
			this.app.dataManager.requestInitialData();
		} else {
			alert('Register Please');
		}
	}

	registerSuccesfull() {
		var email = this.userNameTxt.value;
		var user = new User(null, '', '', email, '', false);
		this.app.dataManager.registerUser(user);
	}

	registerError() {
		// console.log(e.message);
		var email = this.userNameTxt.value;
		var user = new User(null, '', '', email, '', false);
		this.app.dataManager.registerUser(user);
	}

	registerUPBtnClick() {
		var email = this.userNameTxt.value;
		var password = this.passwordTxt.value;
		var auth = firebase.auth();
		var promise = auth.createUserWithEmailAndPassword(email, password);
		promise.then(this.registerSuccesfull.bind(this));
		promise.catch(this.registerError.bind(this));
	}
}