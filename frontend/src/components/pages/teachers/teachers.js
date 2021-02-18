import {Container,Table,Button,Row,Col,Modal,InputGroup, FormControl} from 'react-bootstrap'
import { useEffect, useState } from 'react';
import axios from 'axios'
import QueryStatus from '../../libraries/queryStatus'

function Teachers(){

    const [teachers,setTeachers]=useState([]);
    const [loaded, setLoaded]=useState(false);
    const [hasContent,setHasContent]=useState(false);
    const [insertionModal, setInsertionModal]=useState(false);
    const [updateModal, setUpdateModal]=useState(false);
    const [tobeUpdatedId,setToBeUpdatedId]=useState(0);

    const closeInsertion=()=>setInsertionModal(false);
    const showInsertion=()=>setInsertionModal(true);

    const closeUpdate=()=>setUpdateModal(false);
    const showUpdate=()=>setUpdateModal(true);

    const toBeUpdatedForm=async(id)=>{
        if(teachers){
           const index=teachers.findIndex(teacher=>teacher.teacher_id==id)
           await showUpdate()
           const inputElement=document.getElementById('update-teacher-name')  
           if(index!=-1 && inputElement){
                inputElement.value=teachers[index].teacher_name
                setToBeUpdatedId(id);
           }
        }
    }

    const getTeachers=async()=>{
        const teachersApi=await axios.get('http://192.168.1.15:4000/teachers');
        setTeachers(teachersApi.data);
    }

    const addTeacher=async(teacherName)=>{
        const addTeacherRequest=await axios({
            method: 'post',
            url: 'http://192.168.1.15:4000/teachers',
            params: {teacherName},
          });

        const response=addTeacherRequest.data;
        console.log(QueryStatus(response,'Insertion'))

        closeInsertion()
        getTeachers();
    }

    const updateTeacher=async(teacherId,newTeacherName)=>{
        const updateTeacherRequest=await axios({
            method: 'patch',
            url: 'http://192.168.1.15:4000/teachers',
            params: {teacherId,newTeacherName}
          });

        const response=updateTeacherRequest.data;
        console.log(QueryStatus(response,'Update'))

        closeUpdate();
        getTeachers();
    }

    const deleteTeacher=async(teacherId)=>{
        const deleteTeacherRequest=await axios({
            method: 'delete',
            url: 'http://192.168.1.15:4000/teachers',
            params: {teacherId}
          });

        const response=deleteTeacherRequest.data;
        console.log(QueryStatus(response,'Deletion'))

        getTeachers();
    }

    useEffect(()=>{
        getTeachers();
    },[])

    useEffect(()=>{
        if(teachers){
            setLoaded(true)
            setHasContent(teachers.length>0);
        }else{
            setLoaded(false);
        }
    },[teachers])

    return(
        <Container fluid>
            <Container className="mt-2">

            <Modal show={insertionModal} onHide={closeInsertion} onShow={closeUpdate}>
                <Modal.Header>
                <Modal.Title>Add new teacher</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <FormControl
                        placeholder="Teacher's name"
                        aria-label="teacher-name"
                        aria-describedby="new-teacher"
                        id='new-teacher-name'
                        />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={closeInsertion}>
                    Close
                </Button>
                <Button variant="primary" onClick={()=>addTeacher(document.getElementById('new-teacher-name').value)}>
                    Add
                </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={updateModal} onHide={closeUpdate} onShow={closeInsertion}>
                <Modal.Header>
                <Modal.Title>Update teacher</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <FormControl
                        placeholder="Teacher's name"
                        aria-label="teacher-name"
                        aria-describedby="new-teacher"
                        id='update-teacher-name'
                        />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={closeUpdate}>
                    Close
                </Button>
                <Button variant="primary" onClick={(e)=>updateTeacher(tobeUpdatedId,document.getElementById('update-teacher-name').value)}>
                    Update
                </Button>
                </Modal.Footer>
            </Modal>
                <Row>
                    <Col className='d-flex justify-content-md-start justify-content-center'>
                    <h2>Teachers</h2>
                    </Col>
                    <Col className='d-flex justify-content-md-end justify-content-center'>
                    <Button onClick={showInsertion}>Add new</Button>
                    </Col>
                </Row>
            <Table responsive>
                <thead>
                <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th colSpan='2' className='text-center'>Actions</th>
                </tr>
                </thead>
                <tbody>
                {loaded?
                    hasContent?
                    teachers.map((teacher,index)=>
                        <tr key={teacher.teacher_id}>
                            <td className='align-middle'>{index+1}</td>
                            <td className='align-middle'>{teacher.teacher_name}</td>
                            <td><div className='d-flex justify-content-center'><Button className='mx-auto' aria-labelledby={teacher.teacher_id} onClick={(e)=>toBeUpdatedForm(e.target.attributes['aria-labelledby'].value)} variant='outline-primary'>Edit</Button></div></td>
                            <td><div className='d-flex justify-content-center'><Button className='mx-auto' aria-labelledby={teacher.teacher_id} onClick={(e)=>deleteTeacher(e.target.attributes['aria-labelledby'].value)} variant='outline-danger'>Delete</Button></div></td>
                        </tr>
                    )
                    :
                    <tr>
                        <td colSpan='4'>No teacher has been found.</td>
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

export default Teachers;