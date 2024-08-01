const express = require('express');
const projectRouter = require('./projects/projects-router')
const actionsRouter = require('./actions/actions-router')
const server = express();

server.use(express.json())
server.use('/api/projects', projectRouter)
server.use('/api/actions', actionsRouter)

module.exports = server;
