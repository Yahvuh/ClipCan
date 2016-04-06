Router.route('/', function () {
	this.render('home');
});

Router.route('/upload', function () {
	this.render('upload');
});

Router.route('/clips', {where: 'server'})
	.post(function () {
	console.log("Hi");

})

Router.route('/clips/:_id', function () {
	this.render('clips', {
		data: function () {
			return Submissions.findOne({_id: this.params._id});
		}
	}, {
		name: 'clip.show'
	});
});