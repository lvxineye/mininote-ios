window.NoteView = Backbone.View.extend({
	
	initialize: function() {
		this.template = _.template(tpl.get("note-details"));
	},
	
	render: function() {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	}
	
});

window.NewNoteView = Backbone.View.extend({
	
	initialize: function() {
		this.template = _.template(tpl.get("new-note"));
	},
	
	render: function() {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	}
});

window.NoteListItemView = Backbone.View.extend({
	
	tagName: "li",
	
	initialize: function() {
		this.template = _.template(tpl.get("note-list-item"));
	},
	
	render: function() {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	}
	
});

window.NoteListView = Backbone.View.extend({
	
	initialize:function () {
		this.collection.bind("reset", this.render, this);
	},
	
	render: function() {
		$(this.el).empty();
		this.collection.forEach(function(note) {
			$(this.el).append(new NoteListItemView({model:note}).render().el);
		}, this);
		$("#noteListView").listview("refresh");
		return this;
	}
	
});

window.NoteListPage = Backbone.View.extend({
	
	initialize: function() {
		this.template = _.template(tpl.get('notes-page'));
	},
	
	render: function() {
		$(this.el).html(this.template(this.model.toJSON()));
		this.listView = new NoteListView({el: $('ul', this.el), collection: this.model});
		this.listView.render();
		return this;
	}
	
});