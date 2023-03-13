import React from 'react'
import { useState } from 'react'

const Index = () => {
    const [list,setList]=useState([]);
    const [message,setMessage]=useState({
        text:'',
        id:'',
    });
    const [editing,setediting]=useState(false);
    const messageset=(e)=>{
       setMessage({
        ...message,
        text:e.target.value,
       })
       console.log(message.text);
    };
    const handleSubmit=(e)=>{
        e.preventDefault();
        let newTodo = {
            text: message.text,
            id: new Date().getTime().toString(),
        }
        if(newTodo.text.length!==0)
            setList([...list,newTodo]);
        setMessage({
            text:'',
            id:'',
        });
        console.log(list);
    };
    const changeEdit=(comingid)=>{
        let newmessage = list.find((eachObj)=> eachObj.id===comingid);
        setMessage({
            ...message,
            text:newmessage.text,
            id:newmessage.id,
        })
        setediting(true);
    }
    const handleEdit=(e)=>{
        e.preventDefault();
        let newlist = list.map((eachObj)=>{
            if(eachObj.id===message.id){
                return {
                    text:message.text,
                    id:message.id,
                }
            }else
               return eachObj;
        })
        setList(newlist);
        setMessage({
            text:'',
            id:'',
        });
        setediting(false);

    }
    const handleDelete=(comingid)=>{
        const newlist = list.filter((eachObj)=>{
            return eachObj.id!==comingid;
        })
        setList(newlist);
    };
  return (
    <div className='todo'>
      <form>
         <input type='text' name='message' id='message' value={message.text} placeholder='Enter task here' onChange={messageset}/>
         {
            editing?<button className='submit' onClick={handleEdit}>Edit</button>:<button className='submit' onClick={(e)=>handleSubmit(e)} >Add</button>
         }
      </form>
      <div>
      <ul>
      {
        list.length?list.map((eachObj)=>{
           return <li key={eachObj.id}>
               <h1>{eachObj.text}</h1>
               <button id='edit' onClick={()=>changeEdit(eachObj.id)}>Edit</button>
               <button id='delete' onClick={()=>handleDelete(eachObj.id)}>Delete</button>
           </li>
        }):<h1>Add Tasks Here</h1>
      }
      </ul>
      </div>
    </div>
  )
}

export default Index