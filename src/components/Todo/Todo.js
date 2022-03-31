import './Todo.css';
import {Link} from "react-router-dom";
function Todo(props) {
    const {todo, updateTodo, eliminarTodo} = props;
    return(
        <div className="tarjeta_todo">
            <h3 className="titulo_todo">Pendiente: {todo.nombre}</h3>
            <p className="status_todo">Status: {todo.status}</p>
            <div>
                {(todo.status !== 'Completado') ?
                    (<button onClick={() => updateTodo(todo.id, 'Completado')}>Completar</button>) : ""}
                {(todo.status !== 'En progreso') ?
                    (<button onClick={() => updateTodo(todo.id, 'En progreso')}>En progreso</button>) : ""}
                {(todo.status !== 'Cancelado') ?
                    (<button onClick={() => updateTodo(todo.id, 'Cancelado')}>Cancelar</button>) : ""}
            </div>
            <Link to={"/todo/" + todo.id}>Ver detalle</Link>
            <button onClick={() => eliminarTodo(todo.id)}>Eliminar ToDo</button>
        </div>
    );
}
export default Todo;