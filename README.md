# Projeto Fundect - Pictec
Programa de Iniciação Científica e Tecnológica de Mato Grosso do Sul

## Detalhes do Projeto

**Titulo:**
Uma proposta de chatbot para apoio a conscientização e prevenção do câncer do colo do útero no contexto do sistema de saúde pública do município de Nova Andradina

**Instituição**:
Instituto Federal de Mato Grosso do Sul - IFMS

**Cidade:**
Nova Andradina

**Site institucional Fundect**
https://pictec.ledes.net/detalhes/43

## Resumo

O trabalho tem como proposta o desenvolvimento de um protótipo de chatbot com o objetivo de apoiar, por meio da tecnologia a ser desenvolvida, a conscientização e a prevenção o do câncer do colo do útero no contexto do sistema de saúde pública de Mato Grosso do Sul, tendo como meio para a validação da proposta o município de Nova Andradina.

**Coordenador:**
Professor Me. Luiz Fernando Picolo

**Pesquisadas Participanetes**
Professora Me. Letícia de Godoy Enz e Enfermeira Esf. Cláudia de Souza

**Bolsistas:**
Guilherme Ferreira Tombini, 
Rafael de Andrade Albuquerque dos Santos

# Configurações e uso

Para que o projeto seja executada corretamente, nossa equipe recomenda o uso do Docker. Logo, é necessário que o mesmo esteja instalado e configurado corretamente para que os passos seguintes possam ser executados.

## Clonando o projeto

    git clone https://github.com/luizpicolo/projeto-chatbot-saude.git
    cd projeto-chatbot-saude

## Configurando o projeto

Altere as configurações para acesso ao banco de dados. Para tanto, renomeie o arquivo `.env.example` para `.env` e adicone os valores para os atributos.

Após as configurações iniciais, vamos configurar o projeto junto ao docker em um ambiente de desenvolvimento.

    docker compose -f docker-compose.yml -f compose/dev.yml build 
    docker compose -f docker-compose.yml -f compose/dev.yml run web npm install
    docker compose -f docker-compose.yml -f compose/dev.yml run web npx sequelize db:create
    docker compose -f docker-compose.yml -f compose/dev.yml run web npx sequelize db:migrate

Agora, criaremos o primeiro usuário 

    docker compose -f docker-compose.yml -f compose/dev.yml run web npx sequelize db:seed:all  

Por fim, se tudo correr normalmente, iniciaremos o projeto e acessaremos o admin por meio do link http://localhost:3000 com usuário e senha presente no arquivo `database/seeders/20220411005746-usuario_admin.js`

    docker compose -f docker-compose.yml -f compose/dev.yml up -d

# Coisas a fazer

...

