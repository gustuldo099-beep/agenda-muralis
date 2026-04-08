package com.comerciosa.agenda.service;

import com.comerciosa.agenda.model.Cliente;
import com.comerciosa.agenda.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    // RF04 - Listar todos os clientes
    public List<Cliente> listarTodos() {
        return clienteRepository.findAll();
    }

    // RF05 - Buscar por nome ou CPF
    public List<Cliente> buscarPorNome(String nome) {
        return clienteRepository.findByNomeContainingIgnoreCase(nome);
    }

    public Optional<Cliente> buscarPorCpf(String cpf) {
        return clienteRepository.findByCpf(cpf);
    }

    public Optional<Cliente> buscarPorId(Long id) {
        return clienteRepository.findById(id);
    }

    // RF01 - Cadastrar cliente (RN03: CPF único)
    public Cliente cadastrar(Cliente cliente) {
        if (clienteRepository.existsByCpf(cliente.getCpf())) {
            throw new RuntimeException("CPF já cadastrado no sistema");
        }
        return clienteRepository.save(cliente);
    }

    // RF02 - Editar cliente
    public Cliente editar(Long id, Cliente dadosNovos) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        // Verifica se o CPF novo já pertence a outro cliente
        if (!cliente.getCpf().equals(dadosNovos.getCpf()) &&
             clienteRepository.existsByCpf(dadosNovos.getCpf())) {
            throw new RuntimeException("CPF já cadastrado no sistema");
        }

        cliente.setNome(dadosNovos.getNome());
        cliente.setCpf(dadosNovos.getCpf());
        cliente.setDataNascimento(dadosNovos.getDataNascimento());
        cliente.setEndereco(dadosNovos.getEndereco());

        return clienteRepository.save(cliente);
    }

    // RF03 - Excluir cliente (RN07: contatos removidos automaticamente pelo cascade)
    public void excluir(Long id) {
        if (!clienteRepository.existsById(id)) {
            throw new RuntimeException("Cliente não encontrado");
        }
        clienteRepository.deleteById(id);
    }
}