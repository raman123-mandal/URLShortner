const express=require('express');
require('dotenv').config();
const path=require('path');
const app=express();
const port=process.env.PORT || 3000;
const connectDB=require('./connect');
const staticRouter=require('./routes/staticRouter');
const cookieParser=require('cookie-parser');
const {checkAuth}=require('./middleware/auth');

const userRoutes=require('./routes/user');
const urlRoutes=require('./routes/url');

app.set('view engine', 'ejs');
app.set('views', path.resolve('./view'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkAuth);

connectDB(process.env.MONGO_URL)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
});

app.use('/url', urlRoutes);
app.use('/user', userRoutes);
app.use('/', staticRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
