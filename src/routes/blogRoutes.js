var express = require('express');

// blogModel is taken as argument for usage in database operations.
var routes = function (Blog) {

	var blogRouter = express.Router();

	// Routes configuration to create a blog, to view all blogs.

	blogRouter.route('/Blogs')
		.post(function (req, res) {
			var blog = new Blog(req.body);
			blog.save(function (err, blogs) {
				if (err)
					res.status(500).send(err);
				else
					res.json(blogs);
			});
		})

		.get(function (req, res) {
			var query = {};
			for (var key in req.query) {
				query[key] = req.query[key];
			}

			Blog.find(query, function (err, blogs) {
				if (err)
					res.status(500).send(err);
				else
					res.json(blogs);
			});
		});

	//Midlleware which simplifies the process of finding a particular blog id.
	blogRouter.use('/Blogs/:blogId', function (req, res, next) {
		Blog.findById(req.params.blogId, function (err, blog) {
			if (err)
				res.status(500).send(err);
			else if (blog) {
				req.blog = blog;
				next();
			} else
				res.status(404).send('No Blog Found');
		});
	});

	// Routes configuration to view a particular blog, to edit a complete at once blog, 
	blogRouter.route('/Blogs/:blogId')
		.get(function (req, res) {
			res.json(req.blog);
		})

		// To edit all or some attributes at once in a blog.
		.put(function (req, res) {
			req.blog.title = req.body.title;
			req.blog.author = req.body.author;
			req.blog.blogBody = req.body.blogBody;
			req.blog.subTitle = req.body.subTitle;
			req.blog.save(function (err) {
				if (err)
					res.status(500).send(err);
				else
					res.json(req.blog);
			});
		})

		// To edit a particular attribute in a blog, without any changes to other attributes.
		.patch(function (req, res) {
			if (req.body._id)
				delete req.body._id;
			for (let key in req.body) {
				req.blog[key] = req.body[key];
			}
			req.blog.save(function (err) {
				if (err)
					res.status(500).send(err);
				else
					res.json(req.blog);
			});
		})

		// To delete a particular blog using Id.
		.delete(function (req, res) {
			req.blog.remove(function (err) {
				if (err)
					res.status(501).send(err);
				else
					res.status(204).send('Blog Removed!!');

			});
		});

	return blogRouter;
};

module.exports = routes;
