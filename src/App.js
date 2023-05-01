import { useState, useEffect } from "react";
import "./App.css";
import TodoContainer from "./components/TodoContainer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import sound from "./asset/success.mp3"

function App() {
	const [list, setList] = useState("");
	const [todos, setTodos] = useState([]);
	const [loading, setLoading] = useState(false);
	const toastify =(()=>{
		toast.success(`🦄🦄🦄🦄 Item is added Succcessfully`, {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
			});
	})

	const play = (()=>{
		new Audio(sound).play();
	})

	useEffect(() => {

		const res = async () => {
			const response = await fetch("https://jsonplaceholder.typicode.com/todos")
			let data = await response.json();
			// data = data.slice(0, 10);
			setTodos([...data]);
			setLoading(true);
		}
		res();

	}, []);

/************************************************ Added Item *************************************************************/
	const addTodo = async () => {
		setLoading(false)
		if(list === ""){
			toast("input is empty");
			setLoading(true)
			return ;
		}
		const response = await fetch("https://jsonplaceholder.typicode.com/todos",
			{
				method: "POST",
				body: JSON.stringify({
					userId: 1,
					id: Date.now(),
					title: list,
					completed: false,
				}),
				headers:
				{
					"Content-type": "application/json; charset=UTF-8",
				},
			
			});
		const PostData = await response.json();
		setTodos([PostData, ...todos]);
		setLoading(true)
		setList("");
		play();
		toastify();
		
	}

	
	return (
		<div className="App">
			<h3>Todo App</h3>
			<div className="todo-bar-container">
				<div className="todo-bar">
					<div style={{ borderRadius: "10px 0 0 10px" }} className="icon-container">
						<i className="fa-solid fa-list"></i>
					</div>
					<input id="new-task" type="text" placeholder="Enter the task" autoComplete="off" onChange={(e) => setList(e.target.value)} value={list} />
					<div style={{ borderRadius: "0 10px 10px 0" }} className="icon-container plus" id="add-btn" onClick={addTodo} value="value">
						<i className="fa-solid fa-plus"></i>
					</div>
				</div>
			</div>
			<TodoContainer loading={loading} todos={todos} />
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
		</div>
	);
}

export default App;
