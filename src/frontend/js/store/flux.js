import { decodeJWT } from "../utils/auth";
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: "hola",
			employeeList: [],
			employeeListFilter: [],
			selected: [],
			selectedEmployee: {},
			auth: false,
			recoveryPassword: false,
			personalData: {},
			employeeData: {},
			departments: [],
			salaries: [],
			offers: [],

		},
		actions: {
			getEmployeeList: async () => {
				try {
					const token = localStorage.getItem("token");
					const resp = await fetch(process.env.BACKEND_URL + "api/employee/", {
						method: "GET",
						headers: {
							"Authorization": `Bearer ${token}`,
							"Content-Type": "application/json"
						}
					});

					const data = await resp.json();
					setStore({ employeeList: data });
					console.log(getStore().employeeList);
				} catch (error) {
					console.error("Error cargando empleados", error);
				}
			},
			getEmployeeById: async (id) => {
				try {
					const token = localStorage.getItem("token");

					const resp = await fetch(`${process.env.BACKEND_URL}api/employee/${id}`, {
						method: "GET",
						headers: {
							"Authorization": `Bearer ${token}`,
							"Content-Type": "application/json"
						}
					});
					const data = await resp.json();
					if (resp.ok) {
						setStore({ selectedEmployee: data });
					} else {
						console.warn("Empleado no encontrado:", data);
					}
				} catch (error) {
					console.error("Error obteniendo empleado", error);
				}
			},
			deleteWorker: async (ids) => {
				try {
					const resp = await Promise.all(ids.map(async (id) => {
						const resp = fetch(process.env.BACKEND_URL + "/api/employees/" + id, { method: "DELETE" })
						return resp
					}))

					resp.map(async (response) => {
						const dato = await response.json()
						setStore({ employeeList: dato.results })
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

				if (selected.some((item_id) => item_id === id)) {
					let deleteId = selected.filter((item) => item !== id)
					setStore({ selected: deleteId })
				} else {
					selected.push(id);
					setStore({ selected: selected })
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
					const response = await fetch(process.env.BACKEND_URL + "api/auth/login", requestOptions);
					const result = await response.json();

					console.log("Resultado del login:", result);

					if (response.status === 200) {
						localStorage.setItem("token", result.access_token);
						setStore({
							auth: true,
							// user: {
							// 	name: decoded.name,
							// 	email: decoded.email,
							// 	department: decoded.department || "No asignado"
							// },
							personalData: result.employee
						});
						console.log("Token guardado:", result.access_token,);
						return true;
					} else {
						console.warn("Login fallido. Código:", response.status, "Mensaje:", result.msg);
						return false; // 🔸 retorno explícito si no es 200
					}
				} catch (error) {
					console.error("Error en login (flux):", error);
					return false;
				}
			},
			getProfile: async (id) => {
				let token = localStorage.getItem("token")
				try {
					const response = await fetch(process.env.BACKEND_URL + `api/profile/${id}`, {
						method: "GET",
						headers: {
							"Authorization": `Bearer ${token}`
						},
					});
					if (response.status === 200) {
						const result = await response.json();
						// Decodificar el token para obtener información del usuario
						const decoded = decodeJWT(token);
						console.log(decoded);

						if (decoded) {
							setStore({
								auth: true,
								user: {
									name: decoded.name,
									email: decoded.email,
									department: decoded.department || "No asignado"
								},
								personalData: result
							});
						} else {
							console.error("No se pudo decodificar el token");
						}
						return true;
					}
				} catch (error) {
					console.error(error);
					return false
				};
			},
			getEmployeeData: (id) => {
				const result = getStore().employeeList.filter((worker) => worker.id == id)[0]
				setStore({ employeeData: result })
				return true
			},
			resetEmployeeData: () => {
				setStore({ employeeData: {} })
				return true
			},
			addEmployee: async (name, last_name, dni, address, email, birthdate, department_id, salary_id, file) => {
				let token = localStorage.getItem("token");
				try {
					let formData = new FormData();
					formData.append("name", name);
					formData.append("last_name", last_name);
					formData.append("dni", dni);
					formData.append("address", address);
					formData.append("email", email);
					formData.append("birthdate", birthdate);
					formData.append("department_id", parseInt(department_id));
					formData.append("salary_id", parseInt(salary_id));

					if (file != null) {
						formData.append("profile_image_url", file);
					}
					else{
						console.log("ME CAGO EN DIOS NO HAY ARCHIVO EN FLUX")
					}

					const response = await fetch(process.env.BACKEND_URL + "api/employee/", {
						method: "POST",
						headers: {
							"Authorization": `Bearer ${token}`
						},
						body: formData // Enviar datos en formato FormData
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
					return false;
				}
			},
			updateEmployee: async (id, name, last_name, dni, address, email, password, birthdate, department_id, salary_id, file) => {
				let token = localStorage.getItem("token");

				try {
					// Usamos FormData para enviar datos y archivos correctamente
					let formData = new FormData();
					formData.append("id", id);
					formData.append("name", name);
					formData.append("last_name", last_name);
					formData.append("dni", dni);
					formData.append("address", address);
					formData.append("email", email);
					formData.append("password", password);
					formData.append("birthdate", birthdate);
					formData.append("department_id", String(department_id));
					formData.append("salary_id", String(salary_id));

					if (file) {
						formData.append("profile_image_url", file);
					}
												
					const response = await fetch(`${process.env.BACKEND_URL}api/employee/${id}`, {
						method: "PUT",
						headers: {
							"Authorization": `Bearer ${token}` // No agregamos "Content-Type", FormData lo maneja
						},
						body: formData
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
			addOffer: async (title, description, requirements) => {
				let token = localStorage.getItem("token")
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/offer", {
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
				setStore({ auth: !getStore().auth })
			},
			resetSelected: () => {
				setStore({ selected: [] })
			},
			setRecoveryPassword: () => {
				setStore({ recoveryPassword: true })
			},
			resetRecoveryPassword: () => {
				setStore({ recoveryPassword: false })
			},
			logout: () => {
				setStore({ auth: false })
				localStorage.removeItem("token")
			},
			fetchData: async () => {
				try {
					const deptResponse = await fetch(process.env.BACKEND_URL + "api/employee/department");
					const salaryResponse = await fetch(process.env.BACKEND_URL + "api/employee/salary");

					const deptData = await deptResponse.json();
					const salaryData = await salaryResponse.json();

					setStore({
						departments: deptData,
						salaries: salaryData,
					});
				} catch (error) {
					console.error("Error fetching data:", error);
				}
			},
			filterList: (text) => {
				const result = getStore().employeeListFilter.filter((employee) => employee.name.toLowerCase() == text.toLowerCase())
				result.length > 0 ? setStore({ employeeListFilter: result }) : setStore({ employeeListFilter: getStore().employeeList })
			},
			uploadImage: async (file) => {
				const formData = new FormData();
				formData.append("file", file);

				try {
					const token = localStorage.getItem("token");
					const resp = await fetch(process.env.BACKEND_URL + "api/aux/upload_employee_image", {
						method: "POST",
						headers: {
							Authorization: `Bearer ${token}`,
						},
						body: formData
					});

					if (!resp.ok) throw new Error("Error uploading image");

					const data = await resp.json();
					setStore({ profileImageUrl: data.image_url });
				} catch (error) {
					console.error("Upload error:", error);
				}
			},
			sendEmail: async (email) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/reset-password-request", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							// "Authorization": `Bearer ${token}`
						},
						body: JSON.stringify({ email: email, url: process.env.FRONTEND_URL + "" })
					});

					if (response.ok) {
						console.log("Password reset email sent");
						return true;
					} else {
						console.error("Error sending reset email", response.status);
						return false;
					}
				} catch (error) {
					console.error("Error in recoveryPassword:", error);
					return false;
				}
			},
			recoveryPassword: async (token, password) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/reset-password/" + token, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${token}`
						},
						body: JSON.stringify({ password: password })
					});

					if (response.ok) {
						console.log("Password reset correctly");
						return true;
					} else {
						console.error("Error resetting password", response.status);
						return false;
					}
				} catch (error) {
					console.error("Error in recoveryPassword:", error);
					return false;
				}
			},
		}
	};
};

export default getState;