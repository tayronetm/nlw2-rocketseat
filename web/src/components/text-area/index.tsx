import React, { TextareaHTMLAttributes } from 'react';
import './styles.css';

// Adicionar todos os atributos a um Textarea
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
	label: string;
	name: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, name, ...rest}) => {
	return(
		<div className="textarea-block">
			<label htmlFor={name}>{label}</label>
			{/* Copiar demais propriedades de Textarea com ...rest */}
			<textarea id={name} {...rest}/>
	</div>
	);
}

export default Textarea;