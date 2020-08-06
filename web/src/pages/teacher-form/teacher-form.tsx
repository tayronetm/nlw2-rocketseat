import React, { useState, FormEvent } from "react";
import Header from "../../components/header/header-component";
import "./styles.css";
import Input from "../../components/input";
import Textarea from "../../components/text-area";
import Select from "../../components/select";

import warningIcon from "../../assets/images/icons/warning.svg";
import { OPTIONS_DAY } from "../../utils/options-day";
import { OPTIONS_SUBJECT } from "../../utils/options-subject";
import api from "../../services/api";
import { useHistory } from 'react-router-dom';

function TeacherForm() {
	const history = useHistory();
  // O useState por padrão retorna um array o primeira posição é o scheduleItems
  // A segunda posição é uma função que será usada para alterar o valor do state
 
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [bio, setBio] = useState("");

  const [subject, setSubject] = useState("");
  const [cost, setCost] = useState("");

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: "", to: "" },
  ]);
  // A propriedade do state não pode ser alterada diretamente - imutabilidade
  function addNewScheduleItem() {
    setScheduleItems([...scheduleItems, { week_day: 0, from: "", to: "" }]);
  }

  function handleCreateClass(e: FormEvent) {
		e.preventDefault();
		
		api.post('classes', {
			name, 
			avatar, 
			whatsapp, 
			bio, 
			subject, 
			cost: Number(cost), 
			schedule: scheduleItems
		}).then(() => {
			alert('Cadastro realizado com sucesso');
			// Redirecionar após ação
			history.push('/');
		}).catch(() => {
			alert('Ocorreu um erro ao cadastrar uma aula')
		})
  }

  function setScheduleItemValue(
    position: number,
    field: string,
    value: string
  ) {
    const newArray = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });
    setScheduleItems(newArray);
  }

  return (
    <div id="page-teacher-form" className="container">
      <Header
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição"
      />
      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input
              name="name"
              label="Nome Completo"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={(e) => {
                setAvatar(e.target.value);
              }}
            />
            <Input
              name="whatsapp"
              label="WhatsApp"
              value={whatsapp}
              onChange={(e) => {
                setWhatsapp(e.target.value);
              }}
            />
            <Textarea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>
            <Select
              name="subject"
              label="Matéria"
              options={OPTIONS_SUBJECT}
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
              }}
            />
            <Input
              name="cost"
              label="Custo da sua hora por aula"
              value={cost}
              onChange={(e) => {
                setCost(e.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button onClick={addNewScheduleItem} type="button">
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((item, index) => {
              return (
                <div key="week_day" className="schedule-item">
                  <Select
                    name="week_day"
										label="Dia da semana"
										value={item.week_day}
                    onChange={(e) => {
                      setScheduleItemValue(index, "week_day", e.target.value);
                    }}
                    options={OPTIONS_DAY}
                  />
                  <Input
                    name="from"
                    label="Das"
                    value={item.from}
                    type="time"
                    onChange={(e) => {
                      setScheduleItemValue(index, "from", e.target.value);
                    }}
                  ></Input>
                  <Input
                    name="to"
										label="Até"
										value={item.to}
                    onChange={(e) => {
                      setScheduleItemValue(index, "to", e.target.value);
                    }}
                    type="time"
                  ></Input>
                </div>
              );
            })}
          </fieldset>
        </form>

        <footer>
          <p>
            <img src={warningIcon} alt="Aviso importante" />
            Importante! <br />
            Preencha todos os dados
          </p>
          <button type="submit" onClick={handleCreateClass}>Salvar cadastro</button>
        </footer>
      </main>
    </div>
  );
}

export default TeacherForm;
