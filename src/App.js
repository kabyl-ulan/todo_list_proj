import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";
import Todolist from "./todolist/Todolist";

function App() {

    const [todo, setTodo] = useState([])
    const [title, setTitle] = useState('')

    const handleChange = (e) => {
        setTitle(e.target.value)
    }

    const addTodo = () => {
        // const newTodo = {
        //     id: todo.length ? todo[todo.length - 1].id + 1 : 1,
        //     name: title,
        //     isDone: false,
        // }
        // setTodo((state) => [...state, newTodo])

        axios.post('https://62be75460bc9b1256157d4c5.mockapi.io/ku/todo', {
            name: title,
        })
            .then(({data}) => {
                setTodo([...todo, data])
            })
    }

    const deleteTodo = (id) => {
        setTodo(state => state.filter(el => el.id !== id))
        axios.delete(`https://62be75460bc9b1256157d4c5.mockapi.io/ku/todo/${id}`)
            .then(({data}) => {
                console.log(data)
            })
    }

    const changeStatus = (id) => {
        // setTodo(state => state.map(el => el.id === id ? {...el, isDone: !el.isDone} : el))
        const element = todo.find(el => el.id === id)
        axios.put(`https://62be75460bc9b1256157d4c5.mockapi.io/ku/todo/${id}`, {
            isDone: !element.isDone
        })
            .then(({data}) => {
                setTodo(state => state.map(el => el.id === id ? data : el))
            })
    }

    const updateTodo = (title, id) => {
        // setTodo(state => state.map(el => el.id === id ? {...el, name: title} : el))

        axios.put(`https://62be75460bc9b1256157d4c5.mockapi.io/ku/todo/${id}`, {
            name: title,
        })
            .then(({data}) => {
                setTodo(state => state.map(el => el.id === id ? data : el))
            })
    }

    const getTodo = async () => {
        const url = await axios('https://62be75460bc9b1256157d4c5.mockapi.io/ku/todo')
        const {data} = await url
        setTodo(data)
        return;
    }

    //https://62be75460bc9b1256157d4c5.mockapi.io/ku/
    useEffect(() => {
        getTodo()
    }, [])

    return (
        <div className="App">
            <div className='container'>
                <div className={''}>
                    <h1 className={'text-4xl my-5'}>TODO APP</h1>
                </div>
                <div className="flex-row flex flex-wrap justify-center">
                    <div className="basis-1/3 justify-center items-center">
                        <div className="">
                            <div className="flex">
                                <input
                                    onChange={handleChange}
                                    className='w-full mr-2 p-3 text-sm text-white bg-gray-700 rounded-lg border border-gray-500
                                           focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-700
                                           dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    placeholder={'type todo name'}
                                    required/>
                                <button
                                    onClick={
                                        addTodo
                                    }
                                    className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
                                focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3 dark:bg-blue-600 dark:hover:bg-blue-700
                                dark:focus:ring-blue-800'
                                >
                                    Добавить
                                </button>
                            </div>

                            <ul className="my-4 text-sm  text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                {
                                    todo.filter(el => el.isDone === false).map(el => <Todolist
                                        updateTodo={updateTodo}
                                        changeStatus={changeStatus}
                                        deleteTodo={deleteTodo}
                                        el={el}
                                        key={el.id}/>)
                                }
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap flex-row justify-center py-16">
                    <div className="basis-1/3">
                        <hr/>
                        Законченные дела!
                        <hr/>

                        <ul className="my-4 text-sm font-medium text-gray-900 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            {
                                todo.filter(el => el.isDone === true).map(el => <Todolist
                                    changeStatus={changeStatus}
                                    deleteTodo={deleteTodo}
                                    el={el}
                                    key={el.id}/>)
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
