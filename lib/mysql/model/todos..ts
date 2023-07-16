import db from ".."

const getTodos = async () =>{
    const query =  db.query('SELECT * FROM todos');
    return query;
}


export default getTodos