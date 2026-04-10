package com.comerciosa.agenda;

import com.comerciosa.agenda.model.Cliente;
import com.comerciosa.agenda.repository.ClienteRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.time.LocalDate;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class ClienteIntegrationTest {

    @Autowired
    private WebApplicationContext context;

    @Autowired
    private ClienteRepository clienteRepository;

    private MockMvc mockMvc;
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
        clienteRepository.deleteAll();
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
    }

    @Test
    void deveCadastrarClienteComSucesso() throws Exception {
        Cliente cliente = new Cliente();
        cliente.setNome("João da Silva");
        cliente.setCpf("111.222.333-44");
        cliente.setDataNascimento(LocalDate.of(1990, 5, 15));
        cliente.setEndereco("Rua das Flores, 123");

        mockMvc.perform(post("/api/clientes")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(cliente)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome").value("João da Silva"))
                .andExpect(jsonPath("$.cpf").value("111.222.333-44"))
                .andExpect(jsonPath("$.id").exists());
    }

    @Test
    void deveRejeitarCpfDuplicado() throws Exception {
        Cliente cliente1 = new Cliente();
        cliente1.setNome("João da Silva");
        cliente1.setCpf("111.222.333-44");
        cliente1.setDataNascimento(LocalDate.of(1990, 5, 15));
        clienteRepository.save(cliente1);

        Cliente cliente2 = new Cliente();
        cliente2.setNome("Maria Souza");
        cliente2.setCpf("111.222.333-44");
        cliente2.setDataNascimento(LocalDate.of(1985, 8, 22));

        mockMvc.perform(post("/api/clientes")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(cliente2)))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("CPF já cadastrado no sistema"));
    }

    @Test
    void deveListarTodosOsClientes() throws Exception {
        Cliente cliente = new Cliente();
        cliente.setNome("João da Silva");
        cliente.setCpf("111.222.333-44");
        cliente.setDataNascimento(LocalDate.of(1990, 5, 15));
        clienteRepository.save(cliente);

        mockMvc.perform(get("/api/clientes"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].nome").value("João da Silva"));
    }

    @Test
    void deveBuscarClientePorNome() throws Exception {
        Cliente cliente = new Cliente();
        cliente.setNome("Maria Souza");
        cliente.setCpf("999.888.777-66");
        cliente.setDataNascimento(LocalDate.of(1985, 8, 22));
        clienteRepository.save(cliente);

        mockMvc.perform(get("/api/clientes/buscar?nome=Maria"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].nome").value("Maria Souza"));
    }

    @Test
    void deveEditarClienteComSucesso() throws Exception {
        Cliente cliente = new Cliente();
        cliente.setNome("João da Silva");
        cliente.setCpf("111.222.333-44");
        cliente.setDataNascimento(LocalDate.of(1990, 5, 15));
        Cliente salvo = clienteRepository.save(cliente);

        salvo.setNome("João Silva Atualizado");
        salvo.setEndereco("Rua Nova, 456");

        mockMvc.perform(put("/api/clientes/" + salvo.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(salvo)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome").value("João Silva Atualizado"));
    }

    @Test
    void deveExcluirClienteComSucesso() throws Exception {
        Cliente cliente = new Cliente();
        cliente.setNome("João da Silva");
        cliente.setCpf("111.222.333-44");
        cliente.setDataNascimento(LocalDate.of(1990, 5, 15));
        Cliente salvo = clienteRepository.save(cliente);

        mockMvc.perform(delete("/api/clientes/" + salvo.getId()))
                .andExpect(status().isOk())
                .andExpect(content().string("Cliente excluído com sucesso"));
    }

    @Test
    void deveRejeitarClienteSemNome() throws Exception {
        Cliente cliente = new Cliente();
        cliente.setCpf("111.222.333-44");
        cliente.setDataNascimento(LocalDate.of(1990, 5, 15));

        mockMvc.perform(post("/api/clientes")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(cliente)))
                .andExpect(status().isBadRequest());
    }
}