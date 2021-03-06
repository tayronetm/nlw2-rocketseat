import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeaderProps } from './models/page-header.model';

import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';

import './header.css'

// COMPONENTE QUE RECEBE PROPRIEDADES
const Header: React.FC<PageHeaderProps> = (props) => {
	return(
		<header className="page-header">
		<div className="top-bar-container">
			<Link to="/">
				<img src={backIcon} alt="Voltar" />
			</Link>
			<img src={logoImg} alt="Proffy" />
		</div>

		<div className="header-content">
			<strong>{props.title}</strong>
			{/* Primeira forma */}
			{/* { props.description ? <p>{props.description}</p> : null} */}
			{/* Segunda forma */}
			{ props.description && <p>{props.description}</p>}
			{props.children}
		</div>
		</header>
	); 
}

export default Header;
