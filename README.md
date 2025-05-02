# Emissor de Certificados - Frontend

Este projeto é o frontend de uma aplicação para emissão e validação de certificados de cursos de extensão, desenvolvido como parte do Projeto Integrador.

## 📌 Tecnologias Utilizadas
- HTML5
- CSS3
- JavaScript Puro
- [Bootstrap 5](https://getbootstrap.com/)

## 🚀 Funcionalidades
- Login de usuários
- CRUD de Alunos
- CRUD de Cursos
- CRUD de Usuários
- Emissão de certificados (Aluno + Curso)
- Validação pública de certificados via código de autenticação

## 🧱 Estrutura de Pastas
```
.
├── index.html
├── dashboard.html
├── alunos.html
├── cursos.html
├── usuarios.html
├── certificados.html
├── validacao.html
├── assets
│   ├── css
│   │   └── style.css
│   └── js
│       ├── api.js
│       ├── auth.js
│       ├── alunos.js
│       ├── cursos.js
│       ├── usuarios.js
│       ├── certificados.js
│       └── validacao.js
```

## 🔐 Autenticação
Utiliza JWT via `Bearer Token`. O token é armazenado no `localStorage` após o login.

### Usuário de Teste (mock)
- **Email:** admin@escola.com
- **Senha:** 123456

## 🔗 API Mock
- Todas as requisições são feitas para:  
`https://6c3f0173-e123-4f5b-873f-b345307e36c4.mock.pstmn.io`

## ▶️ Como Executar
1. Clone ou baixe este repositório como .zip
2. Extraia o conteúdo
3. Abra o `index.html` em seu navegador (não é necessário servidor)

## 📄 Observações
- A API utilizada é um mock criado com Postman e não possui persistência real.
- Todas as páginas são independentes e utilizam JavaScript para interações com a API.

---
Desenvolvido para fins educacionais ✨
