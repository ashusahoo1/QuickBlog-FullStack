import multer from "multer";

const upload = multer({storage: multer.diskStorage({})})

export default upload;


/*

💡 What is Multer?
Multer is a middleware for Node.js (specifically for Express) used to handle file uploads, such as:

Images (PNG, JPG)

PDFs

Videos

Any file from the frontend (like from a form)

⚠️ Multer is not used in React directly — it's used on the backend to receive and handle uploaded files from the React frontend.

🔗 Where Multer fits in:
Part	Role
React (frontend)	Sends a file (via a <form> or FormData) to the backend
Multer (backend)	Receives and processes the file

📦 Why do we make multer.js?
We usually create a separate file like multer.js in the backend to centralize the Multer config, so it's reusable.


✅ What is Middleware in Express?
Middleware is a function that runs between the request and response in an Express server.

It can:

Modify the request (req) or response (res)

Validate or authenticate

Handle errors

End the response or pass it forward (next())

*/