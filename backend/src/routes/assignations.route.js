const express=require('express');
const router=express.Router();
const mysql=require('../database')

function groupAssignations(rows){
    if(rows){
        const singleCourseModel={}
        const result=rows.reduce((accumulator,row)=>{
            const key=row.course_id
            if(!singleCourseModel[key]){
                singleCourseModel[key]={
                    course_id: key,
                    course_title: row.course_title,
                    course_description: row.course_description,
                    teachers: []
                }
                accumulator.push(singleCourseModel[key])
            }

            if(singleCourseModel[key]){
                singleCourseModel[key].teachers.push({
                    assignation_id: row.assignation_id,
                    teacher_id: row.teacher_id,
                    teacher_name: row.teacher_name,
                    assignation_date: row.assignation_date
                })
            }
            return accumulator;
        },[])

        return result;
    }else{
        return [];
    }

}

router.get("/",(req,res,next)=>{
    mysql.query('SELECT * FROM assignations',(err,rows)=>{
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

router.get("/courses",(req,res,next)=>{
    mysql.query('SELECT * FROM assignations AS a JOIN teachers AS t ON a.teacher_id=t.teacher_id JOIN courses AS c ON c.course_id=a.course_id ORDER BY a.assignation_id DESC',(err,rows)=>{
        try {
            if(err){
                next(err)
                throw err
            }else{
                res.send(groupAssignations(rows))
            }
        } catch (error) {
            res.send(error)
        }
    })
})

router.get("/courses/:courseId",(req,res,next)=>{
    const courseId=req.params.courseId;
    mysql.query('SELECT * FROM assignations AS a JOIN teachers AS t ON a.teacher_id=t.teacher_id JOIN courses AS c ON c.course_id=a.course_id WHERE a.course_id=? ORDER BY a.assignation_id DESC',courseId,(err,rows)=>{
        try {
            if(err){
                next(err)
                throw err
            }else{
                res.send(groupAssignations(rows))
            }
        } catch (error) {
            res.send(error)
        }
    })
})

router.post("/",(req,res,next)=>{

    const teacherId=req.query.teacherId;
    const courseId=req.query.courseId;
    
    mysql.query('INSERT INTO assignations (teacher_id,course_id,assignation_date) VALUES (?,?,NOW())',[teacherId,courseId],(err,rows)=>{
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

    const assignationId=req.query.assignationId;

    mysql.query('DELETE FROM assignations WHERE assignation_id=?',assignationId,(err,rows)=>{
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