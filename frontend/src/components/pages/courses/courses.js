import {Container,Table,Button,Row,Col,Modal,InputGroup, FormControl} from 'react-bootstrap'
import { useEffect, useState } from 'react';
import axios from 'axios'
import QueryStatus from '../../libraries/queryStatus'
import {Link} from 'react-router-dom'

function Courses(){

    const [courses,setCourses]=useState([]);
    const [loaded, setLoaded]=useState(false);
    const [hasContent,setHasContent]=useState(false);
    const [insertionModal, setInsertionModal]=useState(false);
    
    const closeInsertion=()=>setInsertionModal(false);
    const showInsertion=()=>setInsertionModal(true);


    const getCourses=async()=>{
        const coursesApi=await axios.get('http://192.168.1.15:4000/courses');
        setCourses(coursesApi.data);
    }

    const addCourse=async(courseTitle,courseDescription)=>{
        const addCourseRequest=await axios({
            method: 'post',
            url: 'http://192.168.1.15:4000/courses',
            params: {courseTitle,courseDescription},
          });

        const response=addCourseRequest.data;
        console.log(QueryStatus(response,'Insertion'))

        closeInsertion()
        getCourses();
    }

    // const updateCourse=async(courseId,newCourseTitle,newCourseDescription)=>{
    //     const updateCourseRequest=await axios({
    //         method: 'patch',
    //         url: 'http://192.168.1.15:4000/courses',
    //         params: {courseId,newCourseTitle,newCourseDescription}
    //       });

    //     const response=updateCourseRequest.data;
    //     console.log(QueryStatus(response,'Update'))

    //     closeUpdate();
    //     getCourses();
    // }

    // const deleteCourse=async(courseId)=>{
    //     const deleteCourseRequest=await axios({
    //         method: 'delete',
    //         url: 'http://192.168.1.15:4000/courses',
    //         params: {courseId}
    //       });

    //     const response=deleteCourseRequest.data;
    //     console.log(QueryStatus(response))

    //     getCourses();
    // }

    useEffect(()=>{
        getCourses();
    },[])

    useEffect(()=>{
        if(courses){
            setLoaded(true)
            setHasContent(courses.length>0);
        }else{
            setLoaded(false);
        }
    },[courses])

    return(
        <Container fluid>
            <Container className="mt-2">

            <Modal show={insertionModal} onHide={closeInsertion}>
                <Modal.Header>
                <Modal.Title>Add new course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <FormControl
                        placeholder="Course title"
                        aria-label="course-title"
                        aria-describedby="new-course-title"
                        id='new-course-title'
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                        placeholder="Course description"
                        aria-label="course-description"
                        aria-describedby="new-course-description"
                        id='new-course-description'
                        />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={closeInsertion}>
                    Close
                </Button>
                <Button variant="primary" onClick={()=>addCourse(document.getElementById('new-course-title').value,document.getElementById('new-course-description').value)}>
                    Add
                </Button>
                </Modal.Footer>
            </Modal>

            <Row>
                <Col className='d-flex justify-content-md-start justify-content-center'>
                <h2>Courses</h2>
                </Col>
                <Col className='d-flex justify-content-md-end justify-content-center'>
                <Button onClick={showInsertion}>Add new</Button>
                </Col>
            </Row>
            <Table responsive>
                <thead>
                <tr>
                    <th className='text-center'>No.</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th className="text-center">Actions</th>
                </tr>
                </thead>
                <tbody>
                {loaded?
                    hasContent?
                    courses.map((course,index)=>
                        <tr key={course.course_id}>
                            <td className='align-middle text-center'>{index+1}</td>
                            <td className='align-middle'>{course.course_title}</td>
                            <td className='align-middle'>{course.course_description}</td>
                            <td><div className='d-flex justify-content-center'><Link to={`/courses/${course.course_id}`} className='btn btn-outline-primary'>Details</Link></div></td>
                        </tr>
                    )
                    :
                    <tr>
                        <td colSpan='4'>No course has been found.</td>
                    </tr>
                :
                    <tr>
                        <td colSpan='4'>Loading...</td>
                    </tr>
                }
                </tbody>
            </Table>
            </Container>
        </Container>
    )
}

export default Courses;