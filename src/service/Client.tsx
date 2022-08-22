import { json } from 'stream/consumers';
import {IPostClient} from '../types/index'


export const Client = {

	createClient: async (data: IPostClient) => {
  	
    await fetch('http://localhost:8000/client/create', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    console.log(JSON.stringify(data))
    // const users = await response.json()
    // console.log(users)
	},

};