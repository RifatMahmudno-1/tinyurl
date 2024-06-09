import fastify from '../server/build/index.js'

export default (_req, _res) => fastify.server.emit('request', _req, _res)
