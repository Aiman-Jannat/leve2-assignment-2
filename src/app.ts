import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { ProductRoutes } from './app/modules/product/product.route'
import { OrderRoutes } from './app/modules/order/order.route'
// import { StudentRoutes } from './app/modules/student/student.route';
const app = express()
const port = 3000



//parsers
app.use(express.json())
app.use(cors())

app.use('/api', ProductRoutes);
app.use('/api', OrderRoutes);

app.get('/', (req: Request, res: Response) => {
  try{
    console.log(req.body);
  res.send('Hello Apollo!!');
  }catch (error) {
    console.error(error);
    
  }
})

export default app
