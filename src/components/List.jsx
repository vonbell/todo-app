import { TodoForm } from "./TodoForm";
import Todos from "./Todos";
import { useState, useEffect, useRef } from "react";

export const List = (props) => {
    const [todos, setTodos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [show, setShow] = useState(false);

    // Focus on search input
    const inputRef = useRef(null);
    useEffect(() => { inputRef.current.focus() });

    const handleClick = (e) => {
        setShow(true);
    };
    
    const addTodo = (todo) => {
        if (!todo.text || /^\s*$/.test(todo.text)) return;
        const newTodos = [todo, ...todos];
        setTodos(newTodos);
        setShow(false);
        console.log(todo, ...todos); // {id: 1234, text: "walk the dog"}
    };

    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) return;
        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
    };

    const removeTodo = (id) => {
        const removeArr = [...todos].filter(todo => todo.id !== id);
        setTodos(removeArr);
    };

    const searchTodo = () => {
        return todos.filter((todo) => {
            if (searchTerm == "") {
                return todo;
            } else if (todo.text.toLowerCase().includes(searchTerm.toLowerCase())) {
                return todo;
            }
        }).map((todo, idx) => {
            return (
                <div className="todo-row search" key={idx}>
                    <div key={todo.id}>{todo.text}</div>
                </div>
            );
        });
    };

    return (
        <div className="container">
            <div className="header-container">
                <button className="logout-btn" onClick={() => window.location.reload(false)}>Logout</button>
                <h1 className="todo-h1">A To-Do List for Life</h1>
            </div>     
                
            <div className="list-container">
                <div className="search-container">
                    <input 
                        className="todo-input search" 
                        type="text" placeholder="Search" 
                        onChange={(e) => {setSearchTerm(e.target.value)}} 
                        ref={inputRef} 
                    />
                    <button className="todo-btn new" onClick={handleClick}>New</button>
                </div>
                <hr />

                {show ? <TodoForm onSubmit={addTodo} /> : null}

                {searchTerm ? (
                    <div className="todo-container">
                        {searchTodo()}
                    </div>
                ) : (
                    <div className="todo-container">
                        <Todos todos={todos} updateTodo={updateTodo} removeTodo={removeTodo} />
                    </div>
                )}
            </div>
        </div>
    );
}
