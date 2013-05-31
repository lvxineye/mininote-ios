var NoteApp = Backbone.Router.extend({

	routes: {
		"": "list",
		"list": "list",
		"notes/new": "newNote",
		"notes/add": "addNote",
		"notes/:id": "showNote"
	},
	
	initialize: function () {
		// 将所有CSS样式为.back的DOM元素添加浏览器的页面返回动作
		$('.back').live('click', function(event) {
			window.history.back();
			return false;
		});
		this.firstPage = true;
		this.noteList = new NoteList();
		// Initial data
		this.noteList.add(new Note({id: 1, content: "first content to test on list"}));
		this.noteList.add(new Note({id: 2, content: "second content to test on list"}));
		this.noteList.add(new Note({id: 3, content: "third note for test"}));
	},
	// 应用的首页面，展示笔记列表
	list: function() {
		this.changePage(new NoteListPage({model: this.noteList}));
	},
	// 新建笔记页面
	newNote: function() {
		this.changePage(new NewNoteView({model: new Note()}));
	},
	// 添加笔记操作
	addNote: function() {
		var newNote = new Note({id: this.noteList.length + 1, content: $("#newNoteContent").val()});
		this.noteList.add(newNote);
		this.navigate("", {trigger: true});
	},
	// 显示笔记页面
	showNote: function(id) {
		var note = this.noteList.get(id);
		this.changePage(new NoteView({model: note}));
	},
	// 页面切换
	changePage: function (page) {
		$(page.el).attr('data-role', 'page'); // 修饰为jQuery Mobile中的page
		page.render();
		$('body').append($(page.el));
		var transition = $.mobile.defaultPageTransition;
		if (this.firstPage) { // 首个页面不需要页面切换效果
			transition = 'none';
			this.firstPage = false;
		}
		// 切换并渲染页面
		$.mobile.changePage($(page.el), {changeHash: false, transition: transition});
	},
	// 启动应用，进行页面的路由
	start: function() {
		Backbone.history.start();
	}
	
});

$(document).ready(function() {
	// 装载应用所需的视图模板
	tpl.loadTemplates(["note-details", "note-list-item", "notes-page", "new-note"], function() {
		// 视图模板装载完毕，创建MiniNote应用实例并启动它
		app = new NoteApp();
		app.start();
	});
});