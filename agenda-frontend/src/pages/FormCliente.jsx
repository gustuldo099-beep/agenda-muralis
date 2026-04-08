import { useState, useEffect } from 'react';
import api from '../services/api';

function FormCliente({ cliente, onVoltar, onSalvar }) {
    const [form, setForm] = useState({
        nome: '',
        cpf: '',
        dataNascimento: '',
        endereco: ''
    });
    const [erro, setErro] = useState('');

    useEffect(() => {
        if (cliente) {
            setForm({
                nome: cliente.nome || '',
                cpf: cliente.cpf || '',
                dataNascimento: cliente.dataNascimento || '',
                endereco: cliente.endereco || ''
            });
        }
    }, [cliente]);

    const salvar = async () => {
        if (!form.nome || !form.cpf) {
            setErro('Nome e CPF são obrigatórios!');
            return;
        }
        try {
            if (cliente) {
                await api.put(`/clientes/${cliente.id}`, form);
            } else {
                await api.post('/clientes', form);
            }
            onSalvar();
        } catch (e) {
            setErro(e.response?.data || 'Erro ao salvar cliente');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
            <h1>{cliente ? 'Editar Cliente' : 'Novo Cliente'}</h1>

            {erro && <p style={{ color: 'red' }}>{erro}</p>}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input
                    placeholder="Nome *"
                    value={form.nome}
                    onChange={(e) => setForm({ ...form, nome: e.target.value })}
                    style={{ padding: '8px' }}
                />
                <input
                    placeholder="CPF *"
                    value={form.cpf}
                    onChange={(e) => setForm({ ...form, cpf: e.target.value })}
                    style={{ padding: '8px' }}
                />
                <input
                    type="date"
                    value={form.dataNascimento}
                    onChange={(e) => setForm({ ...form, dataNascimento: e.target.value })}
                    style={{ padding: '8px' }}
                />
                <input
                    placeholder="Endereço"
                    value={form.endereco}
                    onChange={(e) => setForm({ ...form, endereco: e.target.value })}
                    style={{ padding: '8px' }}
                />

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={onVoltar}>Voltar</button>
                    <button onClick={salvar} style={{ backgroundColor: '#4CAF50', color: 'white' }}>
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FormCliente;