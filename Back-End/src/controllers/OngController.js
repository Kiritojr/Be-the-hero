const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

	async index (request, response) {
	const ongs = await connection('ongs').select('*');

	return response.json(ongs);
	},

	async create(request, response) {
		const { name, email, whatsapp, city, uf } = request.body;

		const id = crypto.randomBytes(4).toString('HEX'); // Encrypts with 4Bytes of random character and translates to Hexadecimal
		// Waits for code to finish to continue
		await connection('ongs').insert({
			id,
			name,
			email,
			whatsapp,
			city,
			uf,
		}); // Table name to insert data / columns 

		return response.json({ id });
		}
};
