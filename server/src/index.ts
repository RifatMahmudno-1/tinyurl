import Fastify, { FastifyError } from 'fastify'
import fastifyEnv from '@fastify/env'
import setupVite from './utils/setupVite.js'
import linkPost from './routes/link.post.js'
import linkPut from './routes/link.put.js'

const fastify = Fastify()
await fastify.register(fastifyEnv, { dotenv: { path: '../.env' }, schema: { type: 'object' } })

// will handle all get requests
await setupVite(fastify)

fastify.put('/link', { schema: { body: linkPut.bodySchema } }, linkPut.handler)
fastify.post('/link', { schema: { body: linkPost.bodySchema } }, linkPost.handler)

if (!process.argv.includes('--dev')) {
	fastify.setErrorHandler((e: FastifyError, _, res) => {
		console.error(e)
		return res.status(e.statusCode || 500).send({
			error: true,
			statusCode: e.statusCode || 500
		})
	})
}

await fastify.ready()
if (process.env.Serverless !== 'YES') {
	if (!process.env.PORT) throw Error('PORT not specified')
	await fastify.listen({ port: Number(process.env.PORT) })
	if (process.argv.includes('--dev')) console.log(`Server is running on http://localhost:${process.env.PORT}`)
	else console.log('Server started')
}
export default fastify
