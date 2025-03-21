# Projeto: Simulação de D&D com ChatGPT

## Integrantes:
- [João Victor de Faria](https://www.linkedin.com/in/joaovictordefaria/)
- [Marcos Hiroshi Carvalho](https://www.linkedin.com/in/marcos-hiroshi-033423339/)

## Professores Orientadores:
- [Francisco de Souza Escobar](https://www.linkedin.com/in/francisco-escobar/)

<p align="center">
  <a href="https://www.fecap.br/"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhZPrRa89Kma0ZZogxm0pi-tCn_TLKeHGVxywp-LXAFGR3B1DPouAJYHgKZGV0XTEf4AE&usqp=CAU" alt="FECAP - Fundação de Comércio Álvares Penteado" border="0"></a>
</p>

## Descrição

O projeto **D&D com ChatGPT** tem como objetivo criar uma experiência interativa de **Dungeons & Dragons** (D&D), onde o usuário começa uma história e a IA, treinada com campanhas de D&D, gera uma narrativa colaborativa. O jogador pode escrever o início de sua jornada, e com base na entrada, a API do ChatGPT, configurada para responder como uma aventura, cria uma história com 10 turnos de interação. No final, a IA gera uma conclusão para a história.

### Funcionalidades Principais
1. **Bloco de Texto Interativo**  
   O usuário escreve o início da história (por exemplo, "Eu trago os mortos de volta à vida") e clica no botão "Enviar" para acionar a IA.

2. **API Integrada com ChatGPT**  
   Uma API do ChatGPT é acionada para gerar a continuação da história com base na entrada do jogador. Cada interação é limitada a 10 turnos, e ao final, a IA fornece uma conclusão.

3. **Saída de Texto Dinâmica**  
   O resultado da interação entre o jogador e a IA é exibido em uma caixa de saída de texto, criando uma experiência imersiva de D&D.

4. **História Personalizada**  
   A IA é treinada com campanhas de D&D para gerar respostas realistas e envolventes.

### Objetivo do Projeto
O objetivo é criar uma ferramenta divertida e envolvente para os fãs de **Dungeons & Dragons**, permitindo que a IA gere campanhas de D&D personalizadas com base nas escolhas do jogador, simulando uma aventura narrativa interativa.

---

## 🚀 Tecnologias Utilizadas
Este projeto foi desenvolvido utilizando as seguintes tecnologias:

- ⚡ **Frontend**: HTML, CSS, JavaScript
- ⚙ **Backend**: Node.js
- 🌐 **API**: ChatGPT (OpenAI)
- 📦 **Gerenciador de Pacotes**: npm
- 🗄 **Banco de Dados**: Não aplicável (uso de API externa)
- 🔧 **Outras Ferramentas**: Não aplicável (uso de API externa)

---

## 🛠 Estrutura de Pastas

```plaintext
-Raiz
|
|-->public
|    |-->index.html
|    |-->style.css
|-->src
|    |-->backend
|    |   |-->index.js
|    |-->frontend
|    |   |-->app.js
|    |   |-->style.css
|-->node_modules
|-->package.json
|-->package-lock.json
|-->readme.md
|-->.gitignore
```

## 🛠 Instalação

### 1. **Instalação de Dependências**

Para instalar as dependências do projeto, execute o seguinte comando:

```bash
npm install
```

### 2. **Executar o Servidor**

Para iniciar o servidor, execute o seguinte comando:
```bash
npm start
```

A aplicação estará disponível em http://localhost:3000.




