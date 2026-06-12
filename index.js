const express=require('express');
const path=require('path');
const app=express();
const port=3000; 
const connectDB=require('./connect');
const URL=require('./model/url');
const staticRouter=require('./routes/staticRouter');

const urlRoutes=require('./routes/url');

//set view engine as ejs
app.set('view engine', 'ejs');
app.set('views', path.resolve('./view'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB('mongodb://localhost:27017/urlShortener')
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
});

app.use('/url', urlRoutes);
app.use('/', staticRouter);




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
