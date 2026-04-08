package com.comerciosa.agenda.service;

import com.comerciosa.agenda.model.Cliente;
import com.comerciosa.agenda.model.Contato;
import com.comerciosa.agenda.repository.ClienteRepository;
import com.comerciosa.agenda.repository.ContatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContatoService {

    @Autowired
    private ContatoRepository contatoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    // RF09 - Listar contatos de um cliente
    public List<Contato> listarPorCliente(Long clienteId) {
        return contatoRepository.findByClienteId(clienteId);
    }

    // RF06 - Cadastrar contato para um cliente
    public Contato cadastrar(Long clienteId, Contato contato) {
        Cliente cliente = clienteRepository.findById(clienteId)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        contato.setCliente(cliente);
        return contatoRepository.save(contato);
    }

    // RF07 - Editar contato
    public Contato editar(Long id, Contato dadosNovos) {
        Contato contato = contatoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contato não encontrado"));

        contato.setTipo(dadosNovos.getTipo());
        contato.setValor(dadosNovos.getValor());
        contato.setObservacao(dadosNovos.getObservacao());

        return contatoRepository.save(contato);
    }

    // RF08 - Excluir contato
    public void excluir(Long id) {
        if (!contatoRepository.existsById(id)) {
            throw new RuntimeException("Contato não encontrado");
        }
        contatoRepository.deleteById(id);
    }
}