window.onload = function init(e) {

	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyCWOr7KeIp0Iblwbtk4c53TLC8fz9rQSIk",
		authDomain: "cocoroom-cr.firebaseapp.com",
		databaseURL: "https://cocoroom-cr.firebaseio.com",
		projectId: "cocoroom-cr",
		storageBucket: "cocoroom-cr.appspot.com",
		messagingSenderId: "810034375699"
	};

	firebase.initializeApp(config);

	var app = new App();
}