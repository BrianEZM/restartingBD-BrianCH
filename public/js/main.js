const socket = io.connect();

socket.on("messages", (data) => {
	const html = data
		.map((element) => {
			return `
      <p>
        <strong>${element.author}</strong> <span>[${element.date}]</span> : <br/> <i>${element.text}</i>
      </p>
    `;
		})
		.join(" ");
	document.getElementById("chat").innerHTML = html;
});

function addMessage() {
	const today = new Date();
	const now = today.toLocaleDateString();
	const message = {
		author: document.querySelector("#usermail").value,
		date: now,
		text: document.querySelector("#text").value,
	};
	socket.emit("new-message", message);
	return false;
}

function renderProducts({ response: response }) {
	const $productsContainer = document.querySelector("#productsContainer");

	$productsContainer.innerHTML = ejs.render(
		`
    <% for(let i = 0; i < response.length; i++) { %>
      <tr>
        <td><%= response[i].nombre %></td>
        <td>$ <%= response[i].precio %></td>
        <td><%= response[i].stock %></td>
        <td>
          <img src=<%= response[i].imagen %> alt=<%= response[i].nombre %> width="100px">
        </td>
      </tr>
    <% } %>
    `,
		{ response: response }
	);
}

socket.on("products", (response) => {
	renderProducts({ response });
});

function addProduct() {
	const product = {
		nombre: document.querySelector("#nombre").value,
		precio: document.querySelector("#precio").value,
		imagen: document.querySelector("#imagen").value,
		stock: document.querySelector("#stock").value,
	};
	socket.emit("new-product", product);
	return false;
}
