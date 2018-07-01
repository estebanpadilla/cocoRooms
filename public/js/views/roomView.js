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
		this.scrollToBottom = false;
	}

	addUI() {

		this.container.className = 'postsContainer';

		this.addBtn = document.createElement('i');
		this.addBtn.className = 'material-icons';
		this.addBtn.classList.add('addBtn');
		this.addBtn.innerHTML = 'add_circle';
		this.addBtn.onclick = this.addBtnClick.bind(this);

		this.container.appendChild(this.addBtn);

		// this.addPostUI = new AddPostUI(null, this.container, this.app);

		this.addPosts();


		this.bottom = document.createElement('p');
		this.bottom.className = 'roomsView_bottom';
		this.bottom.innerHTML = 'Use the add button to create a new post';
		this.container.appendChild(this.bottom);

		if (this.scrollToBottom) {
			window.scroll({
				left: 0,
				top: this.container.scrollHeight
			});
		}
	}

	addPosts() {
		if (this.model.posts) {
			this.model.posts.forEach(post => {
				var post = new PostUI(post, this.container, this.app);
			});
		}
	}

	addBtnClick(e) {
		// this.addPostUI.show();
		var post = new Post(null, 'Title', 'Description', [], this.app.dataManager.user.key, Date.now());
		this.app.dataManager.addPost(post);
		this.scrollToBottom = true;
	}

	updatingPost(value) {
		this.addPostUI.updatingPost(value);
	}

	refresh() {
		this.model = this.app.dataManager.getRoomByKey(this.model.key);
		this.app.dataManager.selectedRoom = this.model;
		this.clean();
		this.addUI();
	}
}