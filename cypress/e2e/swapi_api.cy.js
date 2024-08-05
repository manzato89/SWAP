describe('SWAPI API Tests', () => {
    const baseUrl = 'https://swapi.dev/api';
    
    it('Deve buscar informações de um personagem específico', () => {
      cy.request(`${baseUrl}/people/1/`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('name', 'Luke Skywalker');
      });
    });
  
    it('Deve buscar informações de um filme específico', () => {
      cy.request(`${baseUrl}/films/1/`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('title', 'A New Hope');
      });
    });
  
    it('Deve listar todos os planetas', () => {
      cy.request(`${baseUrl}/planets/`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('results');
        expect(response.body.results).to.be.an('array');
      });
    });
  });