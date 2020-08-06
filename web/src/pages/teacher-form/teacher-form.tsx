import React, { useState } from 'react';
import Header from '../../components/header/header-component';
import './styles.css';
import Input from '../../components/input';
import Textarea from '../../components/text-area';
import Select from '../../components/select';

import warningIcon from '../../assets/images/icons/warning.svg'
import { OPTIONS_DAY } from '../../utils/options-day';
import { OPTIONS_SUBJECT } from '../../utils/options-subject';

function TeacherForm() {
	// O useState por padrão retorna um array o primeira posição é o scheduleItems
	// A segunda posição é uma função que será usada para alterar o valor do state
	const [scheduleItems, setScheduleItems] = useState([
		{ week_day: 0, from: '', to: ''}
	]);
	// A propriedade do state não pode ser alterada diretamente - imutabilidade
	function addNewScheduleItem() {
		setScheduleItems([
			...scheduleItems,
			{ week_day: 0, from: '', to: ''}
		]);
		console.log('scheduleItems', scheduleItems)
	}

	return (
		<div id="page-teacher-form" className="container">
		<Header 
		title="Que incrível que você quer dar aulas."
		description="O primeiro passo é preencher esse formulário de inscrição"
		/>
		<main>
			<fieldset>
				<legend>Seus dados</legend>
					<Input name="name" label="Nome completo"/>
					<Input name="avatar" label="Avatar"/>
					<Input name="whatsapp" label="Whatsapp"/>
					<Textarea name="bio" label="Biografia"/>
			</fieldset>
			<fieldset>
				<legend>Sobre a aula</legend>
					<Select name="subject" label="Matéria" options={OPTIONS_SUBJECT}/>
					<Input name="cost" label="Custo da sua hora por aula"/>
			</fieldset>
			<fieldset>
				<legend>Horários disponíveis

					<button onClick={addNewScheduleItem} type="button">
						+ Novo horário
					</button>
				</legend>
				{scheduleItems.map(item => {
					return (
						<div key="week_day" className="schedule-item">
							<Select name="week_day" label="Dia da semana"
							options={OPTIONS_DAY}/>
							<Input name="from" label="Das" type="time"></Input>
							<Input name="to" label="Até" type="time"></Input>
						</div>
					);
				})}
			</fieldset>

			<footer>
				<p>
					<img src={warningIcon} alt="Aviso importante"/>
					Importante! <br/>
					Preencha todos os dados
				</p>
				<button type="button">
					Salvar cadastro
				</button>
			</footer>
		</main>
	</div>
	)
}

export default TeacherForm;