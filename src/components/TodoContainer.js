import TodoItem from "./TodoItem";
import { Bars } from "react-loader-spinner";

function TodoContainer({todos,loading }) {
	/***************************************** Loadiing ******************************************/
	return (
		<div className="todo-container">
			{loading ? (
				todos.map((task, index) => {
					return <TodoItem task={task} key={index} />;
				})
			) : (
				<Bars height="80" width="80" color="#4fa94d" ariaLabel="bars-loading" visible={true} />
			)}
		</div>
	);
}

export default TodoContainer;
