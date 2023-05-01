import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import sound from "../asset/pika.mp3"

function TodoItem({ task }) {
	const [editClass, setEditClass] = useState("fa-solid fa-pen-to-square");
	const [isCompleted, setIsCompleted] = useState(task.completed);
	const toasti = (() => {
		toast.error(`🦄🦄🦄🦄 Item is deleted Succcessfullly`, {
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

	const textStyle = {
		textDecoration: isCompleted ? "line-through 2px hsl(199deg 31% 14%)" : "none",
	};

	/**********************************Edit Task *******************************************/
	const editTask = (e) => {
		let taskInDOM = e.target.parentElement.parentElement.children[0];
		if (editClass === "fa-solid fa-pen-to-square") {
			// Deleting the task and adding a input field in place of it and giving its value as the task earlier so that it can be edited
			let textToBeEdited = taskInDOM.children[1].innerText;
			const node = document.createElement("input");
			node.setAttribute("type", "text");
			node.setAttribute("value", textToBeEdited);
			taskInDOM.appendChild(node);
			taskInDOM.children[1].remove();
			setEditClass("fa-solid fa-check");
		} else {
			let newTaskAfterEdit = taskInDOM.children[1].value;
			console.log(newTaskAfterEdit);
			const node = document.createElement("div");
			node.setAttribute("style", textStyle);
			node.innerText = newTaskAfterEdit;
			taskInDOM.appendChild(node);
			taskInDOM.children[1].remove();
			setEditClass("fa-solid fa-pen-to-square");
		}
	};

	/******************************* Deleted Task *******************************************/
	const deleteTask = (e) => {
		let taskInDOM = e.target.parentElement.parentElement.children[0];
		play();
		toasti();
		taskInDOM.parentElement.remove();
	};

	/********************************* Completed Task **************************************/
	const completeTask = (e) => {
		if (isCompleted === true) {
			console.log(e.target.parentElement);

			setIsCompleted(false);
		} else {
			alert("Task is completed");
			setIsCompleted(true);
		}
	};

	const completedStyle = {
		color: isCompleted ? "#d51212" : "#2c2c2c",
	};

	return (
		<div className="todo-item">
			<div className="icon-tasks">
				<i className="fa-solid fa-circle-check" onClick={completeTask} style={completedStyle}></i>
				<div className="task-name" style={textStyle}>{task.title}</div>
			</div>
			<div className="icons">
				{isCompleted ? <i className={editClass} onClick={() => alert("Completed Task can't be edited")}></i> : <i className={editClass} onClick={editTask}></i>}
				<i className="fa-solid fa-trash" onClick={deleteTask}></i>
			</div>
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

export default TodoItem;
