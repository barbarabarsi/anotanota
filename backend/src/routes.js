import { Router } from "express";

import auth from "./middlewares/auth"

import HelloController from "./controllers/HelloController";
import UsersController from "./controllers/UserController";
import NotasController from "./controllers/NotasController";
import SessionControler from "./controllers/SessionControler";

const routes = new Router()


routes.post('/session',SessionControler.create)
routes.get('/hello', HelloController.index)

routes.use(auth) //middleware

routes.get('/users', UsersController.index)
routes.get('/users/:id', UsersController.show)
routes.post('/users', UsersController.create)
routes.put('/users/:id', UsersController.update)
routes.delete('/users/:id', UsersController.delete)

routes.get('/users/:UsuarioID/notas', NotasController.index)
routes.post('/users/:UsuarioID/notas', NotasController.create)
routes.delete('/users/:UsuarioID/notas/:id', NotasController.delete)



export default routes