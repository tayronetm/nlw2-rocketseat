import React from 'react';
import Header from '../../components/header/header-component';

import './teacher-list.css';
import TeacherItem from '../../components/teacher-item/teacher-item-component';
import Input from '../../components/input';
import Select from '../../components/select';
import { OPTIONS_SUBJECT } from '../../utils/options-subject';
import { OPTIONS_DAY } from '../../utils/options-day';

function TeacherList() {
	return (
		<div id="page-teacher-list" className="container">
			<Header title="Estes são  os profys disponíveis.">
				{/* ESTE CONTEUDO SERA EXIBIDO DENTRO DO HEADER ATRAVES DO PROPS.CHILDREN */}
				<form id="search-teachers">
				<Select name="subject" label="Matéria" options={OPTIONS_SUBJECT}/>
					<Select name="week_day" label="Dia da semana" options={OPTIONS_DAY}/>
					<Input type="time" name="time" label="Hora"/>
				</form>
			</Header>
			<main>
				<TeacherItem/>
				<TeacherItem/>
				<TeacherItem/>
			</main>
		</div>
	)
}

export default TeacherList;
 