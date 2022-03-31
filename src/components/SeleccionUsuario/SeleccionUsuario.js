const SeleccionUsuario = (props) => {
    // const {usuarios, seleccionarUsuario, history} = props;
    const {usuarios, seleccionarUsuario} = props;
    /*const redireccionAListaTodos = event => {
        seleccionarUsuario(event);
        history.push('/todos');
    }*/

    return (
        // <form onSubmit={redireccionAListaTodos}>
        <form onSubmit={seleccionarUsuario}>
            <label htmlFor="nombreUsuario">Por favor seleccionar usuario: </label>
            <select name="nombreUsuario" id="nombreUsuario">
                {
                    usuarios.map((usuario, index) => <option value={usuario.nombreUsuario} key={'usuario_' + index}>
                        {usuario.nombre} {usuario.apellido}
                    </option>)
                }
            </select>
            <button type="submit">Seleccionar</button>
        </form>
    );
}

export default SeleccionUsuario;
