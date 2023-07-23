import type { NextApiRequest, NextApiResponse } from 'next'
import { getTodo } from '@/lib/mysql/model/todos.';




export default async function handler(req: NextApiRequest, res: NextApiResponse<{}>) {
  const id = req.query.id;

  // Check if id is a string and convert it to a number
  const idAsNumber = typeof id === 'string' ? parseInt(id, 10) : undefined;

  // If idAsNumber is not a valid number, handle the error accordingly
  if (typeof idAsNumber !== 'number' || isNaN(idAsNumber)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  let result = await getTodo(idAsNumber);
    return res.json({'data':result[0]})
  } 


