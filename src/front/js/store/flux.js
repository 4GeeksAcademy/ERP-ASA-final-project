import { decodeJWT } from "../utils/auth";
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: "hola",
			employeesList: [],
			employeesListFilter: [],
			selected: [],
			auth: false,
			personalData: {},
			workerData: {},
			departments: [],
            salaries: [],
            roles: [],
			offers: [],

		},
		actions: {
			getEmployeesList: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/employees")
					const data = await resp.json()

					setStore({ employeesList: data.results })
					setStore({ employeesListFilter: data.results })
					console.log(data.results);
					
					return true;
				} catch (error) {
					console.log("Error loading message from backend", error)
					return false;
				}
			},
			deleteWorker: async (ids) => {
				try {
					const resp = await Promise.all(ids.map(async (id)=>{
						const resp = fetch(process.env.BACKEND_URL + "api/employees/" + id, {method: "DELETE"})
						return resp
					}))

					resp.map(async (response)=>{
						const dato = await response.json()
						setStore({ employeesList: dato.results })
						return true
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
					let deleteId = selected.filter((item) => item !== id)
					setStore({selected: deleteId})
				} else {
					selected.push(id);
					setStore({selected: selected})
				}
				return true
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
						localStorage.setItem("token", result.access_token);
			
						// Decodificar el token para obtener información del usuario
						const decoded = decodeJWT(result.access_token);
			
						if (decoded) {
							setStore({
								auth: true,
								user: {
									name: decoded.name,
									email: decoded.email,
									department: decoded.department || "No asignado"
								}
							});
						} else {
							console.error("No se pudo decodificar el token");
						}
			
						return true;
					}
				} catch (error) {
					console.error("Error en login:", error);
					return false;
				}
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
			getWorkerData: (id) => {
				const result = getStore().employeesList.filter((worker)=>worker.id == id)[0]
				setStore({workerData: result})
				return true
			},
			resetWorkerData: () => {
				setStore({workerData: {}})
				return true
			},
			addWorker: async (name, last_name, dni, address, email, password, birthdate, department_id, salary_id, role_id) => {
				let token = localStorage.getItem("token")
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/worker", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${token}`
						},
						body: JSON.stringify({
							"name": name,
							"last_name": last_name,
							"dni": dni,
							"address": address,
							"email": email,
							"password": password,
							"birthdate": birthdate,
							"department_id": parseInt(department_id),
							"salary_id":parseInt(salary_id),
							"role_id": parseInt(role_id)
						})
					});
					if (response.ok) {
						const result = await response.json();
						console.log(result);
						return true;
					} else {
						console.error("API error:", response.status);
						return false;
					}
				} catch (error) {
					console.error(error);
					return false
				};
			},
			editWorker: async (id, name, last_name, dni, address, email, password, birthdate, department_id, salary_id, role_id) => {
				let token = localStorage.getItem("token")
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/worker", {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${token}`
						},
						body: JSON.stringify({
							"id": id,
							"name": name,
							"last_name": last_name,
							"dni": dni,
							"address": address,
							"email": email,
							"password": password,
							"birthdate": birthdate,
							"department_id": parseInt(department_id),
							"salary_id":parseInt(salary_id),
							"role_id": parseInt(role_id)
						})
					});
					if (response.ok) {
						const result = await response.json();
						console.log(result);
						return true;
					} else {
						console.error("API error:", response.status);
						return false;
					}
				} catch (error) {
					console.error(error);
					return false
				};
			},
			editWorker: async (id, name, last_name, dni, address, email, password, birthdate, department_id, salary_id, role_id) => {
				let token = localStorage.getItem("token")
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/worker", {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${token}`
						},
						body: JSON.stringify({
							"id": id,
							"name": name,
							"last_name": last_name,
							"dni": dni,
							"address": address,
							"email": email,
							"password": password,
							"birthdate": birthdate,
							"department_id": parseInt(department_id),
							"salary_id":parseInt(salary_id),
							"role_id": parseInt(role_id)
						})
					});
					if (response.ok) {
						const result = await response.json();
						return true;
					} else {
						console.error("API error:", response.status);
						return false;
					}
				} catch (error) {
					console.error("error");
					console.error(error);
					return false
				};
			},addOffer: async (title, description, requirements) => {
				let token = localStorage.getItem("token")
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/offer",{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${token}`
						},
						body: JSON.stringify({
							"title": title,
							"description": description,
							"requirements": requirements
						})
					});
					if (response.ok) {
						const result = await response.json();
						setStore({
							offers: [...getStore().offers, result.offer]
						});
						return true;
					} else {
						console.error("API error:", response.status);
						return false;
					}
				} catch (error) {
					console.error("error");
					console.error(error);
					return false
				};
			},addOffer: async (title, description, requirements) => {
				let token = localStorage.getItem("token")
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/offer",{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${token}`
						},
						body: JSON.stringify({
							"title": title,
							"description": description,
							"requirements": requirements
						})
					});
					if (response.ok) {
						const result = await response.json();
						setStore({
							offers: [...getStore().offers, result.offer]
						});
						return true;
					} else {
						console.error("API error:", response.status);
						return false;
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
				setStore({auth: false})
				localStorage.removeItem("token")
			},
			fetchData: async () => {
                try {
                    const deptResponse = await fetch(process.env.BACKEND_URL + "/api/departments");
                    const salaryResponse = await fetch(process.env.BACKEND_URL + "/api/salaries");
                    const roleResponse = await fetch(process.env.BACKEND_URL + "/api/roles");

                    const deptData = await deptResponse.json();
                    const salaryData = await salaryResponse.json();
                    const roleData = await roleResponse.json();

                    setStore({
                        departments: deptData,
                        salaries: salaryData,
                        roles: roleData
                    });
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            },
			filterList: (text) => {
                const result = getStore().employeesListFilter.filter((worker) => worker.name.toLowerCase() == text.toLowerCase())
				result.length > 0 ? setStore({employeesListFilter: result}) : setStore({employeesListFilter: getStore().employeesList})
            }
		}
	};
};

export default getState;