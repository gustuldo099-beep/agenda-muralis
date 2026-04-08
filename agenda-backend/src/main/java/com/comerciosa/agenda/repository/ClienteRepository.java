package com.comerciosa.agenda.repository;

import com.comerciosa.agenda.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    // Busca por nome (contém o texto, ignora maiúsculas/minúsculas)
    List<Cliente> findByNomeContainingIgnoreCase(String nome);

    // Busca por CPF exato
    Optional<Cliente> findByCpf(String cpf);

    // Verifica se já existe um CPF cadastrado
    boolean existsByCpf(String cpf);
}