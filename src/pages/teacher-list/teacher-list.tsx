import React from 'react';
import Header from '../../components/header/header-component';

import './teacher-list.css';
import TeacherItem from '../../components/teacher-item/teacher-item-component';

function TeacherList() {
	return (
		<div id="page-teacher-list" className="container">
			<Header title="Estes são  os profys disponíveis.">
				{/* ESTE CONTEUDO SERA EXIBIDO DENTRO DO HEADER ATRAVES DO PROPS.CHILDREN */}
				<form id="search-teachers">
					<div className="input-block">
						<label htmlFor="subject">Matéria</label>
						<input type="text" id="subject"/>
					</div>

					<div className="input-block">
						<label htmlFor="week_day">Dia semana</label>
						<input type="text" id="week_day"/>
					</div>

					<div className="input-block">
						<label htmlFor="time">Hora</label>
						<input type="text" id="time"/>
					</div>
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
 