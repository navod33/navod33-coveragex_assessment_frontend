
import TodoItem from "./TodoItem";

const TodoList = ({ todos }) => {
    return (
      <div>
        {todos.map((todo, index) => (
          <TodoItem key={index} todo={todo} />
        ))}
      </div>
    );
  };

  export default TodoList