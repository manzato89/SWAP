describe('SWAPI API Tests', () => {
  const baseUrl = 'https://swapi.dev/api';

  it('1-) Validar o formato da request (json válido) para a seguinte API: "https://swapi.dev/api/films/?format=json"', () => {
    cy.request('GET', `${baseUrl}/films/?format=json`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('results');
      expect(response.body.results).to.be.an('array');
    });
  });

  it('2-) Validar retorno para URL Inválida', () => {
    cy.request({ url: `${baseUrl}/people/?format=jsonx`, failOnStatusCode: false }).then((response) => {
      expect(response.status).to.eq(404, 'URL inválida');
    });
  });

  it('3-) Validar existência do filme 10', () => {
    cy.request({ url: `${baseUrl}/films/10/`, failOnStatusCode: false }).then((response) => {
      expect(response.status).to.eq(404, 'Filme 10 não existe');
    });
  });

  it('4-) Validar existência do filme 2', () => {
    cy.request(`${baseUrl}/films/2/`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('title', 'The Empire Strikes Back');
      expect(response.body).to.have.property('episode_id', 5);
      expect(response.body).to.have.property('release_date', '1980-05-17');
    });
  });

  it('5-) Validar o nome correto de um determinado episódio de filme', () => {
    cy.request(`${baseUrl}/films/5/`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("title").to.be.eq('Attack of the Clones');
    });
  });

  it('6-) Validar o ID correto de um determinado episódio de filme', () => {
    cy.request(`${baseUrl}/films/6/`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("episode_id").to.be.eq(3);
    });
  });

  it('7-) Validar o formato de data válida (padrão americano) e validar se a data não é padrão Brasil', () => {
    cy.request(`${baseUrl}/films/6/`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("release_date").to.be.eq('2005-05-19', 'Padrão Americano');
      expect(response.body).to.have.property("release_date").to.not.be.eq('19/05/2005', 'Padrão Brasileiro');
    });
  });

  it('8-) Validar o peso e a altura do C-3PO e validar pelo menos um filme que ele tenha participado', () => {
    cy.request(`${baseUrl}/people/2/`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("name").to.be.eq('C-3PO');
      expect(response.body).to.have.property("height").to.be.eq('167');
      expect(response.body).to.have.property("mass").to.be.eq('75');
      cy.request(`${baseUrl}/films/2/`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("title").to.be.eq('The Empire Strikes Back');
      });
    });
  });
});