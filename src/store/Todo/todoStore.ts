import {makeAutoObservable} from "mobx";
import {ITodo} from "@models/todos/ITodo";
import userStore from "@store/User/userStore";
import axios from "axios";

export enum filterMode {
    all = 'all',
    done = 'done',
    undone = 'undone'
}

class TodoStore {
    todos: ITodo[] = []
    size: number = this.todos.length

    constructor() {
        makeAutoObservable(this);
    }

    addTodo(todo_: string) {
        const newTodo: ITodo = {
            id: this.size + 1,
            title: todo_,
            userId: userStore.user.userId!,
            completed: false
        }
        console.log(newTodo)
        this.todos.push(newTodo)
        axios.post(`http://localhost:3000/todos`, {
            ...newTodo
        })
            .catch(err => console.log(err.message))
            .then(r => console.log(r?.data))
        console.log(this.todos)
        this.size++
    }

    async removeTodo(id: number) {
        this.todos = this.todos.filter(todo => todo.id !== id)
        return await axios.put(`http://localhost:3000/todos/${id}`, {})
    }

    getFiltered(filter: filterMode) {
        switch (filter) {
            case filterMode.all:
                return this.todos
            case filterMode.done:
                return this.todos.filter(todo => todo.completed)
            case filterMode.undone:
                return this.todos.filter(todo => !todo.completed)
            default:
                return this.todos
        }
    }

    completeTodo(id: number) {

        this.todos = this.todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo)

        const completeTodo = this.todos.filter(todo => todo.id === id)

        return axios.patch(`http://localhost:3000/todos/${id}`, {
            completed: completeTodo[0].completed
        })

    }

    async getSizeTodos() {
        const {data} = await axios.get(`http://localhost:3000/todos`).then(r => r.data);
        this.size = data.length
        return data.length
    }

    async fetchTodos() {
        return await axios.get(`http://localhost:3000/todos`)
        .then(r => {
            this.size = r.data ? r.data.reduce(function (prev: ITodo, current: ITodo) {
                return prev.id > current.id ? prev : current
            }).id : 0
            return r.data.sort((a: ITodo, b: ITodo) => a.id - b.id).filter((todo: ITodo) => todo.userId === userStore.user.userId)
        })
        .then(data => {
            console.log(data)
            this.todos = [...data]
            // console.log(todoStore.size, todoStore.todos)
        })
    }
}

export default new TodoStore();