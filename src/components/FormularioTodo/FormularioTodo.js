import Navegacion from "../Navegacion/Navegacion";

const FormularioTodo = props => {
    const {addNewTodo, newTodo, updateKeyNewTodo, nombreUsuario} = props;

    return(
        <>
            <Navegacion nombreUsuario={nombreUsuario} />
            <form onSubmit={addNewTodo}>
                <div>
                    <label htmlFor="nombreTodo">Nombre todo: </label>
                    <input type="text" id="nombreTodo"
                           value={newTodo.nombre}
                           onChange={event => updateKeyNewTodo('nombre', event.target.value)}/>
                </div>
                <div>
                    <label htmlFor="statusTodo">Status todo: </label>
                    <select id="statusTodo"
                            onChange={event => updateKeyNewTodo('status', event.target.value)}>
                        <option value="Completado">Completado</option>
                        <option value="En progreso">En progreso</option>
                        <option value="Cancelado">Cancelado</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="idTodo">Id todo: </label>
                    <input type="number" id="idTodo"
                           value={newTodo.id}
                           onChange={event => updateKeyNewTodo('id', Number(event.target.value))} />
                </div>
                <button type="submit">Agregar</button>
            </form>
        </>
    );
}

export default FormularioTodo;