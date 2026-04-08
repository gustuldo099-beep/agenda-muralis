package com.comerciosa.agenda.controller;

import com.comerciosa.agenda.model.Contato;
import com.comerciosa.agenda.service.ContatoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes/{clienteId}/contatos")
public class ContatoController {

    @Autowired
    private ContatoService contatoService;

    // RF09 - Listar contatos de um cliente
    @GetMapping
    public List<Contato> listarPorCliente(@PathVariable Long clienteId) {
        return contatoService.listarPorCliente(clienteId);
    }

    // RF06 - Cadastrar contato
    @PostMapping
    public ResponseEntity<?> cadastrar(@PathVariable Long clienteId,
                                       @Valid @RequestBody Contato contato) {
        try {
            Contato novo = contatoService.cadastrar(clienteId, contato);
            return ResponseEntity.ok(novo);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // RF07 - Editar contato
    @PutMapping("/{id}")
    public ResponseEntity<?> editar(@PathVariable Long clienteId,
                                    @PathVariable Long id,
                                    @Valid @RequestBody Contato contato) {
        try {
            Contato atualizado = contatoService.editar(id, contato);
            return ResponseEntity.ok(atualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // RF08 - Excluir contato
    @DeleteMapping("/{id}")
    public ResponseEntity<?> excluir(@PathVariable Long clienteId,
                                     @PathVariable Long id) {
        try {
            contatoService.excluir(id);
            return ResponseEntity.ok("Contato excluído com sucesso");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}