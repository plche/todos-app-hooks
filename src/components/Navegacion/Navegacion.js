import {Link} from "react-router-dom";

const Navegacion = props => {
    const {nombreUsuario} = props;

    return (
        <>
            <h1>Bienvenido de vuelta {nombreUsuario}</h1>
            <ul className="navigation">
                <li className="option"><Link to="/">Dashboard</Link></li>
                <li className="option"><Link to="/todo/nuevo">Agregar ToDo</Link></li>
                <li className="option"><Link to="/todos">Lista de ToDo(s)</Link></li>
            </ul>
        </>
    );
}

export default Navegacion;