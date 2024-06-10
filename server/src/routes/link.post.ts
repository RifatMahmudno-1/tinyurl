import { FromSchema } from 'json-schema-to-ts'
import { FastifyRequest, FastifyReply } from 'fastify'
import mongo from '../utils/mongo.js'

const bodySchema = {
	type: 'object',
	properties: {
		short_url: { type: 'string', minLength: 8, maxLength: 16 }
	},
	additionalProperties: false,
	required: ['short_url']
} as const

async function handler(req: FastifyRequest<{ Body: FromSchema<typeof bodySchema> }>, res: FastifyReply) {
	if (!mongo.client) await mongo.init()
	if (!mongo.client) return res.status(500).send({ error: true, message: 'DB connection error' })

	const got = await mongo.client
		.db('TinyUrl')
		.collection('Urls')
		.findOne({ short_url: req.body.short_url }, { projection: { actual_url: 1, createdAt: 1, _id: 0 } })

	if (!got) return res.status(404).send()
	return res.send(got)
}

export default { bodySchema, handler }
