const express=require('express');
const router=express.Router();
const mysql=require('../database')

router.get("/",(req,res,next)=>{
    mysql.query('SELECT * FROM teachers ORDER BY teacher_name ASC',(err,rows)=>{
        try {
            if(err){
                next(err)
                throw err
            }else{
                res.send(rows)
            }
        } catch (error) {
            console.log(error) 
        }
    })
})

router.get("/:teacherId",(req,res,next)=>{
    const teacherId=req.params.teacherId;
    mysql.query('SELECT * FROM teachers WHERE teacher_id=? ORDER BY teacher_name ASC',teacherId,(err,rows)=>{
        try {
            if(err){
                next(err)
                throw err
            }else{
                res.send(rows)
            }
        } catch (error) {
            console.log(error) 
        }
    })
})

router.post("/",(req,res,next)=>{
    const teacherName=req.query.teacherName;

    console.log(teacherName)
    
    mysql.query('INSERT INTO teachers (teacher_name) VALUES (?)',teacherName,(err,rows)=>{
        try {
            if(err){
                next(err)
                throw err
            }else{
                res.send(rows)
            }
        } catch (error) {
            res.send(error)
        }
    })
})

router.patch("/",(req,res,next)=>{
    const teacherId=req.query.teacherId;
    const newTeacherName=req.query.newTeacherName;
    
    mysql.query('UPDATE teachers SET teacher_name=? WHERE teacher_id=?',[newTeacherName,teacherId],(err,rows)=>{
        try {
            if(err){
                next(err)
                throw err
            }else{
                res.send(rows)
            }
        } catch (error) {
            res.send(error)
        }
    })
})

router.delete("/",(req,res,next)=>{
    const teacherId=req.query.teacherId;
    console.log(teacherId)
        
    mysql.query('DELETE FROM teachers WHERE teacher_id=?',teacherId,(err,rows)=>{
        try {
            if(err){
                next(err)
                throw err
            }else{
                res.send(rows)
            }
        } catch (error) {
            res.send(error)
        }
    })
})

module.exports=router;