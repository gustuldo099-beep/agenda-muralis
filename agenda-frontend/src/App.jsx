import { useState } from 'react';
import ListaClientes from './pages/ListaClientes';
import FormCliente from './pages/FormCliente';
import ListaContatos from './pages/ListaContatos';

function App() {
    const [pagina, setPagina] = useState('lista');
    const [clienteSelecionado, setClienteSelecionado] = useState(null);

    const irParaLista = () => {
        setClienteSelecionado(null);
        setPagina('lista');
    };

    const irParaForm = (cliente = null) => {
        setClienteSelecionado(cliente);
        setPagina('form');
    };

    const irParaContatos = (cliente) => {
        setClienteSelecionado(cliente);
        setPagina('contatos');
    };

    return (
        <div>
            {pagina === 'lista' && (
                <ListaClientes
                    onNovo={() => irParaForm()}
                    onEditar={(c) => irParaForm(c)}
                    onContatos={(c) => irParaContatos(c)}
                />
            )}
            {pagina === 'form' && (
                <FormCliente
                    cliente={clienteSelecionado}
                    onVoltar={irParaLista}
                    onSalvar={irParaLista}
                />
            )}
            {pagina === 'contatos' && (
                <ListaContatos
                    cliente={clienteSelecionado}
                    onVoltar={irParaLista}
                />
            )}
        </div>
    );
}

export default App;