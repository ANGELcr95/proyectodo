import './CreateTodo.css'
import TodoItem from "./TodoItem"
import deleteTodoContainer from "./servicios/deleteTodoContainer";

const CreateTodo = ({task, student, isCompleted, id, setDataTodo, setDataPending, setDataComplete, flag, setFlag, show1, show2, show3}) => {
    
    const deleteSubmit = (id) => {
        const deleteFunc = async () => {
            const res = await deleteTodoContainer(id)
            console.log(res)
            if(show1 && !show2 && !show3 ){
                if(res.status === 204){
                    setDataTodo((prevState)=> prevState.filter((value) => value.id !== id))
                    setDataComplete((prevState)=> prevState.filter((value) => value.id !== id))
                    setDataPending((prevState)=> prevState.filter((value) => value.id !== id))
                    setFlag(!flag)
                }
            }
            if(show2 && !show3 && !show1){
                if(res.status === 204){
                    setDataComplete((prevState)=> prevState.filter((value) => value.id !== id))
                    setFlag(!flag)
                }
            }
            if(show3 && !show2 && !show1){
                if(res.status === 204){
                    setDataPending((prevState)=> prevState.filter((value) => value.id !== id))
                    setFlag(!flag)
                }
            }
        }
        deleteFunc()
    }

    return(
        <div className="CreateTodo">
            <div className="Todo">
                <div className="Info">
                    <div className="Student"><b>Student: </b>{student}</div>
                    <div className="TaskStudent"><b>Task: </b>{task}</div>
                </div>
           
            <TodoItem isCompleted={isCompleted} id={id} student={student} task={task} flag={flag} setFlag={setFlag} />
            </div>
            <button onClick={()=> {deleteSubmit(id)
            }}>Delete</button>
        </div>
    )
}
export default CreateTodo