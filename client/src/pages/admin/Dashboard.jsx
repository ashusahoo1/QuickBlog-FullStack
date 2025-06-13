import React, { useEffect, useState } from 'react'
import { assets, dashboard_data } from '../../assets/assets'
import BlogTableItem from '../../components/admin/BlogTableItem'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Dashboard = () => {

    const [dashboardData, setDashboardData] = useState({
        blogs: 0,
        comments: 0,
        drafts: 0,
        recentBlogs: []
    })

    const { axios } = useAppContext()

     const fetchDashboard = async ()=>{
       try {
         const {data} = await axios.get('/api/admin/dashboard')
         data.success ? setDashboardData(data.dashboardData) : toast.error(data.message)
       } catch (error) {
            toast.error(error.message)
       }
     }

     useEffect(()=>{
        fetchDashboard()
     },[])

  return (
    <div className='flex-1 p-4 md:p-10 bg-blue-50/50'>

        <div className='flex flex-wrap gap-4'>

            <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
                <img src={assets.dashboard_icon_1} alt="" />
                <div>
                    <p className='text-xl font-semibold text-gray-600'>{dashboardData.blogs}</p>
                    <p className='text-gray-400 font-light'>Blogs</p>
                </div>
            </div>

            <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
                <img src={assets.dashboard_icon_2} alt="" />
                <div>
                    <p className='text-xl font-semibold text-gray-600'>{dashboardData.comments}</p>
                    <p className='text-gray-400 font-light'>Comments</p>
                </div>
            </div>

            <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
                <img src={assets.dashboard_icon_3} alt="" />
                <div>
                    <p className='text-xl font-semibold text-gray-600'>{dashboardData.drafts}</p>
                    <p className='text-gray-400 font-light'>Drafts</p>
                </div>
            </div>
        </div>

        <div>
            <div className='flex items-center gap-3 m-4 mt-6 text-gray-600'>
                <img src={assets.dashboard_icon_4} alt="" />
                <p>Latest Blogs</p>
            </div>

            <div className='relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
                <table className='w-full text-sm text-gray-500'>
                    <thead className='text-xs text-gray-600 text-left uppercase'>
                        <tr>
                            <th scope='col' className='px-2 py-4 xl:px-6'> # </th>
                            <th scope='col' className='px-2 py-4'> Blog Title </th>
                            <th scope='col' className='px-2 py-4 max-sm:hidden'> Date </th>
                            <th scope='col' className='px-2 py-4 max-sm:hidden'> Status </th>
                            <th scope='col' className='px-2 py-4'> Actions </th>
                        </tr>
                    </thead>
                    <tbody>
                        {dashboardData.recentBlogs.map((blog, index)=>{
                            return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchDashboard} index={index + 1}/>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
      
    </div>
  )
}

export default Dashboard



/*

before backend:

const fetchDashboard = async ()=>{
    setDashboardData(dashboard_data)}

*/

/*

🧾 What is a <table> in HTML?
A <table> is used to display data in rows and columns, like in Excel or Google Sheets.

It’s perfect for structured data like:

Student marksheets

Product lists

Timetables

Invoice tables

🧱 Table Structure
A table in HTML is made of these main tags:

Tag	    Meaning
<table>	Starts the table
<tr>	Table Row
<th>	Table Header cell (bold & centered)
<td>	Table Data cell

*/

/*

blog table item mounted in dashboard.jsx

*/