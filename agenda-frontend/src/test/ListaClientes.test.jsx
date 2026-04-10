import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ListaClientes from '../pages/ListaClientes';
import api from '../services/api';

vi.mock('../services/api');

describe('ListaClientes', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    // Teste RF04 — Lista clientes ao carregar
    it('deve listar os clientes ao carregar a página', async () => {
        api.get.mockResolvedValue({
            data: [
                { id: 1, nome: 'João da Silva', cpf: '111.222.333-44', endereco: 'Rua A' },
                { id: 2, nome: 'Maria Souza', cpf: '999.888.777-66', endereco: 'Rua B' }
            ]
        });

        render(<ListaClientes onNovo={() => {}} onEditar={() => {}} onContatos={() => {}} />);

        await waitFor(() => {
            expect(screen.getByText('João da Silva')).toBeInTheDocument();
            expect(screen.getByText('Maria Souza')).toBeInTheDocument();
        });
    });

    // Teste — Exibe mensagem quando não há clientes
    it('deve exibir mensagem quando não há clientes', async () => {
        api.get.mockResolvedValue({ data: [] });

        render(<ListaClientes onNovo={() => {}} onEditar={() => {}} onContatos={() => {}} />);

        await waitFor(() => {
            expect(screen.getByText('Nenhum cliente cadastrado')).toBeInTheDocument();
        });
    });

    // Teste — Botão Novo Cliente chama onNovo
    it('deve chamar onNovo ao clicar em Novo Cliente', async () => {
        api.get.mockResolvedValue({ data: [] });
        const onNovo = vi.fn();

        render(<ListaClientes onNovo={onNovo} onEditar={() => {}} onContatos={() => {}} />);

        const botao = screen.getByText('+ Novo Cliente');
        fireEvent.click(botao);

        expect(onNovo).toHaveBeenCalledTimes(1);
    });

    // Teste RF03 — Excluir cliente
    it('deve excluir cliente ao confirmar', async () => {
        api.get.mockResolvedValue({
            data: [{ id: 1, nome: 'João da Silva', cpf: '111.222.333-44', endereco: 'Rua A' }]
        });
        api.delete.mockResolvedValue({});

        vi.spyOn(window, 'confirm').mockReturnValue(true);

        render(<ListaClientes onNovo={() => {}} onEditar={() => {}} onContatos={() => {}} />);

        await waitFor(() => {
            expect(screen.getByText('João da Silva')).toBeInTheDocument();
        });

        const botaoExcluir = screen.getByText('Excluir');
        fireEvent.click(botaoExcluir);

        await waitFor(() => {
            expect(api.delete).toHaveBeenCalledWith('/clientes/1');
        });
    });
});