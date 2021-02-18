const express=require('express');
const router=express.Router();
const mysql=require('../database')

router.get("/",(req,res,next)=>{
    mysql.query('SELECT * FROM courses ORDER BY course_id DESC;',(err,rows)=>{
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

router.get("/:courseId",(req,res,next)=>{
    const courseId=req.params.courseId;
    mysql.query('SELECT * FROM courses WHERE course_id=? ORDER BY course_id DESC;',courseId,(err,rows)=>{
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
    const courseTitle=req.query.courseTitle;
    const courseDescription=req.query.courseDescription;
    
    mysql.query('INSERT INTO courses (course_title,course_description) VALUES (?,?)',[courseTitle,courseDescription],(err,rows)=>{
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

    const courseId=req.query.courseId;
    const newCourseTitle=req.query.newCourseTitle;
    const newCourseDescription=req.query.newCourseDescription;
    
    mysql.query('UPDATE courses SET course_title=?,course_description=? WHERE course_id=?',[newCourseTitle,newCourseDescription,courseId],(err,rows)=>{
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
    
    const courseId=req.query.courseId;
       
    mysql.query('DELETE FROM courses WHERE course_id=?',courseId,(err,rows)=>{
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