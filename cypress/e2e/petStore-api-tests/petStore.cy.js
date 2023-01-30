describe('CRUD tests for pet endpoint', () => {
    const petId = 1
    const newPet = {
      id: petId,
      name: 'Pet 1',
      photoUrls: [],
      tags: [
        {
          id: 1,
          name: 'tag 1'
        }
      ],
      status: 'available'
    }
  
    it('Verify create endpoint', () => {
      cy.request({
        method: 'POST',
        url: 'https://petstore.swagger.io/v2/pet',
        body: newPet,
      }).then((response) => {
        expect(response.status).to.eq(200)

          cy.request({
            method: 'GET',
            url: `https://petstore.swagger.io/v2/pet/${response.body.id}`,
          }).then((response2) => {
            expect(response2.status).to.eq(200)
            expect(response2.body).to.have.property('id', response.body.id)
            expect(response2.body).to.have.property('name', newPet.name)
          })
      })

      
    });

    // it('read', () => {
    //   cy.get('@newPetId').then((newPetId) => {

    //     cy.request({
    //       method: 'GET',
    //       url: `https://petstore.swagger.io/v2/pet/${newPetId}`,
    //     }).then((response) => {
    //       expect(response.status).to.eq(200)
    //       expect(response.body.id).to.eq(newPetId)
    //       expect(response.body.name).to.eq(newPet.name)
    //     })
    //   })
    // });
  
    it('Verify Update/PUT Endpoint', () => {
      newPet.name = 'New Name'
      cy.request({
        method: 'PUT',
        url: `https://petstore.swagger.io/v2/pet?${petId}`,
        body: newPet,
      }).then((response) => {
        expect(response.status).to.eq(200)
      })
      cy.request({
        method: 'GET',
        url: `https://petstore.swagger.io/v2/pet/${petId}`,
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.name).to.eq(newPet.name)
      })
    });

    it('Verify findByStatus Endpoint', () => {
      cy.request({
        method: 'GET',
        url: `https://petstore.swagger.io/v2/pet/findByStatus?status=available`,
      }).then((response) => {
        expect(response.status).to.eq(200)
        cy.wrap(response.body).each(pet => {
          expect(pet.status).to.equal('available')
        })
      })
    });
  
    it('Verify delete Endpoint', () => {
        
        cy.request({
          method: 'DELETE',
          url: `https://petstore.swagger.io/v2/pet/${petId}`,
        }).then((response) => {
          expect(response.status).to.eq(200)
        })
        cy.request({
          method: 'GET',
          url: `https://petstore.swagger.io/v2/pet/${petId}`,
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.eq(404)
        })
      });

     

    });


    
    