
var userArray = [];

let btnAdd = document.getElementById("btnUserAdd");
let btnFilter = document.getElementById("btnFilter");
let busquedaField = document.getElementById("busqueda");
let bodyOnload = document.getElementById("bodyOnload");

//var graphicArray = [];

// AGREGO LOS LISTENERS DE LOS BOTONES
btnAdd.addEventListener("click", newUser);
btnFilter.addEventListener("click", filterAZ);

// LISTENER PARA LA TECLA ENTER EN EL CAMPO DE BUSQUEDA DE PERFIL, O CUANDO SU VALUE CAMBIE
busquedaField.addEventListener("keypress", (event)=> {
	if (event.keyCode === 13) {
		buscar();
	}
});
busquedaField.addEventListener("change", buscar);

// AQUI ESTOY CARGANDO LA INFORMACION DEL LOCALSTORAGE EN EL ARRAY, DEBO DE HACER ESTO EN EL INICIO SIEMPRE

window.addEventListener('DOMContentLoaded', test, false);

function test() {
	//alert('cargo');

	if (localStorage.getItem('usuarios') == null) {
		userArray = [];
	} else {
		userArray = localStorage.getItem('usuarios');
		userArray = JSON.parse(userArray);
	
		graficar(userArray);
	}

}

function newUser() {

	if (document.getElementById("name").value == '' || document.getElementById("age").value == '' || document.getElementById("career").value == '' || document.getElementById("about").value == '') {
		alert('Todos los campos deben de estar llenos');
	} else {
			var user = {
					name: document.getElementById("name").value,
					age: document.getElementById("age").value,
					career: document.getElementById("career").value,
					about: document.getElementById("about").value
			}
			userArray.push(user);
			//graficar(userArray);


			// AQUI TENGO QUE EXPORTAR LA INFO AL LOCAL STORAGE - Y DEBO DE ENVIAR ESE ARRAY A GRAFICAR
			localStorage.setItem('usuarios', JSON.stringify(userArray));
			//userArray = localStorage.getItem('usuarios');  ESTO ES INNECESARIO
			//userArray = JSON.parse(userArray);  ESTO ES INNECESARIO

			graficar(userArray);

			//console.log(userArray);
			
	}	
}

function graficar(usuarios){

	var html_perfil = document.getElementById("perfiles");
			
	//variable que guarda todo el html que quiero renderizar
	perfil='';

	for (let i = 0; i < usuarios.length; i++) {
		perfil = perfil + "<div class='card mx-2 p-2' style='width: 18rem;'> <div class='card-body'> <h5 class='card-title'>"+usuarios[i].name+"</h5> <p class='card-text'>"+usuarios[i].age+"</p> <p class='card-text'>"+usuarios[i].career+"</p> <p class='card-text'>"+usuarios[i].about+"</p> </div> <div class='card-body'> <button class='btn btn-danger' onClick='deleteUser("+i+");'><i class='fa-solid fa-user-xmark'></i>  Eliminar</button></button></div> </div>"; 			
	}
	//Renderizo todo apenas acabe
	html_perfil.innerHTML = perfil;
	//console.log(perfil)
	//console.log(graphicArray);
}

function filterAZ() {

	userArray.sort( function filtro(a, b) {
		if (a.name > b.name) return 1;
		if (a.name < b.name) return -1;
		
		return result = 0;
	});
	
	graficar(userArray);
}

function buscar() {
	busqueda = document.getElementById("busqueda").value;
	resultado = [];
	for (let i = 0; i < userArray.length; i++) {
		console.log(userArray[i].name);
		console.log(busqueda);
		if((userArray[i].name).indexOf(busqueda) != -1){
			resultado.push(userArray[i]);
		}
	}
	graficar(resultado);
}

function deleteUser(id){
	alert('Eliminaras al usuario '+userArray[id].name+", estas seguro?");
	userArray.splice(id,1);
	graficar(userArray);

}