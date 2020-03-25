const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

	async index (request, response) {
	const ongs = await connection('ongs').select('*');

	return response.json(ongs);
	},

	async create(request, response) {
		const { name, email, whatsapp, city, uf } = request.body;

		const id = crypto.randomBytes(4).toString('HEX'); // Criptograva com 4Bytes de caracter aleatório e traduz em Hexadecimal
		// Aguarda o codigo finalizar para continuar
		await connection('ongs').insert({
			id,
			name,
			email,
			whatsapp,
			city,
			uf,
		}); // Nome da tabela para inserir dados/colunas 

		return response.json({ id });
		}
};