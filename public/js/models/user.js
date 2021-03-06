/**
* @name User
* @extends
* @file user.js
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/
class User {
	constructor(key, name, lastName, userName, password, isAdmin) {
		this.key = key;
		this.name = name;
		this.lastName = lastName;
		this.userName = userName;
		this.isAdmin = isAdmin;
	}
}