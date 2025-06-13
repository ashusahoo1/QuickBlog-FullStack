import jwt from "jsonwebtoken";

const auth = (req, res, next)=>{
    const token = req.headers.authorization;

    try {
        jwt.verify(token, process.env.JWT_SECRET)
        next();
    } catch (error) {
        res.json({success: false, message: "Invalid token"})
    }
}

export default auth;



/*

we will use this auth to protect our route from unauthorized access

💡 Why next is passed?
In Express, middleware functions must include next as the third parameter if you want the request to continue down the pipeline.

Argument	  Description
req	          Request object (what the client sent)
res	          Response object (what you send back)
next	      A function that tells Express to move to the next step (next middleware or route)

📦 Real Use Case Example
Let's say you only want to allow logged-in users to access /admin:

*/

/*

Yes — ✅ req.headers.authorization is predefined in the sense that:

✅ req.headers is:
A built-in object in Express.js (Node.js backend) that contains all the HTTP headers sent by the client (like browser or frontend app).

✅ authorization is:
A standard HTTP header used for authentication. It's not something you make up — it's part of the HTTP specification.

*/