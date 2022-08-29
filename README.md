# api_template
A simple API REST with integrated documentation and testing.

1. First of all, create a database based in mySQL. If you don't have it installed in your system, [here's a tutorial on how to do it](https://www.youtube.com/watch?v=2c2fUOgZMmY&ab_channel=AmitThinks).

2. Use the .env.example as a guide to configurate the environment variables. They should be pointing to your mySQL credentials. Some of them are already filled,  but you can change them anyway you need. (Don't forget to delete the '.example' extension!).

3. Then, open a terminal in the proyect root folder and enter the following commands:
  > npm install
  
  > npm start 
  
  (Optional) I recommend installing [nodemon](https://www.npmjs.com/package/nodemon) and start the project with 
  > npm run dev











You can access the documentation making a GET request to /api-docs/
