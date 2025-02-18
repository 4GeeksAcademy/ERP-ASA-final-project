const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: "hola",
			employeesList: [],
			selected: [],
			auth: false,
			personalData: {}

		},
		actions: {
			// Use getActions to call a function within a fuction
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
			deleteWorker: async (ids) => {
				try {
					// fetching data from the backend
					const resp = await Promise.all(ids.map(async (id)=>{
						const resp = fetch(process.env.BACKEND_URL + "api/employees/" + id, {method: "DELETE"})
						return resp
					}))

					const datos = resp.map(async (response)=>{
						const dato = await response.json()
						console.log(dato.results);
						setStore({ employeesList: dato.results })
						return dato.results
					})
					
					setStore({ selected: [] })
					
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
			addWorker: async (name, last_name, dni, address, email, password, birthdate, department_id, salary_id, role_id) => {
				let token = localStorage.getItem("token")
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/worker", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							"name": name,
							"last_name": last_name,
							"dni": dni,
							"address": address,
							"email": email,
							"password": password,
							"birthdate": birthdate,
							"department_id": department_id,
							"salary_id": salary_id,
							"role_id": role_id
						})
					});
					if (response.status === 200) {
						const result = await response.json();
						return true;
					}
				} catch (error) {
					console.error("error");
					console.error(error);
					return false
				};
			},
			changeAuth: () => {
				setStore({auth: !getStore().auth})
			},
			resetSelected: () => {
				setStore({selected: []})
			},
			logout:()=>{
				//borrar el token del localStorage
				setStore({auth: false})
				localStorage.removeItem("token")
			},
		}
	};
};

export default getState;