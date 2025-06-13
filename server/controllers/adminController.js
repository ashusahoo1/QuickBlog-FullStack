import jwt from 'jsonwebtoken'
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';

// allow user to login in admin dashboard
export const adminLogin = async (req, res)=>{
    try {
        const {email, password} = req.body;

        if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
            return res.json({success: false, message: "Invalid Credentials"})
        }

        const token = jwt.sign({email}, process.env.JWT_SECRET)
        res.json({success: true, token})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getAllBlogsAdmin = async (req, res) =>{
    try {
        const blogs = await Blog.find({}).sort({createdAt: -1});
        res.json({success: true, blogs})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getAllComments = async (req, res) =>{
    try {
        const comments = await Comment.find({}).populate("blog").sort({createdAt: -1})
        res.json({success: true, comments})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getDashboard = async (req, res) =>{
    try {
        const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
        const blogs = await Blog.countDocuments();
        const comments = await Comment.countDocuments()
        const drafts = await Blog.countDocuments({isPublished: false})

        const dashboardData = {
            blogs, comments, drafts, recentBlogs
        }
        res.json({success: true, dashboardData})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const deleteCommentById = async (req, res) =>{
    try {
        const {id} = req.body;
        await Comment.findByIdAndDelete(id);
        res.json({success: true, message:"Comment deleted successfully" })
    } catch (error) {
       res.json({success: false, message: error.message}) 
    }
}

export const approveCommentById = async (req, res) =>{
    try {
        const {id} = req.body;
        await Comment.findByIdAndUpdate(id, {isApproved: true});
        res.json({success: true, message:"Comment approved successfully" })
    } catch (error) {
       res.json({success: false, message: error.message}) 
    }
}


/*
control flow:

1: at first we will make function that will allow user to login in our website
2: we need to make api with the login controller function so we will make it in route folder

*/


/*
email is taken with jsonwebtoken becuase email can be unique but password can be same in many cases nd its bad practice to pass password with webtoken


*/

/*

const blogs = await Blog.find({}).sort({ createdAt: -1 });
is a MongoDB + Mongoose query in a Node.js backend to fetch and sort blog posts. Let me explain it step by step:

🔍 Breakdown:
Part	                    Meaning
Blog	                    A Mongoose model representing the blogs collection in MongoDB
.find({})	                Finds all blog documents (empty object means no filter)
.sort({ createdAt: -1 })	Sorts results by createdAt in descending order (latest first)
await	                    Waits for the query to finish (because it's asynchronous)
const blogs =	            Stores the result in the blogs variable

*/