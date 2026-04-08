package com.comerciosa.agenda.repository;

import com.comerciosa.agenda.model.Contato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ContatoRepository extends JpaRepository<Contato, Long> {

    // Lista todos os contatos de um cliente específico
    List<Contato> findByClienteId(Long clienteId);
}