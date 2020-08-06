import React, { InputHTMLAttributes } from 'react';
import './styles.css';

// Adicionar todos os atributos a um input
interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
	label: string;
	name: string;
}

const Input: React.FC<InputProps> = ({ label, name, ...rest}) => {
	return(
		<div className="input-block">
			<label htmlFor={name}>{label}</label>
			{/* Copiar demais propriedades de input com ...rest */}
			<input type="text" id={name} {...rest}/>
	</div>
	);
}

export default Input;