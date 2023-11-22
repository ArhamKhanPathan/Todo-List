"use client"
import React, { useEffect, useState } from 'react'
import api from './api'
import axios from 'axios'

const page = () => {
  const [title, setTitle] = useState("")
  const [desc, setdesc] = useState("")
  const [main, setmain] = useState([])

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/task/');
      setmain(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
 
  useEffect(() => {
    fetchData();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log("submit ke pehle---------------------------------------")
    try {
      await api.post('http://localhost:8000/api/task/', { title, desc });
      fetchData();
      setTitle('');
      setdesc('');
      // console.log('submit ho rha hai++++++++++++++++++++++++++++++++++++++')
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const deleteHandler = async (id) => {
    try {
      await api.delete(`http://localhost:8000/api/task/${id}/`);
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  let renderTask = <h2>No Task Available</h2>
  if (main.length > 0) {
    renderTask = main.map((t,i)=> {
      return(
        <li key={t.id}>
          <div className='flex justify-between mb-5'>
            <h5 className='text-xl font-semibold'>{i+1}.  {t.title}</h5>
            <h6 className='text-xxl font-semibold'>{t.desc}</h6>
            <button 
            onClick={() => {
              deleteHandler(t.id)
            }}
            className='p-3 bg-red-500 rounded' >Delete</button>
          </div>
        </li>
      )
    })
    
  }
  return (
    <>
    <h1 className='text-white text-3xl text-center py-5 font-bold'>Arham's Todo-List</h1>

    <form 
    onSubmit={submitHandler}
    className='bg-white'>
      <input 
      className='border-zinc-600 mx-8 my-8 bg-zinc-800 p-4 rounded border-4'
      type="text" 
      name="taskName" 
      placeholder="Title Name"
      value={title}
      onChange={e=>{
        setTitle(e.target.value)}}

      />

      <input 
      className='border-zinc-600 mx-8 my-8 bg-zinc-800 p-4 rounded border-4' 
      type="text" 
      name="desc" 
      placeholder="Enter Description"
      value={desc}
      onChange={e=>{
        setdesc(e.target.value)}}
      />

      <button
      className='bg-teal-100 mx-8 my-8 p-3 rounded text-zinc-800 border-4'>Add Task</button>
    </form>
    <hr />
    <div className='p-8 bg-slate-800'>
      <ul className='text-center'>{renderTask}</ul>
      
    </div>
    </>
  )
}

export default page