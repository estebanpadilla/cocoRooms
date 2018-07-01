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
		this.registerBtn = document.createElement('button');

		this.container.appendChild(this.userNameTxt);
		this.container.appendChild(this.passwordTxt);
		this.container.appendChild(this.loginBtn);
		this.container.appendChild(this.registerBtn);

		this.userNameTxt.placeholder = 'Username';
		this.passwordTxt.placeholder = 'Password';
		this.passwordTxt.type = 'password';
		this.loginBtn.innerText = 'LOGIN';
		this.registerBtn.innerText = 'REGISTER';

		this.userNameTxt.classList.add('input_border');
		this.passwordTxt.classList.add('input_border');
		this.loginBtn.className = 'loginBtn';
		this.registerBtn.className = 'registerBtn';

		this.loginBtn.onclick = this.loginBtnClick.bind(this);
		this.registerBtn.onclick = this.registerBtnBtnClick.bind(this);

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

	registerError(e) {
		console.log(e.message);
		alert(e.message);

		// var email = this.userNameTxt.value;
		// var user = new User(null, '', '', email, '', false);
		// this.app.dataManager.registerUser(user);
	}

	registerBtnBtnClick() {
		var email = this.userNameTxt.value;
		var password = this.passwordTxt.value;
		var auth = firebase.auth();
		var promise = auth.createUserWithEmailAndPassword(email, password);
		promise.then(this.registerSuccesfull.bind(this));
		promise.catch(this.registerError.bind(this));
	}
}