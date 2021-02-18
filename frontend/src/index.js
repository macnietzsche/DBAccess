import React,{lazy,Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navigation from './components/navbar/navigation'

const Assignations=lazy(()=>import('./components/pages/assignations/assignations'))
const Courses=lazy(()=>import('./components/pages/courses/courses'))
const Teachers=lazy(()=>import('./components/pages/teachers/teachers'))
const Course=lazy(()=>import('./components/pages/courses/course/course'))


ReactDOM.render(
    <Router>
      <Navigation/>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path='/courses' exact component={Courses}></Route>
          <Route path='/teachers' exact component={Teachers}></Route>
          <Route path='/courses/:id' exact component={Course}></Route>
          <Redirect  from='*' to='/courses'></Redirect>
        </Switch>
      </Suspense> 
    </Router>
 ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
