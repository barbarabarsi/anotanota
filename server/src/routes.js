import { Router } from "express";

import auth from "./middlewares/auth.js"

import HelloController from "./controllers/HelloController.js";
import UsersController from "./controllers/UserController.js";
import NotasController from "./controllers/NotasController.js";
import SessionControler from "./controllers/SessionControler.js";

const routes = new Router()


routes.post('/session',SessionControler.create)
routes.get('/', HelloController.index)
routes.post('/users', UsersController.create)

routes.use(auth) //middleware

routes.get('/users/:id', UsersController.show)

routes.put('/users/:id', UsersController.update)
routes.delete('/users/:id', UsersController.delete)

routes.get('/users/:UsuarioID/notas', NotasController.index)
routes.post('/users/:UsuarioID/notas', NotasController.create)
routes.delete('/users/:UsuarioID/notas/:id', NotasController.delete)



export default routes
