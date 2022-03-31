import './App.css';
import {useEffect, useState} from "react";
import FormularioTodo from "./components/FormularioTodo/FormularioTodo";
import ListaTodos from "./components/ListaTodos/ListaTodos";
import {Route, Switch, withRouter} from "react-router-dom";
import DetalleTodo from "./components/DetalleTodo/DetalleTodo";
import axios from "axios";
import SeleccionUsuario from "./components/SeleccionUsuario/SeleccionUsuario";

function App(props) {
    const {history} = props;
    const todoNewInicial = {
        nombre: '',
        status: 'Completado',
        id: 0,
    };
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState(todoNewInicial);

    const updateTodo = (idTodo, statusNuevo) => {
        const dataUpdate = {id: idTodo, status: statusNuevo}
        axios.put('http://localhost:8080/api/todo/actualizar', dataUpdate)
            .then(response => {
                let todosActualizados = [...todos];
                for(let i = 0; i < todosActualizados.length; i ++ ) {
                    if(todosActualizados[i].id === idTodo) {
                        todosActualizados[i].status = statusNuevo;
                    }
                }
                setTodos(todosPrev => todosActualizados);
            })
            .catch();
    }

    const addNewTodo = event => {
        event.preventDefault();
        const adjustNewTodo = {...newTodo, nombreUsuario}
        axios.post('http://localhost:8080/api/todo/nuevo', adjustNewTodo)
            .then(response => setTodos(todosPrev => [...todosPrev, response.data]))
            .catch();
        setNewTodo(newTodoPrev => todoNewInicial)
    }

    const updateKeyNewTodo = (key, value) => {
        setNewTodo({
            ...newTodo,
            [key]: value
        });
    }

    const seleccionarUsuario = event => {
        event.preventDefault();
        setNombreUsuario(nombreUsuarioPrev => event.target.nombreUsuario.value);
        history.push('/todos');
    }
    
    const eliminarTodo = id => {
        axios.delete(`http://localhost:8080/api/todo/eliminar/${id}`)
            .then(response => {
                const todosActualizados = [...todos];
                const indice = todos.findIndex(todo => todo.id === Number(id));
                todosActualizados.splice(indice, 1);
                setTodos(todosPrev => todosActualizados);
            })
            .catch();
    }

    useEffect(() => {
        if (nombreUsuario !== '') {
            axios.get(`http://localhost:8080/api/usuario/getById/${nombreUsuario}`)
                .then(response => setTodos(todosPrev => response.data.todos))
                .catch();
        }
    });

    useEffect(() => {
        axios.get('http://localhost:8080/api/usuario/getAll')
            .then(response => {
                const listaUsuarios = response.data.map(usuario => {
                    return {nombre: usuario.nombre, apellido: usuario.apellido, nombreUsuario: usuario.nombreUsuario}
                });
                setUsuarios(usuariosPrev => listaUsuarios);
            })
            .catch();
    }, []);

    return (
        <div>
            <Switch>
                <Route exact path="/" render={routeProps => <SeleccionUsuario usuarios={usuarios}
                                                                        seleccionarUsuario={seleccionarUsuario}
                                                                        {...routeProps} />} />
                <Route path="/todo/nuevo"
                       render={routeProps => <FormularioTodo addNewTodo={addNewTodo} newTodo={newTodo}
                                                             updateKeyNewTodo={updateKeyNewTodo}
                                                             nombreUsuario={nombreUsuario}
                                                             {...routeProps} />} />
                <Route path="/todos" render={routeProps => <ListaTodos todos={todos} updateTodo={updateTodo}
                                                                       nombreUsuario={nombreUsuario}
                                                                       eliminarTodo={eliminarTodo}
                                                                       {...routeProps} />} />
                <Route path="/todo/:id" render={routeProps => <DetalleTodo todos={todos} {...routeProps}
                                                                           eliminarTodo={eliminarTodo}
                                                                           nombreUsuario={nombreUsuario} />} />
            </Switch>
        </div>
    );
}

export default withRouter(App);
