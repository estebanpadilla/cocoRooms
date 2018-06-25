/**
* @name User
* @extends
* @file user.js
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/
class User {
	constructor(name, lastName, userName, password, isAdmin) {
		this.name = name;
		this.lastName = lastName;
		this.userName = userName;
		this.password = password;
		this.isAdmin = isAdmin;
	}
}