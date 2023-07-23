import db from ".."

export const getTodos = async () =>{
    const query =  db.query('SELECT * FROM todos');
    return query;
}


export const getTodo = async (id:number) =>{
    const query =  db.query(`SELECT * FROM todos WHERE id=?`,[id]);
    return query;
}


