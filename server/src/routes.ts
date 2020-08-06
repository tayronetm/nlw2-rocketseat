import express from 'express';
import ClassController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router();
const classesController = new ClassController();
const connectionsController = new ConnectionsController();

// GET: Buscar uma informação
// POST: Criar uma nova informação
// PUT: Atualizar uma informação existente
// DELETE: Deletar uma informação

// ** POR PADRÃO O NAVEGADOR EXECUTA O GET SE NÃO ACHAR EXIBE UM "CANNOT GET /"

// PARAMETROS
// 1. Corpo (request.body): Dados para criação ou atualização de uma entidade;
// 2. Route Params(request.params) : Identificar qual recurso eu quero atualizar ou deletar; /:id
// 3. Query Params(request.query): Páginação, filtros, ordenação...

routes.get('/classes', classesController.list);
routes.post('/classes', classesController.create);

routes.get('/connections', connectionsController.list)
routes.post('/connections', connectionsController.create)

export default routes;
