import axios from 'axios';

const deleteTodoContainer = async (id) => {

    const promise = await axios({
        method:'DELETE',
        url:`/todos/${id}`,
        baseURL:'https://todos-go.herokuapp.com/api',
    })

    return promise
}

export default deleteTodoContainer


