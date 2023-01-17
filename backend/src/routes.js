import { Router } from "express";

import HelloController from "./controllers/HelloController";
import UsersController from "./controllers/UserController";
import NotasController from "./controllers/NotasController";

const routes = new Router()

routes.get('/hello', HelloController.index)

routes.get('/users', UsersController.index)
routes.get('/users/:id', UsersController.show)
routes.post('/users', UsersController.create)
routes.put('/users/:id', UsersController.update)
routes.delete('/users/:id', UsersController.delete)


routes.get('/users/:UsuarioID/repositories', NotasController.index)
routes.post('/users/:UsuarioID/repositories', NotasController.create)
routes.delete('/users/:UsuarioID/repositories', NotasController.delete)


export default routes