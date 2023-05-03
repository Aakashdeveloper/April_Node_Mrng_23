///////////// /
*GetAllUser/ (GET)> http://3.17.216.66:5000/api/auth/users

/*Register/ (POST)> http://3.17.216.66:5000/api/auth/register (body) => {"name":"Aakash", "email":"aa@gmail.com","password":"12345678","phone":343432,role?":"user"}

/*Login/ (POST) => http://3.17.216.66:5000/api/auth/login (body) => {"email":"aa@gmail.com","password":"12345678"} (response)=> {auth:true,token:'dgsdg'}

/*UserInfo/ (GET) => http://3.17.216.66:5000/api/auth/userinfo 
# (Header) => {'x-access-token':'token value from login'}

npm i bcryptjs body-parser cors express jsonwebtoken mongoose