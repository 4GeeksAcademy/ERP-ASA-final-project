const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			employeesList: [],
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			getEmployeesList: async () => {
				setStore({ employeesList: [
					{
					id: 0,
					name: "Alvaro",
					lastName: "Ruiz",
					dni: "99999999T",
					email: "alvaro@gmail.com",
					department: "RRHH",
					role: "manager",
					salary: "99999999",
					},
				]})
				return true
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/employees")
					const data = await resp.json()
					setStore({ employeesList: data.message})
					return true;
				}catch(error){
					console.log("Error loading message from backend", error)
					return false;
				}
			},
			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
