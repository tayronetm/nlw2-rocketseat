import React, { useState, FormEvent } from "react";
import Header from "../../components/header/header-component";

import TeacherItem, { Teacher } from "../../components/teacher-item/teacher-item-component";
import Input from "../../components/input";
import Select from "../../components/select";
import { OPTIONS_SUBJECT } from "../../utils/options-subject";
import { OPTIONS_DAY } from "../../utils/options-day";
import api from "../../services/api";
import "./teacher-list.css";

function TeacherList() {
	const [teachers, setTeachers] =useState([]);

  const [subject, setSubject] = useState("");
  const [week_day, setWeekDay] = useState("");
	const [time, setTime] = useState("");
	
	async function searchTeachers(e: FormEvent) {
		e.preventDefault();

		const response = await api.get('classes', {
			params: {
				subject,
				week_day,
				time
			}
		})

		setTeachers(response.data);
	}
  return (
    <div id="page-teacher-list" className="container">
      <Header title="Estes são  os profys disponíveis.">
        {/* ESTE CONTEUDO SERA EXIBIDO DENTRO DO HEADER ATRAVES DO PROPS.CHILDREN */}
        <form id="search-teachers" onSubmit={searchTeachers}>
					<Select 
					name="subject" 
					label="Matéria" 
					value={subject}
					onChange={e=> { setSubject(e.target.value)}}
					options={OPTIONS_SUBJECT} />
					<Select 
					name="week_day" 
					label="Dia da semana" 
					value={week_day}
					onChange={e=> { setWeekDay(e.target.value)}}
					options={OPTIONS_DAY} />
					<Input 
					type="time" 
					name="time" 
					value={time}
					onChange={e=> { 
						setTime(e.target.value)
					}}
					label="Hora" />
					<button type="submit">Buscar</button>
        </form>
      </Header>
      <main>
				{teachers.map((teacher: Teacher) => {
					return <TeacherItem key={teacher.id} teacher={teacher} />
				})}
      </main>
    </div>
  );
}

export default TeacherList;
