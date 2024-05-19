require('dotenv').config();
const express = require ("express");
const cors = require('cors')
const app = express();
const authRouter = require ("./router/auth-router")
const connectDB = require("./utils/db")
const errorMiddleware = require("./middlewares/error-middleware")
const blogRouter = require('./router/blogRouter');



app.use(express.static('dist'));

const corsOptions = {
    origin:"https://travellatraavelplanner.netlify.app",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE" ,
    credentials:true
}


app.use(cors(corsOptions))

app.use(express.json());



app.use("/api/auth", authRouter);


app.use('/api/blogs', blogRouter);


app.use(errorMiddleware)

const PORT = 5000



connectDB().then(() => {
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});

})