import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './pages/home/home';
import TeacherList from './pages/teacher-list/teacher-list';
import TeacherForm from './pages/teacher-form/teacher-form';

function Routes() {
	return (
		<BrowserRouter>
			<Route path="/" exact component={Landing}/>
			<Route path="/study" component={TeacherList}/>
			<Route path="/give-classes" component={TeacherForm}/>
		</BrowserRouter>
	)
}

export default Routes;