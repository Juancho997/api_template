# api_template
A simple 1:M API REST with integrated documentation and testing.



1. Create two databases with MySQL, one for using the API and other for testing it.
If you don't have MySQL installed in your system, [here's a tutorial on how to do it](https://www.youtube.com/watch?v=2c2fUOgZMmY&ab_channel=AmitThinks). 


2. Use the .env.example as a guide to configurate the environment variables. They should be pointing to your MySQL credentials. Some of them are already filled, but you can change them anyway you need. (Don't forget to delete the '.example' extension!).


3. Then, open a terminal in the proyect root folder and enter the following command:
  
  > npm install
  
  > npm start 
  
  (Optional) I recommend installing [nodemon](https://www.npmjs.com/package/nodemon) and start the project with 
  > npm run dev


4. Once the server it´s started, you can check the swagger documentation at http://localhost:3000/api-docs/



Now you can use the API by your own! :D




### Testing
If you like to test it, you must change the const "stage" at database/index.js to "testing". This will ensure that you´re using a testing database to run the test files.
