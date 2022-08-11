import knex from "knex";

class Chat {
	constructor({ table, options }) {
		this.table = table;
		this.knex = knex(options);
	}

	async newTable() {
		try {
			return this.knex.schema.dropTableIfExists(this.table).finally(() => {
				return this.knex.schema.createTable(this.table, (table) => {
					table.string("author", 50).notNullable();
					table.string("date");
					table.string("text");
				});
			});
		} catch (error) {
			throw new Error(`Error al crear tabla: ${error}`);
		}
	}

	async getAll() {
		try {
			const response = [];
			await this.knex
				.select()
				.from(this.table)
				.then((rows) => {
					for (const row of rows) {
						response.push(row);
					}
				})
				.catch((err) => {
					console.log(err);
					throw err;
				});
			return response;
			// .finally(() => {
			// 	this.knex.destroy();
			// });
		} catch (error) {
			throw new Error(`Error al listar todo: ${error}`);
		}
	}

	async save(message) {
		try {
			await this.knex.schema.hasTable(this.table).then(async (exists) => {
				if (!exists) {
					await this.newTable();
					await this.knex
						.insert(message)
						.from(this.table)
						.then(() => console.log("mensaje guardado."))
						.catch((err) => {
							console.log(err);
							throw err;
						});
					// .finally(() => {
					// 	this.knex.destroy();
					// });
				} else {
					await this.knex
						.insert(message)
						.from(this.table)
						.then(() => console.log("producto guardado."))
						.catch((err) => {
							console.log(err);
							throw err;
						});
					// .finally(() => {
					// 	this.knex.destroy();
					// });
				}
			});
		} catch (error) {
			throw new Error(`Error al guardar un producto: ${error}`);
		}
	}
}

export default Chat;
