import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../Services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Login() {
	const [id, setId] = useState('');
	const history = useHistory();

	async function handLogin(e) {
		e.preventDefault();

		try {
			const response = await api.post('sessions', { id });

			localStorage.setItem('ongId', id);
			localStorage.setItem('ongName', response.data.name);

			history.push('/profile');
		} catch(err) {
			alert('Falha no login, tente novamente.');
		}
	}

	return (
		<div className="login-container">
			<session className="form">
				<img src={logoImg} alt="Be the Hero" />

				<form onSubmit={handLogin}>
					<h1>Faça seu login</h1>

					<input 
						placeholder="Sua ID" 
						value={id}
						onChange={e => setId(e.target.value)}
					/>
					<button className="button" type="submit">Entrar</button>

					<Link className="back-link" to="/register">
						<FiLogIn size={20} color="#E02041" />
						Não tenho cadastro
					</Link>
				</form>
			</session>

			<img src={heroesImg} alt="heroes" />
		</div>
	);
}