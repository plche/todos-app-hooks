import Todo from "../Todo/Todo";
import Navegacion from "../Navegacion/Navegacion";

const DetalleTodo = props => {
    const {todos, match, nombreUsuario} = props;
    const todoSeleccionado = todos.find(todo => todo.id === Number(match.params.id));

    return(
        <div>
            <Navegacion nombreUsuario={nombreUsuario} />
            {
                todoSeleccionado ? <Todo todo={todoSeleccionado} /> : <div>Todo no encontrado</div>
            }
        </div>
    );
}

export default DetalleTodo;
