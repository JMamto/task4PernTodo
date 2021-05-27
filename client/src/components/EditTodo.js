import React, {Fragment, useState} from "react";
import Dashboard from "./Dashboard"
import './style.css';

const EditTodo = ({todo}) => {

    const [todo_name, setTodo_name] = useState(todo.todo_name);
    const [description, setDescription] = useState(todo.description);
    const [date, setDate] = useState(todo.date);
    const [status, setStatus] = useState(todo.status);


    function stn(){
        setTodo_name(todo.todo_name);
    }
    function sd(){
        setDescription(todo.description);
    }
    function sdt(){
        setDate(todo.date);
    }
    function st(){
        setStatus(todo.status);
    }

    //!edit todo
    const updateTodo = async(e) => {
        e.preventDefault();
        try {
            const body = {todo_name, description, date, status};
            const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`,{

                method: "PUT",
                headers: {"Content-Type":  "application/json"},
                body: JSON.stringify(body)
            });

            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    }

    return(
        <Fragment>
            {/* <!-- Button to Open the Modal --> */}
<button type="button" className="btn btn-warning edt" data-toggle="modal" data-target={`#id${todo.todo_id}`}>
  Edit
</button>

{/* <!-- The Modal --> */}
<div className="modal" id={`id${todo.todo_id}`}>
  <div className="modal-dialog">
    <div className="modal-content">

      {/* <!-- Modal Header --> */}
      <div className="modal-header mdl-head">
        <h4 className="modal-title">Edit Todo</h4>
        <button type="button" className="close" data-dismiss="modal" onClick={() => {stn(); sd(); sdt(); st();}}>&times;</button>
      </div>

      {/* <!-- Modal body --> */}
      <div className="modal-body mdl-body">

        <input type="text" className="form-control mb-2" value ={todo_name} onChange={e => setTodo_name(e.target.value)}/>
        <input type="text" className="form-control mb-2" value={description} onChange={e => setDescription(e.target.value)}/>
        <input type="date" className="form-control mb-2" value={date} onChange={e => setDate(e.target.value)}/>
        
        <div className="form-control mb-2"
             >

            <label>Set status:</label>
            <select className="form-control mr-2"
                    value={status}
                    onChange={e => setStatus(e.target.value)}>
                <option>Incomplete</option>
                <option>Completed</option>
                </select>
                </div>

        </div>

      {/* <!-- Modal footer --> */}
      <div className="modal-footer mdl-foot">
      <button type="button" 
              className="btn btn-warning" 
              data-dismiss="modal"
              onClick={ e => updateTodo(e)}
        >Edit</button>
        <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => {stn(); sd(); sdt(); st();}}>Close</button>
      </div>

    </div>
  </div>
</div>
        </Fragment>
    )
}

export default EditTodo; 