Template.upload.events({
	'submit .newSubmission': function(event) {
		var title = event.target.title.value;
		var link = event.target.link.value;
		var description = event.target.description.value;

		var id = Submissions.insert({
			title: title,
			link: link,
			description: description
		});
		console.log(id);
		console.log("Uploading");
		event.preventDefault();
		//return false;

		Router.go('/clips/' + id);
	}
});