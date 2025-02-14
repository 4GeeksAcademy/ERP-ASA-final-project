const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			messageee: "hola",
			employeesList: [],
			selected: [],
			auth: false

			// Ejemplo completo data:
			// employeesList: [
			// 	{id: 0,
			// 	name: "Alvaro",
			// 	lastName: "Ruiz",
			// 	dni: "99999999T",
			// 	address: "aqui",
			// 	email: "alvaro@gmail.com",
			// 	birthdate: "10/10/2010",
			// 	department: "RRHH",
			// 	role: "manager",
			// 	salary: "99999999"
			// 	},
			// ]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			getEmployeesList: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/employees")
					const data = await resp.json()

					setStore({ employeesList: data.results })
					return true;
				} catch (error) {
					console.log("Error loading message from backend", error)
					return false;
				}
			},
			deleteWorker: async (id) => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "api/employees/" + id[0], {method: "DELETE"})
					const data = await resp.json()
					
					setStore({ employeesList: data.results })
					return true;
				} catch (error) {
					console.log("Error loading message from backend", error)
					return false;
				}
			},
			setSelected: (id) => {
				const selected = [...getStore().selected]
				
				if (selected.some((item_id) => item_id === id)){
					let test;
					test = selected.filter((item) => item !== id)
					setStore({selected: test})
				} else {
					selected.push(id);
					setStore({selected: selected})
				}
				
				console.log(getStore().selected);

			},
			login: async (email, password) => {
				const myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				const raw = JSON.stringify({
					"email": email,
					"password": password
				});

				const requestOptions = {
					method: "POST",
					headers: myHeaders,
					body: raw,
					redirect: "follow"
				};

				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/login", requestOptions);
					const result = await response.json();
					
					if (response.status === 200) {
						setStore({auth: true})
						localStorage.setItem("token", result.access_token)
						console.log(result.access_token);
						return true;
					}
				} catch (error) {
					console.log(false);
					return false;
				};
			},
			getProfile: async () => {
				let token = localStorage.getItem("token")
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/profile", {
						method: "GET",
						headers: {
							"Authorization": `Bearer ${token}`
						},
					});
					if (response.status === 200) {
						const result = await response.json();
						setStore({data: result})
						return true;
					}
				} catch (error) {
					console.error(error);
					return false
				};
			},
			// getMessage: async () => {
			// 	try {
			// 		// fetching data from the backend
			// 		const resp = await fetch(process.env.BACKEND_URL + "api/hello")
			// 		const data = await resp.json()
			// 		setStore({ message: data.message })
			// 		// don't forget to return something, that is how the async resolves
			// 		return data;
			// 	} catch (error) {
			// 		console.log("Error loading message from backend", error)
			// 	}
			// },
			// changeColor: (index, color) => {
			// 	//get the store
			// 	const store = getStore();

			// 	//we have to loop the entire demo array to look for the respective index
			// 	//and change its color
			// 	const demo = store.demo.map((elm, i) => {
			// 		if (i === index) elm.background = color;
			// 		return elm;
			// 	});

			// 	//reset the global store
			// 	setStore({ demo: demo });
			// }
		}
	};
};

export default getState;
