import './TodoItem.css'
import putTodoContainer from "./servicios/putTodoContainer"

const TodoItem = ({id, student, task, isCompleted, flag, setFlag}) => {
    
    const putSubmit = (id,isCompleted) => {
        const valueUpdate = {
            task,
            student,
            isCompleted: isCompleted
        }
        const putFunc = async () => {
            const res = await putTodoContainer(id,valueUpdate)
            console.log(res)
            setFlag(!flag)
        }
        putFunc()
    }

    return(
        <div id="toggles">
            <input type="checkbox" defaultChecked={isCompleted} name="checkbox1" id={id} className="ios-toggle" onClick={(e)=> 
                {putSubmit(id,e.target.checked)
              
                }}></input> 
            <label htmlFor={id} className="checkbox-label" data-off="no" data-on="yes"></label>        
        </div>
    )
}

export default TodoItem


