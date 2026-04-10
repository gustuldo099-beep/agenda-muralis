import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import FormCliente from '../pages/FormCliente';

describe('FormCliente', () => {

    // Teste — Renderiza formulário de novo cliente
    it('deve renderizar o formulário de novo cliente', () => {
        render(<FormCliente onVoltar={() => {}} onSalvar={() => {}} />);

        expect(screen.getByText('Novo Cliente')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Nome *')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('CPF *')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Endereço')).toBeInTheDocument();
    });

    // Teste — Renderiza formulário de edição com dados preenchidos
    it('deve renderizar o formulário de edição com dados do cliente', () => {
        const cliente = {
            id: 1,
            nome: 'João da Silva',
            cpf: '111.222.333-44',
            dataNascimento: '1990-05-15',
            endereco: 'Rua das Flores, 123'
        };

        render(<FormCliente cliente={cliente} onVoltar={() => {}} onSalvar={() => {}} />);

        expect(screen.getByText('Editar Cliente')).toBeInTheDocument();
        expect(screen.getByDisplayValue('João da Silva')).toBeInTheDocument();
        expect(screen.getByDisplayValue('111.222.333-44')).toBeInTheDocument();
    });

    // Teste RN01 — Exibe erro se Nome estiver vazio
    it('deve exibir erro se Nome estiver vazio', async () => {
        render(<FormCliente onVoltar={() => {}} onSalvar={() => {}} />);

        const campoCpf = screen.getByPlaceholderText('CPF *');
        fireEvent.change(campoCpf, { target: { value: '111.222.333-44' } });

        const botaoSalvar = screen.getByText('Salvar');
        fireEvent.click(botaoSalvar);

        await waitFor(() => {
            expect(screen.getByText('Nome e CPF são obrigatórios!')).toBeInTheDocument();
        });
    });

    // Teste RN01 — Exibe erro se CPF estiver vazio
    it('deve exibir erro se CPF estiver vazio', async () => {
        render(<FormCliente onVoltar={() => {}} onSalvar={() => {}} />);

        const campoNome = screen.getByPlaceholderText('Nome *');
        fireEvent.change(campoNome, { target: { value: 'João da Silva' } });

        const botaoSalvar = screen.getByText('Salvar');
        fireEvent.click(botaoSalvar);

        await waitFor(() => {
            expect(screen.getByText('Nome e CPF são obrigatórios!')).toBeInTheDocument();
        });
    });

    // Teste — Botão Voltar chama a função onVoltar
    it('deve chamar onVoltar ao clicar no botão Voltar', () => {
        const onVoltar = vi.fn();
        render(<FormCliente onVoltar={onVoltar} onSalvar={() => {}} />);

        const botaoVoltar = screen.getByText('Voltar');
        fireEvent.click(botaoVoltar);

        expect(onVoltar).toHaveBeenCalledTimes(1);
    });
});