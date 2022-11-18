import { TodoForm } from "./TodoForm";
import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { BsFillTrashFill } from "react-icons/bs";

const Todos = ({ todos, updateTodo, removeTodo }) => {
    const [edit, setEdit] = useState({
        id: null,
        value: "" 
    });

    const handleSubmitUpdate = (value) => {
        updateTodo(edit.id, value);
        setEdit({
            id: null,
            value: "" 
        });
    };

    // If edit.id is truthy return form with edited todo
    if (edit.id) {
        return <TodoForm edit={edit} onSubmit={handleSubmitUpdate} />
    };

    return todos.map((todo, idx) => (
        <div className="todo-row" key={idx}>
            <div key={todo.id}>{todo.text}</div>
            <div className="icons">
                <FaPencilAlt className="edit-icon" onClick={() => setEdit({ id: todo.id, value: todo.text })} />
                <BsFillTrashFill className="delete-icon" onClick={() => removeTodo(todo.id)} />
            </div>
        </div>
    ));
}

export default Todos;