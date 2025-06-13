import express from "express";
import { addBlog, addComment, deleteBlogById, generateContent, getAllBlogs, getBlogById, getBlogComments, togglePublish } from "../controllers/blogController.js";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";

const blogRouter = express.Router();

blogRouter.post("/add", upload.single('image'), auth, addBlog); //.single to get optimised image url, auth middleware is there so that only loggedin user and admin can pass or make chnges in blog
blogRouter.get('/all', getAllBlogs);  //we r using get method cause we do not have to send anything
blogRouter.get('/:blogId', getBlogById);
blogRouter.post('/delete', auth, deleteBlogById);
blogRouter.post('/toggle-publish', auth, togglePublish);
blogRouter.post('/add-comment', addComment);
blogRouter.post('/comments', getBlogComments);

blogRouter.post('/generate', auth, generateContent);

export default blogRouter;




/*

blogRouter.get('/:blogId', getBlogById);
🔍 What is this?
This is a route definition using Express.js for handling GET requests to fetch a single blog post by its ID.

🧩 Part-by-part Breakdown
Part	              Meaning
blogRouter	          A router object made from express.Router()
.get()	              It handles GET requests (like when a user visits a URL in the browser)
'/:blogId'	          A route parameter (this will match /blog/123, /blog/xyz, etc.)
getBlogById	          A controller function that handles the logic to fetch a blog post by ID


*/