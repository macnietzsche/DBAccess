const mysql =require('mysql')

const con=mysql.createConnection({
    host: 'localhost',
    database: 'dbaccess',
    user: 'root',
    password: '',
    timezone: 'Z'
})

con.connect((err)=>{
   try {
       if(err) throw err;
       console.log('Successful DB Conection')
   } catch (error) {
       console.log(error)  
   }
})

module.exports=con;