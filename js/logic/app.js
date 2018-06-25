/**
* @name App
* @extends
* @file app.js
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/
class App {
	constructor() {
		this.dataManager = new DataManager();
		this.navManager = new NavManager(this);
		this.netManager = new NetManager(this);
		this.navManager.init();
	}
}