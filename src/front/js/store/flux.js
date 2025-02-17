const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			messageee: "hola",
			employeesList: [],
			selected: [],
			auth: false,
			personalData: {}

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
					const resp = await fetch(process.env.BACKEND_URL + "api/employees/" + id, {method: "DELETE"})
					const data = await resp.json()
					
					setStore({ employeesList: data.results })
					let selectedUpdated = [...getStore().selected]
					setStore({ selected: selectedUpdated.slice(1) })
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
						setStore({personalData: result})
						return true;
					}
				} catch (error) {
					console.error(error);
					return false
				};
			},
			changeAuth: () => {
				setStore({auth: !getStore().auth})
			},
		}
	};
};

export default getState;
