import { Container,Row,Col,Button,Modal } from "react-bootstrap";
import axios from 'axios'
import { useEffect, useState } from "react";
import CourseAssignations from './courseAssignations/courseAssignations'
import QueryStatus from '../../../libraries/queryStatus'
import {useHistory} from 'react-router-dom'


const Course=({match})=>{

    const history=useHistory();

    const [course,setCourse]=useState([]);
    const [loaded,setLoaded]=useState(false);
    const [hasContent, setHasContent]=useState(false);
    const [showModal,setShowModal]=useState(false);
    const [allTeachers,setAllTeachers]=useState([]);
    const [allTeachersReady,setAllTeachersReady]=useState(false);

    const getAllTeachers=async()=>{
        const allTeachersRequest=await axios.get(`http://192.168.1.15:4000/teachers`);
        setAllTeachers(allTeachersRequest.data);       
    }
    
    const handleClose=()=>setShowModal(false);
    const handleShow=()=>{
        getAllTeachers()
        setShowModal(true)
    };

    useEffect(()=>{
        if(allTeachers){
            setAllTeachersReady(allTeachers.length>0)
        }
    },[allTeachers])


    const assignTeacher=async(teacherId,courseId)=>{

        if(teacherId!=-1){
            const requestNewAssign=await axios({
                method: 'post',
                url: 'http://192.168.1.15:4000/assignations/',    
                params: {teacherId,courseId}
            })

            const response=requestNewAssign.data;
            console.log(QueryStatus(response,'New Assing'))

            getCourse();
            handleClose()

        }else{
            console.log('The teacher ID is not valid.')
        }
    }

    const getCourse=async()=>{
        const courseRequest=await axios.get(`http://192.168.1.15:4000/courses/${match.params.id}`);
        setCourse(courseRequest.data);        
    }

    const deleteCourse=async(courseId)=>{
        const requestDelete=await axios({
            method: 'delete',
            url: 'http://192.168.1.15:4000/courses/',    
            params: {courseId}
        })

        const response=requestDelete.data
        const requestStatus=QueryStatus(response,'Deletion')
        console.log(requestStatus)
        if(requestStatus[0]){
            history.push('/courses')
        }

    }

    useEffect(()=>{
        if(course){
            setLoaded(true);
            setHasContent(course.length>0)
        }else{
            setLoaded(false)
        }
    },[course])

    useEffect(()=>{
        getCourse();
    },[])

    return(
       <Container fluid>
           <Container className='mt-2'>
               {loaded?
                    hasContent?
                   
                        course.map(item=>
                            <Container key={`course${item.course_id}`}>
                                 <Modal show={showModal} onHide={handleClose}>
                                    <Modal.Header>
                                    <Modal.Title>Assign new teacher to: {item.course_title}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <select className="form-select" aria-label="Teacher selection" id='teacher-select'>
                                            {allTeachersReady?
                                                allTeachers.map((teacher,index)=><option key={`teacher-${teacher.teacher_id}`} value={teacher.teacher_id} defaultValue={1} >{teacher.teacher_name}</option>)
                                            :<option defaultValue value='-1'>No teacher has been found</option>
                                            }
                                        </select>
                                    </Modal.Body>
                                    <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button onClick={()=>assignTeacher(document.getElementById('teacher-select').value,item.course_id)}>Assign teacher</Button>
                                    </Modal.Footer>
                                </Modal>

                                <Row className="mb-3">
                                    <Col lg='6' md="6" sm="12" className='d-flex justify-content-md-start justify-content-center'>
                                        <h1>{`${item.course_id} | ${item.course_title}`}</h1>                                 
                                    </Col>
                                    <Col sm="12" className='d-flex d-md-none justify-content-md-start justify-content-center'>
                                        <p className='text-center text-md-start'>{item.course_description}</p>                                 
                                    </Col>
                                    <Col lg='6' md="6" sm="12" className='d-flex justify-content-md-end justify-content-center'>
                                    <Button variant='outline-primary' onClick={handleShow}>New Assignation</Button>
                                    <Button id={item.course_id} className='mx-1' variant='outline-danger' onClick={(e)=>deleteCourse(e.target.id)}>Delete</Button>
                                    </Col>                    
                                </Row>
                                <p className='text-center text-md-start d-none d-md-block'>{item.course_description}</p>
                                <CourseAssignations courseId={item.course_id}/>
                               
                            </Container>                  
                        )
                    :<div>Loading</div>
                :<div>Loading...</div>
               }
                           
           </Container>
       </Container> 
    )


}

export default Course;