import express from "express";
const router = express.Router();

// <------------------------- Contenedor de Productos ------------------------->
import { optionsMySQL } from "../DB/options.js";
import Contenedor from "../contenedor.js";

const contenedor = new Contenedor({
	options: optionsMySQL.options,
	table: optionsMySQL.table,
});

// <------------------------- Configuracion Rutas ------------------------->

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// <------------------------- Rutas ------------------------->

router.get("/:id?", async (req, res) => {
	const { id } = req.params;
	if (id !== undefined) {
		const response = await contenedor.get(Number(id));
		res.render("idProduct", { response });
	} else {
		const response = await contenedor.getAll();
		res.render("allProducts", { response });
	}
});

router.post("/", async (req, res) => {
	const { nombre, precio, imagen, stock } = req.body;
	if (nombre === "" || precio === "" || imagen === "" || stock === "") {
		res.render("addProduct", { response: false });
	} else {
		const response = {
			nombre: nombre,
			precio: Number(precio),
			imagen: imagen,
			stock: Number(stock),
		};
		await contenedor.save(response);
		console.log(response);
		res.render("addProduct", { response: response });
	}
});

router.put("/:id", async (req, res) => {
	const { nombre, precio, imagen, stock } = req.body;
	const { id } = req.params;
	if (nombre === "" || precio === "" || imagen === "" || stock === "") {
		res.render("updateProduct", { response: false });
	} else {
		// const response = {
		// 	nombre: nombre,
		// 	precio: Number(precio),
		// 	imagen: imagen,
		// 	cantidad: Number(stock),
		// };
		// await contenedor.update(Number(id), response);

		const response = await contenedor.update(Number(id), {
			nombre: nombre,
			precio: Number(precio),
			imagen: imagen,
			stock: Number(stock),
		});
		console.log(response);
		res.render("updateProduct", { response });
	}
});

router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	const response = await contenedor.delete(Number(id));
	res.render("deleteProduct", { response });
});

export default router;
