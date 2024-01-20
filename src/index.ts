import { json } from "body-parser";
import express from "express";
import { default as userRouter}  from "./routes/user";
import {default as pollRouter} from "./routes/poll"
// setup express app
const app = express();
const PORT = process.env.PORT || 3000;
app.use(json());

// setup routes
app.use('/user', userRouter);
app.use('/poll', pollRouter);
// setup server port
app.listen(PORT, ()=>console.log(`Server started at port ${PORT}`));