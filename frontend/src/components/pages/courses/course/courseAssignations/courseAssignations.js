import { Container,Table,Row,Col,Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from 'axios'
import QueryStatus from '../../../../libraries/queryStatus'

function CourseAssignations(props){

    const [teachers,setTeachers]=useState([])
    const [hasContent, setHasContent]=useState(false)

    
    const getTeachers=async()=>{
        const teachersRequest=await axios.get(`http://192.168.1.15:4000/assignations/courses/${props.courseId}`);
        const response=teachersRequest.data;
        if(response[0]){
            if('teachers' in response[0]){
                setTeachers(teachersRequest.data[0].teachers)
            }else{
                setTeachers([])
            } 
        }else{
            setTeachers([])
        }
    }

    const deleteAssignation=async(assignationId)=>{
        const requestDelete=await axios({
            method: 'delete',
            url: 'http://192.168.1.15:4000/assignations/',
            params: {assignationId}
        })

        const response=requestDelete.data;
        QueryStatus(response,'Assignment Deletion')

        getTeachers();
        setHasContent(teachers.length>0)
    }

    useEffect(()=>{
        getTeachers();        
    },[props])

    useEffect(()=>{
        if(teachers){
            setHasContent(teachers.length>0)
        }else{
            setHasContent(false);  
        }
    },[teachers])

    

    return (
        <Container fluid>
            {hasContent?
                <Container>
                    <h3 className='text-center'>Current teacher</h3>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th className='text-center'>Assignation ID</th>
                                <th className='text-center'>Name</th>
                                <th className='text-center'>Teacher ID</th>
                                <th className='text-center'>Assignation date</th>
                                <th className='text-center'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='align-middle text-center'>{teachers[0]?teachers[0].assignation_id:''}</td>
                                <td className='align-middle text-center'>{teachers[0]?teachers[0].teacher_name:''}</td>
                                <td className='align-middle text-center'>{teachers[0]?teachers[0].teacher_id:''}</td>
                                <td className='align-middle text-center'>{teachers[0]?teachers[0].assignation_date:''}</td>
                                <td className='align-middle text-center'><Button id={teachers[0]?teachers[0].assignation_id:''} onClick={(e)=>deleteAssignation(e.target.id)} variant='outline-primary'>Delete</Button></td>
                            </tr>
                        </tbody>
                    </Table>
        
                     {teachers.length>1?
                        <>
                             <h3 className='text-center mt-5'>Previous assignations</h3>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th className='text-center'>No.</th>
                                            <th className='text-center'>Assignation ID</th>
                                            <th>Teacher</th>
                                            <th className='text-center'>Teacher ID</th>
                                            <th className='text-center'>Assignation date</th>
                                            <th className='text-center'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {teachers.slice(1).map((teacher,index)=>
                                         <tr key={`assign-${index}`}>
                                            <td className='text-center align-middle'>{index+1}</td>
                                            <td className='text-center align-middle'>{teacher.assignation_id}</td> 
                                            <td className='align-middle'>{teacher.teacher_name}</td>
                                            <td className='text-center align-middle'>{teacher.teacher_id}</td>
                                            <td className='text-center align-middle'>{teacher.assignation_date}</td>
                                            <td className='d-flex justify-content-center align-middle'><Button id={teacher.assignation_id} onClick={(e)=>deleteAssignation(e.target.id)} variant='outline-primary'>Delete</Button></td>
                                        </tr>
                                    )}
                                    </tbody>
                                </Table>
                        </>
                     
                    :''
                    }
                </Container>
            :
            <div>There have not been teachers assigned to this course.</div>
            }
           
        </Container>
    )

}

export default CourseAssignations;