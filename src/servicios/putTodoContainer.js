import axios from 'axios';

const putTodoContainer = async (id, data) => {

    const promise = await axios({
        method:'PUT',
        url:`/todos/${id}`,
        baseURL:'https://todos-go.herokuapp.com/api',
        data: data
    })

    return promise
}

export default putTodoContainer