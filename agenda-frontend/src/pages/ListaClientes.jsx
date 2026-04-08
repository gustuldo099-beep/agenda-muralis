import { useEffect, useState } from 'react';
import api from '../services/api';

function ListaClientes({ onNovo, onEditar, onContatos }) {
    const [clientes, setClientes] = useState([]);
    const [busca, setBusca] = useState('');
    const [erro, setErro] = useState('');

    const carregarClientes = async () => {
        try {
            const res = await api.get('/clientes');
            setClientes(res.data);
            setErro('');
        } catch {
            setErro('Erro ao carregar clientes.');
        }
    };

    useEffect(() => {
        carregarClientes();
    }, []);

    const buscarClientes = async () => {
        if (busca.trim() === '') {
            carregarClientes();
            return;
        }

        try {
            // Tenta buscar por nome primeiro
            const res = await api.get(`/clientes/buscar?nome=${busca}`);
            if (res.data.length > 0) {
                setClientes(res.data);
                setErro('');
                return;
            }
        } catch {
            // ignora erro da busca por nome
        }

        try {
            // Se não achou por nome, tenta por CPF
            const res = await api.get(`/clientes/cpf/${busca}`);
            setClientes([res.data]);
            setErro('');
        } catch {
            setClientes([]);
            setErro('Nenhum cliente encontrado.');
        }
    };

    const excluirCliente = async (id) => {
        if (window.confirm('Deseja excluir este cliente e todos os seus contatos?')) {
            try {
                await api.delete(`/clientes/${id}`);
                carregarClientes();
            } catch {
                setErro('Erro ao excluir cliente.');
            }
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
            <h1>Agenda de Clientes</h1>

            {erro && <p style={{ color: 'red' }}>{erro}</p>}

            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Buscar por nome ou CPF..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    style={{ flex: 1, padding: '8px' }}
                />
                <button onClick={buscarClientes}>Buscar</button>
                <button onClick={() => { setBusca(''); carregarClientes(); }}>Limpar</button>
                <button onClick={onNovo} style={{ backgroundColor: '#4CAF50', color: 'white' }}>
                    + Novo Cliente
                </button>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th style={{ padding: '10px', border: '1px solid #ddd', color: '#000' }}>Nome</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd', color: '#000' }}>CPF</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd', color: '#000' }}>Endereço</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd', color: '#000' }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.length === 0 ? (
                        <tr>
                            <td colSpan="4" style={{ padding: '20px', textAlign: 'center', border: '1px solid #ddd' }}>
                                Nenhum cliente cadastrado
                            </td>
                        </tr>
                    ) : (
                        clientes.map((c) => (
                            <tr key={c.id}>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{c.nome}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{c.cpf}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{c.endereco}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                    <button onClick={() => onContatos(c)}>Contatos</button>
                                    <button onClick={() => onEditar(c)} style={{ margin: '0 5px' }}>Editar</button>
                                    <button onClick={() => excluirCliente(c.id)} style={{ color: 'red' }}>Excluir</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ListaClientes;