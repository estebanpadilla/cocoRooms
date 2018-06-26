/**
* @name RoomView
* @extends View
* @file roomView.js
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/
class RoomView extends View {

	constructor(model, parent, app) {
		super(model, parent, app);
		this.addUI();
	}

	addUI() {
		this.container.className = 'postsContainer';

		this.addBtn = document.createElement('button');
		this.addBtn.className = 'addBtn';
		this.addBtn.innerHTML = 'ADD';
		this.addBtn.onclick = this.addBtnClick.bind(this);

		this.container.appendChild(this.addBtn);

		this.addPostUI = new AddPostUI(null, this.container, this.app);

		this.addPosts();
	}

	addPosts() {
		if (this.model.posts) {
			this.model.posts.forEach(post => {
				var post = new PostUI(post, this.container, this.app);
			});
		}
	}

	addBtnClick(e) {
		this.addPostUI.show();
	}

	updatingPost(value) {
		this.addPostUI.updatingPost(value);
	}
}