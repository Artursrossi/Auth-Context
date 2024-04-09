# Auth-Context 🔥

<a href="https://auth-artursrossi.netlify.app/" target="_blank">https://auth-artursrossi.netlify.app/</a>

<br>
 
<p align="center">
  <img alt="preview1" src="./public/preview1.png">
  <img alt="preview2" src="./public/preview2.png">
  <img alt="preview3" src="./public/preview3.png">
  <img alt="preview4" src="./public/preview4.png">
</p>

## 🚀 Pages

| Pages     | Access Type                                                    |
| --------- | -------------------------------------------------------------- |
| Index     | Public Route                                                   |
| Register  | Public Route, but redirect to dashboard when user is logged in |
| Login     | Public Route, but redirect to dashboard when user is logged in |
| Dashboard | Protected Route, Only logged users can access this route       |
| Admin     | Protected Route, Only admins can access this route             |

## 🔖 Admin Account

> To access admin route the user needs to be an admin, because of this, to test the admin route you can use this account:

### Email: artur@gmail.com

### Password: artur123

## 👨🏾‍💻 Security

- Protected API Routes (two security layers, the first one on middleware and the second in the Routes)
- JSON Web Tokens w/ HttpOnly + Secure Cookies
- Passwords Hash with Bcrypt (12 Salt Rounds)
