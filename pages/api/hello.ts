import { data } from './../../app/data/data';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { dataType } from '@/types/types';
import getTodos from '@/lib/mysql/model/todos.';




export default async function handler(req: NextApiRequest, res: NextApiResponse<{}>) {
  let result = await getTodos();
  return res.json({'data':result[0]})
}

