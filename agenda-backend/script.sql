-- ============================================
-- SCRIPT DE CRIAÇÃO DO BANCO DE DADOS
-- Sistema de Gestão de Contatos - Comércio S.A.
-- ============================================

-- Criar o banco de dados
CREATE DATABASE agenda_db;

-- Conectar ao banco
\c agenda_db;

-- ============================================
-- TABELA: cliente
-- ============================================
CREATE TABLE IF NOT EXISTS cliente (
    id               SERIAL PRIMARY KEY,
    nome             VARCHAR(100) NOT NULL,
    cpf              VARCHAR(14)  NOT NULL UNIQUE,
    data_nascimento  DATE         NOT NULL,
    endereco         VARCHAR(255)
);

-- ============================================
-- TABELA: contato
-- ============================================
CREATE TABLE IF NOT EXISTS contato (
    id          SERIAL PRIMARY KEY,
    cliente_id  INTEGER      NOT NULL,
    tipo        VARCHAR(50)  NOT NULL,
    valor       VARCHAR(100) NOT NULL,
    observacao  VARCHAR(255),
    CONSTRAINT fk_cliente
        FOREIGN KEY (cliente_id)
        REFERENCES cliente (id)
        ON DELETE CASCADE
);

-- ============================================
-- DADOS DE EXEMPLO PARA TESTES
-- ============================================
INSERT INTO cliente (nome, cpf, data_nascimento, endereco) VALUES
    ('João da Silva',    '123.456.789-00', '1990-05-15', 'Rua das Flores, 123'),
    ('Maria Souza',      '987.654.321-00', '1985-08-22', 'Av. Brasil, 456'),
    ('Carlos Oliveira',  '456.789.123-00', '1995-03-10', 'Rua das Palmeiras, 789');

INSERT INTO contato (cliente_id, tipo, valor, observacao) VALUES
    (1, 'Telefone', '(11) 99999-1111', 'WhatsApp'),
    (1, 'E-mail',   'joao@email.com',  'E-mail pessoal'),
    (2, 'Telefone', '(11) 88888-2222', 'Comercial'),
    (3, 'E-mail',   'carlos@email.com', NULL);

-- ============================================
-- FIM DO SCRIPT
-- ============================================