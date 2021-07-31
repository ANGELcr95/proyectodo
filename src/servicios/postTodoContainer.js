import axios from 'axios';

const postTodoContainer = async (todo) => {
    const promise = await axios({
        method:'POST',
        url:'/todos',
        baseURL:'https://todos-go.herokuapp.com/api',
        data: todo
    })

    return promise
}

export default postTodoContainer