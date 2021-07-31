import axios from 'axios';

const getTodoContainer = async () => {

    const data = await axios({
        method:'GET',
        url:'/todos',
        baseURL:'https://todos-go.herokuapp.com/api'
    })

    return data.data.todos
}

export default getTodoContainer