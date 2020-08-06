import React from 'react';

import './teacher-item.css';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import api from '../../services/api';

export interface Teacher {
	id: number;
	subject: string;
	cost: number;
	name: string;
	avatar: string;
	whatsapp: string;
	bio: string;
}
interface TeacherItemProps {
	teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {

	function createNewConnection() {
		api.post('connections', {
			user_id: teacher.id
		})
	}

	return (
		<article className="teacher-item">
		<header>
			<img src={teacher.avatar} alt={teacher.avatar}/>
			<div>
				<strong>{teacher.name}</strong>
				<span>{teacher.subject}</span>
			</div>
		</header>
		<p>{teacher.bio}</p>
		<footer>
        <p>
          Preço/Hora
          <strong>R$ {teacher.cost},00</strong>
        </p>
        <a target="_blank" onClick={createNewConnection} href={`https://wa.me/${teacher.whatsapp}?text=Olá%20${teacher.name}%20eu%20gostaria%20de%20estudar%20com%20você`}>
          <button type="button">
            <img src={whatsappIcon} alt="WhatsApp"/>
            Entrar em Contato
          </button>
        </a>
      </footer>
	</article>
	)
}

export default TeacherItem;