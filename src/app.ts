import express, { Application, Request, Response } from 'express'
import cors from 'cors'
// import { StudentRoutes } from './app/modules/student/student.route';
const app = express()
const port = 3000



//parsers
app.use(express.json())
app.use(cors())

// app.use('/api/v1/students', StudentRoutes);

app.get('/', (req: Request, res: Response) => {
  try{
    console.log(req.body);
  res.send('Hello Bangladesh!');
  }catch (error) {
    console.error(error);
    
  }
})

export default app
