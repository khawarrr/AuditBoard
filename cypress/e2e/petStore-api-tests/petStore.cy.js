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
    /* Using the cy.request method to make a POST request to the specified URL 
    with the body as a newPet object. */
    it('Verify create endpoint', () => {
      cy.request({
        method: 'POST',
        url: 'https://petstore.swagger.io/v2/pet',
        body: newPet,
      }).then((response) => {
        expect(response.status).to.eq(200)

        /* Making another request with a GET method to retrieve the pet details 
        with the id from the previous response.*/
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
  
    it('Verify Update/PUT Endpoint', () => {
      // The newPet object's name is updated to "New Name".
      newPet.name = 'New Name'
      /* A PUT request is made to the specified URL with the petId query 
         parameter and the updated newPet object as the request body. */
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
        /* Finally, the response body is checked to ensure that the name property is 
        equal to the updated name in the newPet object.*/
        expect(response.body.name).to.eq(newPet.name)
      })

    });

    it('Verify findByStatus Endpoint', () => {
      // A GET request is made to the specified URL with the status query parameter set to "available".
      cy.request({
        method: 'GET',
        url: `https://petstore.swagger.io/v2/pet/findByStatus?status=available`,
      }).then((response) => {
        expect(response.status).to.eq(200)
        // The response body is then wrapped using cy.wrap and each pet in the response is iterated over.
        cy.wrap(response.body).each(pet => {
          expect(pet.status).to.equal('available')
        })
      })

    });
  
    it('Verify delete Endpoint', () => {
      // A DELETE request is made to the specified URL with the petId parameter.
        cy.request({
          method: 'DELETE',
          url: `https://petstore.swagger.io/v2/pet/${petId}`,
        }).then((response) => {
          expect(response.status).to.eq(200)
        })
        /* The failOnStatusCode option is set to false, allowing the test to 
        continue even if the status code is not what is expected.*/
        cy.request({
          method: 'GET',
          url: `https://petstore.swagger.io/v2/pet/${petId}`,
          failOnStatusCode: false,
        }).then((response) => {
          // The status of the response is checked and it should be 404 (Not Found).
          // This indicates that the pet has been successfully deleted.
          expect(response.status).to.eq(404)
        })
      });

    });


    
    