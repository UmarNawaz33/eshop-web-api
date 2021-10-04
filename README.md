<!-- ABOUT THE PROJECT -->
## About The Project
This is web api for an ecommerce store. This api covers major features of an ecommerce shop like user registration, product upload, categories, orders and authentication.

<!-- GETTING STARTED -->
## Getting Started
To run this project first you need to setup your enviroment for nodejs. After that you need to:
* Clone this project.
* Use `npm install` command to install all the packages.

#### To Run Locally
* Setup and Configure mongb locally.
* Use `mongod` command to start mongodb server using terminal.
* Use `node app.js` command to start the node server on localhost.

#### To Run on Server
* Setup and Configure mongodb atlas for your project.
* Setup and Configure server(heroku) for your app.
* Create and Update `.env` file accordingly.
* For Deployment, follow the guidelines provided by heroku or any other server you are using.

#### Testing

Some routes of api are protected so you will need to login/register before using them. For testing the api you can use [Postman](https://www.postman.com/).

### Built With
This application is built with the following:
* [Node JS](https://nodejs.org/en/)
* [Express JS](https://expressjs.com/)
* [MongoDb](https://www.mongodb.com/)
* [Mongoose](https://mongoosejs.com/)
* [MongoDb Atlas](https://www.mongodb.com/cloud/atlas)


<!-- API Endpoints -->
## API Endpoints
This api allows all CRUD operations and it has following endpoints:

### User
* [User Model](https://github.com/UmarNawaz33/eshop-web-api/blob/main/models/user.js) 
* [User Route](https://github.com/UmarNawaz33/eshop-web-api/blob/main/routes/users.js)

<table>
  <tr> <th>Reuest</th> <th>Path</th> <th>Body Parameters</th> <th>Request Parameters</th> <th>Explanation</th> </tr>
  <tr> <td><b>GET</b></td> <td>http://localhost:3000/api/v1/users</td> <td>-</td> <td>-</td> <td>get all users</td> </tr>
  <tr> <td><b>GET</b></td> <td>http://localhost:3000/api/v1/users/:id</td> <td>-</td> <td>user id</td> <td>get user with id</td> </tr>
  <tr> <td><b>GET</b></td> <td>http://localhost:3000/api/v1/users/get/count</td> <td>-</td> <td>-</td> <td>get user count</td> </tr>
  <tr> <td><b>POST</b></td> <td>http://localhost:3000/api/v1/users</td> <td>all user fields</td> <td>-</td> <td>add user to database</td> </tr>
  <tr> <td><b>POST</b></td> <td>http://localhost:3000/api/v1/users/register</td> <td>all user fields</td> <td>-</td> <td>register a user</td> </tr>
  <tr> <td><b>POST</b></td> <td>http://localhost:3000/api/v1/users/login</td> <td>email, password</td> <td>-</td> <td>user login</td> </tr>
  <tr> <td><b>DELETE</b></td> <td>http://localhost:3000/api/v1/users/:id</td> <td>-</td> <td>user id</td> <td>delete user with specified id</td></tr>
</table>

### Category
* [Category Model](https://github.com/UmarNawaz33/eshop-web-api/blob/main/models/category.js) 
* [Category Route](https://github.com/UmarNawaz33/eshop-web-api/blob/main/routes/categories.js)

<table>
  <tr> <th>Reuest</th> <th>Path</th> <th>Body Parameters</th> <th>Request Parameters</th> <th>Explanation</th> </tr>
  <tr> <td><b>GET</b></td> <td>http://localhost:3000/api/v1/categories</td> <td>-</td> <td>-</td> <td>get all categories</td> </tr>
  <tr> <td><b>GET</b></td> <td>http://localhost:3000/api/v1/categories/:id</td> <td>-</td> <td>category id</td> <td>get category with id</td> </tr>
  <tr> <td><b>PUT</b></td> <td>http://localhost:3000/api/v1/categories/:id</td> <td>name, icon, color</td> <td>category id</td> <td>update category</td> </tr>
  <tr> <td><b>POST</b></td> <td>http://localhost:3000/api/v1/categories</td> <td>all category fields</td> <td>-</td> <td>add category to database</td> </tr>
  <tr> <td><b>DELETE</b></td> <td>http://localhost:3000/api/v1/categories/:id</td> <td>-</td> <td>category id</td> <td>delete category with specified id</td></tr>
</table>

### Product
* [Product Model](https://github.com/UmarNawaz33/eshop-web-api/blob/main/models/product.js) 
* [Product Route](https://github.com/UmarNawaz33/eshop-web-api/blob/main/routes/products.js)

<table>
  <tr> <th>Reuest</th> <th>Path</th> <th>Body Parameters</th> <th>Request Parameters</th> <th>Explanation</th> </tr>
  <tr> <td><b>GET</b></td> <td>http://localhost:3000/api/v1/products</td> <td>-</td> <td>-</td> <td>get all products</td> </tr>
  <tr> <td><b>GET</b></td> <td>http://localhost:3000/api/v1/products/:id</td> <td>-</td> <td>id</td> <td>get product with id</td> </tr>
  <tr> <td><b>GET</b></td> <td>http://localhost:3000/api/v1/products/get/count</td> <td>-</td> <td>-</td> <td>get total product count</td> </tr>
  <tr> <td><b>GET</b></td> <td>http://localhost:3000/api/v1/products/get/featured/:count</td> <td>-</td> <td>count</td> <td>get specified number of featured product</td> </tr>
  <tr> <td><b>POST</b></td> <td>http://localhost:3000/api/v1/products</td> <td>all product fields, (product image upload)</td> <td>-</td> <td>add product to database</td> </tr>
  <tr> <td><b>PUT</b></td> <td>http://localhost:3000/api/v1/products/:id</td> <td>category id, all product field, (product image upload)</td> <td>product id</td> <td>update product</td> </tr>
  <tr> <td><b>PUT</b></td> <td>http://localhost:3000/api/v1/products//gallery-images/:id</td> <td>multiple product images upload</td> <td>product id</td> <td>add gallery images of product</td> </tr>
  <tr> <td><b>DELETE</b></td> <td>http://localhost:3000/api/v1/products/:id</td> <td>-</td> <td>product id</td> <td>delete product with specified id</td></tr>
</table>

### Order
* [Order Model](https://github.com/UmarNawaz33/eshop-web-api/blob/main/models/order.js) 
* [Order Route](https://github.com/UmarNawaz33/eshop-web-api/blob/main/routes/orders.js)

<table>
  <tr> <th>Reuest</th> <th>Path</th> <th>Body Parameters</th> <th>Request Parameters</th> <th>Explanation</th> </tr>
  <tr> <td><b>GET</b></td> <td>http://localhost:3000/api/v1/orders</td> <td>-</td> <td>-</td> <td>get all orders</td> </tr>
  <tr> <td><b>GET</b></td> <td>http://localhost:3000/api/v1/orders/:id</td> <td>-</td> <td>order id</td> <td>get order with id</td> </tr>
  <tr> <td><b>GET</b></td> <td>http://localhost:3000/api/v1/orders/get/userorder/:userid</td> <td>-</td> <td>user id</td> <td>get all order of specific user</td> </tr>
  <tr> <td><b>GET</b></td> <td>http://localhost:3000/api/v1/orders/get/totalsales</td> <td>-</td> <td>-</td> <td>get total sales</td> </tr>
  <tr> <td><b>GET</b></td> <td>http://localhost:3000/api/v1/orders/get/count</td> <td>-</td> <td>-</td> <td>get order count</td> </tr>
  <tr> <td><b>PUT</b></td> <td>http://localhost:3000/api/v1/orders/:id</td> <td>status</td> <td>order id</td> <td>update order status</td> </tr>
  <tr> <td><b>POST</b></td> <td>http://localhost:3000/api/v1/orders</td> <td>all order fields, product, product quantity</td> <td>-</td> <td>add order to database</td> </tr>
  <tr> <td><b>DELETE</b></td> <td>http://localhost:3000/api/v1/orders/:id</td> <td>-</td> <td>order id</td> <td>delete order with specified id</td></tr>
</table>


<!-- LICENSE -->
## License

Distributed under the MIT License. See [LICENSE](https://github.com/UmarNawaz33/eshop-web-api/blob/main/LICENSE) for more information.

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [body-parser](https://www.npmjs.com/package/body-parser)
* [express](https://www.npmjs.com/package/express)
* [mongoose](https://www.npmjs.com/package/mongoose)
* [bcryptjs](https://www.npmjs.com/package/bcryptjs)
* [cors](https://www.npmjs.com/package/cors)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [express-jwt](https://www.npmjs.com/package/express-jwt)
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
* [morgan](https://www.npmjs.com/package/morgan)
* [multer](https://www.npmjs.com/package/multer)



