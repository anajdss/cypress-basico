/// <reference types="Cypress" /> 
//diretiva usada para informar que o código faz uso de tipos e funcionalidades específicas do Cypress

describe('Central de Atendimento ao Cliente TAT', function() { // Inicia uma suíte de testes
    this.beforeEach(function(){ // Inicia um bloco beforeEach, que contém código a ser executado antes de cada caso de teste no conjunto de testes
      cy.visit('./src/index.html'); //Visita a página da aplicação
    })
    it('verifica o título da aplicação', function() { //Inicia um caso de teste

      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT'); //O método cy.title() é utilizado para obter o título da página
      //método should é usado para aplicar uma asserção (assertion)                                                                  
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){ //A palavra-chave only é usada aqui para indicar que apenas este caso de teste específico será executado
      const longText = 'Teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste'
      cy.get('#firstName').type('Ana Julia') //get acessa o elemento e o type insere o texto 
      cy.get('#lastName').type('Soares')
      cy.get('#email').type('nana@outlook.com')
      cy.get('#open-text-area').type(longText, {delay: 0}) //A opção {delay: 0} é usada para especificar que não há atraso (ou um atraso mínimo possível) entre cada caractere digitado.
      cy.contains('button', 'Enviar').click()

      cy.get('.success').should('be.visible') //Encontra um elemento HTML com a classe 'success' e verifica se ele está visível
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
      cy.get('#firstName').type('Ana Julia') 
      cy.get('#lastName').type('Soares')
      cy.get('#email').type('nana@outlook,com') //e-mail inválido
      cy.get('#open-text-area').type('Teste') //A opção {delay: 0} é usada para especificar que não há atraso (ou um atraso mínimo possível) entre cada caractere digitado.
      cy.contains('button', 'Enviar').click()

      cy.get('.error').should('be.visible') //Encontra um elemento HTML com a classe 'error' e verifica se ele está visível
      
  })

    it('campo telefone continua vazio quando preenchido com valor não numérico', function(){
      cy.get('#phone').type('abcdef').should('have.value', '') //está verificando se o valor do elemento ('phone') é uma string vazia ('') ou seja se não aceitou caracteres não num

    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
      cy.get('#firstName').type('Ana Julia') 
      cy.get('#lastName').type('Soares')
      cy.get('#email').type('nana@outlook.com') 
      cy.get('#phone-checkbox').check() //clicou no checkbox do telefone tornando o campo telefone obrigatório
      cy.get('#open-text-area').type('Teste') 
      cy.contains('button', 'Enviar').click()

      cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
      //junto com o typo pode utilizar o clear que apaga o texto
      cy.get('#firstName').type('Ana Julia').should('have.value', 'Ana Julia').clear().should('have.value', '')
      cy.get('#lastName').type('Soares').should('have.value', 'Soares').clear().should('have.value', '')
      cy.get('#email').type('nana@outlook.com').should('have.value', 'nana@outlook.com').clear().should('have.value', '')
      cy.get('#phone').type('123456').should('have.value', '123456').clear().should('have.value', '')
   })

   it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
    
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')

    })

  it('envia o formuário com sucesso usando um comando customizado', function(){
    cy.fillMandaToryFieldAndSubmit() //é um comando customizado na pasta commands que tem como argumeto o preenchimento dos campos

    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', function(){         
    cy.get('#product').select('YouTube').should('have.value', 'youtube') //select pelo texto e verificação por valor

  })

  it('seleciona um produto (Mentoria) por seu valor (value)', function(){
    cy.get('#product').select('mentoria').should('have.value', 'mentoria') //select e verificação por valor

  })

  it('seleciona um produto (Blog) por seu índice', function(){  //select pelo indíce e verificação por valor
    cy.get('#product').select(1).should('have.value', 'blog')

  })

  it('marca o tipo de atendimento "Feedback"', function(){  
    cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback') //marcando um radio
  })

  it('marca cada tipo de atendimento', function(){  
    cy.get('input[type="radio"]') //retorna mais de uma elemento 
    .should('have.length', 3) //verificar se contém 3 elementos
    .each(function($radio){ //passa por cada um dos elementos
      cy.wrap($radio).check() //wrap empacota o elemento e o check clica nele 
      cy.wrap($radio).should('be.checked') // verifica se ele foi marcado 
    })

})

  it('marca ambos checkboxes, depois desmarca o último', function(){  
  cy.get('input[type="checkbox"]') //pega todos os inputs
  .check() // mandou check em cada um deles 
  .should('be.checked') //verifica se marcou os dois
  .last() // pega o último
  .uncheck() // desmarcou 
  .should('not.be.checked') //verifica que não está mais checado
  })

  it.only('seleciona um arquivo da pasta fixtures', function(){  
    cy.get('input[type="file"]#file-upload')
    .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json')
    .should(function($input){
      expect($input[0].files[0].name).to.equals('example.json')
    })
  })

})
