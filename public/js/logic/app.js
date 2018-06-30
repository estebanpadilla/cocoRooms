/**
* @name App
* @file app.js
* @author Esteban Padilla <ep@estebanpadilla.com>
*/

class App {
	constructor() {
		this.netManager = new NetManager(this);
		this.dataManager = new DataManager(this);
		this.navManager = new NavManager(this);
		this.navManager.init();
	}
}