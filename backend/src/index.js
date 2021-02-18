const express=require('express');
const assingations=require('./routes/assignations.route')
const teachers=require('./routes/teachers.route')
const courses=require('./routes/courses.route')
const cors=require('cors');
const morgan = require('morgan');
const app=express();

app.set('port',process.env.PORT || 4000)

app.use(cors());
app.use(morgan('dev'));

app.use('/assignations',assingations)
app.use('/teachers',teachers)
app.use('/courses',courses)

app.listen(app.get('port'),()=>{
    console.log(`Server now on port: ${app.get('port')}`)
})