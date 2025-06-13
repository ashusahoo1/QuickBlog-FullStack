import { createContext, useContext, useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL; //to make api call we need this backend url so yeah that is why it is written here.

const AppContext = createContext(); //1st step

export const AppProvider = ({ children }) => {

    const navigate = useNavigate()

    const [token, setToken] = useState(null)
    const [blogs, setBlogs] = useState([])
    const [input, setInput] = useState("")

    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get('/api/blog/all');
            data.success ? setBlogs(data.blogs) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    // whenever we load the webpage it will check for token in localstorrage so in every api call token will be added
    useEffect(() => {
        fetchBlogs();
        const token = localStorage.getItem('token')
        if (token) {
            setToken(token);
            axios.defaults.headers.common['Authorization'] = `${token}`;
        }
    }, [])

    const value = {
        axios, navigate, token, setToken, blogs, setBlogs, input, setInput
    }
    //This makes all those variables/functions accessible to any component that uses.✅ Clean way to share state and utilities globally.

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
};

/*


export const useAppContext = () => {
  return useContext(AppContext);
};
This defines a custom React hook called useAppContext.

🔍 Step-by-step explanation:
✅ 1. AppContext
This is a React Context object you’ve already created somewhere like:


const AppContext = React.createContext();
It holds global state or functions that can be shared across components (like user, theme, token, etc).

✅ 2. useContext(AppContext)
This is a built-in React Hook that lets you read the value from the context.
It will give you access to whatever value was passed into the <AppContext.Provider value={...}>.

✅ 3. useAppContext (custom hook)
This is a wrapper around useContext(AppContext) to simplify importing and using the context in other files.

So instead of doing this in every component:


import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const { user } = useContext(AppContext);

You can just write:


import { useAppContext } from '../context/AppContext';

const { user } = useAppContext();


*/


/*

🔥 What is axios?
axios is a popular JavaScript library used to make HTTP requests (GET, POST, PUT, DELETE, etc.) from the browser (frontend) or from a Node.js server (backend).

It’s commonly used in React and other frontend frameworks to communicate with backend APIs.

🧠 Why use axios?
Compared to the built-in fetch(), axios:

✅ Automatically parses JSON responses

✅ Has cleaner syntax and error handling

✅ Supports request/response interceptors

✅ Works well with async/await

✅ Automatically handles timeouts, headers, and content types

*/