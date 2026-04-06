# API Test Automation Summary

- Run `npm install` to instal all needed packages
- Run `npm test` to run test cases
- To run the project call `npm run dev` to start the app
Application will be available at http://localhost:3000/

## Technologies Used

- JavaScript
- Jest
- Supertest
- Express
- Swagger UI

## API Under Test

Swagger Petstore API  
Base URL: `https://petstore.swagger.io/v2`

## Endpoints Identified for Testing

1. `GET /store/inventory`
2. `GET /pet/findByStatus`
3. `GET /pet/{petId}`
4. `POST /pet`
5. `PUT /pet`
6. `DELETE /pet/{petId}`
7. `GET /store/order/{orderId}`
8. `GET /user/login`

## Functional Testing Scenarios

- Verify `GET /store/inventory` returns status `200` and a JSON object.
- Verify `GET /pet/findByStatus?status=available` returns status `200` and an array of pets.
- Verify `GET /pet/{petId}` returns a valid pet object for an existing pet.
- Verify `POST /pet` creates a new pet successfully.
- Verify `PUT /pet` updates an existing pet successfully.
- Verify `DELETE /pet/{petId}` deletes a pet successfully.

## Negative Testing Scenarios

- Send invalid status value to `GET /pet/findByStatus`.
- Send non-numeric path parameter to `GET /pet/{petId}`.
- Send incomplete request body to `POST /pet`.
- Send invalid request body to `PUT /pet`.
- Call `GET /user/login` without required query parameters.

## Edge Case Testing Scenarios

- Use `-1` as pet ID.
- Use `0` as pet ID.
- Use `0` as order ID where minimum is `1`.
- Use `11` as order ID where documented successful range is `1` to `10`.
- Send multiple query parameter values to `GET /pet/findByStatus`.

## Validation Areas Covered

- HTTP status codes
- Response body structure
- Query parameters
- Path parameters
- Data integrity
- Error handling
