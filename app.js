const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const adminRoutes = require('./routes/admin');

mongoose.connect('mongodb://localhost/quiz_sanchit', { useNewUrlParser: true })
.then(() => {
console.log(`Succesfully Connected to the Mongodb Database at URL : mongodb://localhost/quiz`);
})
.catch(() => {
console.log(`Error Connecting to the Mongodb Database at URL : mongodb://localhost/quiz`);
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}))

app.use(adminRoutes);

app.listen(3001,function(){
    console.log('App is running on Port 3001');
})