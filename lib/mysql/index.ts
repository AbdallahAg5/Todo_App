import {createPool} from "mysql2/promise"

const db = createPool({
    database : process.env.DB_NAME,
    user:'root',
    password:'',
    host:'localhost'
})


export default db