/**
* @name App
* @file app.js
* @author Esteban Padilla <ep@estebanpadilla.com>
*/

class App {
	constructor() {
		this.dataManager = new DataManager();
		this.navManager = new NavManager(this);
		this.netManager = new NetManager(this);
		this.navManager.init();
	}
}