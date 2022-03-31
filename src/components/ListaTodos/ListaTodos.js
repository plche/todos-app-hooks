import './ListaTodos.css';
import Todo from "../Todo/Todo";
import Navegacion from "../Navegacion/Navegacion";

const ListaTodos = props => {
    const {todos, updateTodo, nombreUsuario, eliminarTodo} = props;

    return(
        <>
            <Navegacion nombreUsuario={nombreUsuario} />
            <h3>Lista de pendientes</h3>
            <div className="lista_todos">
                {
                    todos.map((todo, indice) => <Todo todo={todo} updateTodo={updateTodo}
                                                      eliminarTodo={eliminarTodo} key={'todo_' + indice} />)
                }
            </div>
        </>
    );
}

export default ListaTodos;
