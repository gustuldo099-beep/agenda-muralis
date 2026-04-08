import { useEffect, useState } from 'react';
import api from '../services/api';

function ListaContatos({ cliente, onVoltar }) {
    const [contatos, setContatos] = useState([]);
    const [form, setForm] = useState({ tipo: 'Telefone', valor: '', observacao: '' });
    const [editando, setEditando] = useState(null);
    const [erro, setErro] = useState('');

    const carregarContatos = async () => {
        const res = await api.get(`/clientes/${cliente.id}/contatos`);
        setContatos(res.data);
    };

    useEffect(() => {
        carregarContatos();
    }, []);

    const salvar = async () => {
        if (!form.valor) {
            setErro('Valor do contato é obrigatório!');
            return;
        }
        try {
            if (editando) {
                await api.put(`/clientes/${cliente.id}/contatos/${editando}`, form);
            } else {
                await api.post(`/clientes/${cliente.id}/contatos`, form);
            }
            setForm({ tipo: 'Telefone', valor: '', observacao: '' });
            setEditando(null);
            setErro('');
            carregarContatos();
        } catch (e) {
            setErro(e.response?.data || 'Erro ao salvar contato');
        }
    };

    const excluir = async (id) => {
        if (window.confirm('Deseja excluir este contato?')) {
            await api.delete(`/clientes/${cliente.id}/contatos/${id}`);
            carregarContatos();
        }
    };

    const editar = (c) => {
        setForm({ tipo: c.tipo, valor: c.valor, observacao: c.observacao || '' });
        setEditando(c.id);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '700px', margin: '0 auto' }}>
            <button onClick={onVoltar}>← Voltar</button>
            <h1>Contatos de {cliente.nome}</h1>

            {erro && <p style={{ color: 'red' }}>{erro}</p>}

            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <select
                    value={form.tipo}
                    onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                    style={{ padding: '8px' }}
                >
                    <option>Telefone</option>
                    <option>E-mail</option>
                </select>
                <input
                    placeholder="Valor *"
                    value={form.valor}
                    onChange={(e) => setForm({ ...form, valor: e.target.value })}
                    style={{ padding: '8px', flex: 1 }}
                />
                <input
                    placeholder="Observação"
                    value={form.observacao}
                    onChange={(e) => setForm({ ...form, observacao: e.target.value })}
                    style={{ padding: '8px', flex: 1 }}
                />
                <button onClick={salvar} style={{ backgroundColor: '#4CAF50', color: 'white' }}>
                    {editando ? 'Atualizar' : 'Adicionar'}
                </button>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Tipo</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Valor</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Observação</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {contatos.map((c) => (
                        <tr key={c.id}>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{c.tipo}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{c.valor}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{c.observacao}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                <button onClick={() => editar(c)}>Editar</button>
                                <button onClick={() => excluir(c.id)} style={{ color: 'red', marginLeft: '5px' }}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListaContatos;