EstablishmentShowCommentListView = Backbone.View.extend({
	events: {
	},

	initialize: function () {
        this.listenTo(this.collection, 'reset', this.render);
        this.listenTo(this.collection, 'remove', this.render);
        this.listenTo(this.collection, 'add', this.newComment);
        this.listenTo(this.collection, 'paginate', this.paginate);
        this.listenTo(this.collection, 'request', this.showThrobber);
        this.collection.fetch({ reset: true, data: { establishment_id: this.model.get('id') } });
	},

	render: function () {
		this.$el.html('');	

    	this.collection.each(function (comment) {
			this.renderComment(comment);
		}, this);	
        window.scrollTo(0,0);
    },

    renderComment: function (comment) {
        var comment_view = new EstablishmentShowCommentView({
            tagName: 'li',
            model: comment,
            className: 'comment'
        });

        this.$el.append(comment_view.el);
    },

    newComment: function (comment) {
        if (this.collection.length > this.collection.per_page) {
            this.collection.pop();
        } else {
            this.render();
        }
    },

    paginate: function (e) {
        this.collection.fetch({ reset: true, data: { establishment_id: this.model.get('id'), page: e } });
	}, 

    showThrobber: function () {
        this.$el.html(render('application/throbber_small'));
    }
});
