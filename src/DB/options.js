export const optionsMySQL = {
	options: {
		client: "mysql",
		connection: {
			host: "127.0.0.1",
			user: "root",
			password: "",
			database: "ecommerce",
		},
	},
	table: "products",
};

export const optionsSQLite = {
	options: {
		client: "sqlite3",
		connection: { filename: "./src/DB/ecommerce.sqlite" },
		useNullAsDefault: true,
	},
	table: "chat",
};
