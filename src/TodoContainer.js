/* eslint-disable */
import './TodoContainer.css'
import CreateTodo from './CreateTodo';
import getTodoContainer from "./servicios/getTodoContainer";
import postTodoContainer from "./servicios/postTodoContainer";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

const TodoContainer = ({setColor}) => {

    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(true);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const {register, handleSubmit, reset} = useForm()
    const [dataTodo, setDataTodo] = useState([])
    const [dataComplete, setDataComplete] = useState([])
    const [dataPending, setDataPending] = useState([])
    const [flag, setFlag] = useState(null);
    const [percentage, setPercentaje] = useState(null)

    useEffect(()=> {
        const getFunc = async () => {
            const todo = await getTodoContainer()
            setDataTodo(todo)
        }
        getFunc()
    },[flag])

    const onSubmit = (todo) => {
        console.log(todo)
        const postFunc = async () => {
            const res = await postTodoContainer(todo)
            reset()
            console.log(res)
            if(res.status == 201){
                setDataTodo((prevState)=> [...prevState,res.data])
                setShow(!show)
            }
        }
        postFunc()
    }
    const todos = dataTodo.map(todo => <CreateTodo key={todo.id} task={todo.task} student={todo.student} isCompleted={todo.isCompleted} id={todo.id} setDataTodo={setDataTodo} setFlag={setFlag} flag={flag} show1={show1} setDataPending={setDataPending} setDataComplete={setDataComplete}/>)
    
    useEffect(()=>{
    const completedTodos = () =>{
        if(dataTodo.length){
            const list =  dataTodo.map(todo => {
                if(todo.isCompleted == true){
                    return todo
                }
            })
            const listend = list.filter(value => value != undefined)
            setDataComplete(listend)
        }
    }
    completedTodos()
    },[dataTodo])

    const completedTodos = dataComplete.map(todoCompleted => <CreateTodo key={todoCompleted.id} task={todoCompleted.task} student={todoCompleted.student} isCompleted={todoCompleted.isCompleted} id={todoCompleted.id} setDataComplete={setDataComplete} setFlag={setFlag} flag={flag} show2={show2}/>)

    useEffect(()=>{
        const pendingTodos = () =>{
            if(dataTodo.length){
                const list =  dataTodo.map(todo => {
                    if(todo.isCompleted == false){
                        return todo
                    }
                })
                const listend = list.filter(value => value != undefined)
                setDataPending(listend)
            }
        }
        pendingTodos()
        },[dataTodo])
    
    const pendingTodos = dataPending.map(todoPending => <CreateTodo key={todoPending.id} task={todoPending.task} student={todoPending.student} isPending={todoPending.isCompleted} id={todoPending.id} setDataPending={setDataPending} setFlag={setFlag} flag={flag} show3={show3}/>)

    useEffect(()=> {
        if(!dataTodo.length){
            setPercentaje("No task")
        } else {
            setPercentaje((dataComplete.length/dataTodo.length *100).toFixed()+"%")
        }
    },[dataComplete,dataPending,dataTodo,flag])

    return(
        <div className="TodoContainer">
            <div className="Percentage">{
                percentage}</div>
            <div className="AddTask">
                <button onClick={()=> {setShow(!show)}}>Add task</button>
            </div>
            <div className="NumberTask">
                <div>{todos.length}</div>
                <div>{completedTodos.length}</div>
                <div>{pendingTodos.length}</div>
            </div>
            <div className="OptionsTodo">
                <button onClick={()=> {
                    setFlag(!flag)
                    setColor("#282c34")
                if(show2 == true){
                    setShow2(!show2)
                }
                if(show3 == true){
                    setShow3(!show3)
                }
                setShow1(!show1)}}>Show All</button>
                <button onClick={()=> {
                    setFlag(!flag)
                    setColor("#7DCEA0")
                if(show1 == true){
                    setShow1(!show1)
                }
                if(show3 == true){
                    setShow3(!show3)
                }
                setShow2(!show2)}}>Completed</button>
                <button onClick={()=> {
                    setFlag(!flag)
                    setColor("#EC7063")
                if(show1 == true){
                    setShow1(!show1)
                }
                if(show2 == true){
                    setShow2(!show2)
                }
                setShow3(!show3)}}>Pending</button>
            </div>

            <div className="Task">
                { show ?
                (<form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <input placeholder="task" {...register('task',{ required: true })}></input>
                    </div>
                    <div>
                        <input placeholder="student" {...register('student',{ required: true })}></input>
                    </div>
                    <div>
                        <button>Todo</button>
                    </div>
                </form>
                ) : null
                }
            </div>
            {show1?todos:null}
            {show2?completedTodos:null}
            {show3?pendingTodos:null}
        </div>
    )
}

export default TodoContainer