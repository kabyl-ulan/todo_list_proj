import React from 'react';
import {useState} from "react";

const Todolist = ({el, deleteTodo, changeStatus, updateTodo}) => {

    const [isOpen, setIsOpen] = useState(false)

    const [title, setTitle] = useState(el.name)

    const handleChange = (e) => setTitle(e.target.value)

    const openInput = () => {
        setIsOpen(true)
    }

    const closeInput = (title, id) => {
        updateTodo(title, id)
        setIsOpen(false)
    }

    return (
        <li className=" px-4 my-2 text-white py-2 bg-gray-700 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
            <span className='flex items-center justify-between'>
                <span className='flex items-center'>
                    <input type="checkbox"
                           onChange={() => {
                               changeStatus(el.id)
                           }}
                           defaultChecked={el.isDone}
                    />
                    {
                        isOpen ? <input
                            type="text"
                            value={title}
                            onChange={handleChange}
                            className='
                        text-black w-full text-sm text-white border border-gray-500 mx-1 p-1
                        '/> : <span
                            style={{
                                textDecoration: el.isDone ? 'line-through' : '',
                            }}
                            className={'mx-2'}>{el.name}</span>
                    }
                </span>
                <span>
                        <button
                            onClick={() => isOpen ? closeInput(title, el.id) : openInput()}
                            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            {
                                isOpen ? 'Сохранить' : 'Изменить'
                            }
                        </button>

                    <button
                        onClick={() => deleteTodo(el.id)}
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                        Удалить</button>
                </span>
            </span>
        </li>
    );
};

export default Todolist;