import { FromSchema } from 'json-schema-to-ts'
import { FastifyRequest, FastifyReply } from 'fastify'
import mongo from '../utils/mongo.js'
import { urlAlphabet, customAlphabet } from 'nanoid'

async function getShortUrl(len: number, times: number, maxTimes: number) {
	const short_url = customAlphabet(urlAlphabet, len)()
	const got = false
	await mongo
		.client!.db('TinyUrl')
		.collection('Urls')
		.findOne({ short_url }, { projection: { _id: 1 } })
	if (!got) return short_url
	else {
		times++
		if (times % 2 !== 0) len++
		if (times > maxTimes) return null
		return await getShortUrl(len, times, maxTimes)
	}
}

const bodySchema = {
	type: 'object',
	properties: {
		url: { type: 'string', minLength: 4, maxLength: 2000 }
	},
	additionalProperties: false,
	required: ['url']
} as const

async function handler(req: FastifyRequest<{ Body: FromSchema<typeof bodySchema> }>, res: FastifyReply) {
	try {
		new URL(req.body.url)
	} catch {
		return res.status(400).send({ error: true, message: 'Invalid URL' })
	}

	try {
		if (!mongo.client) await mongo.init()
		if (!mongo.client) return res.status(500).send({ error: true, message: 'DB connection error' })

		const short_url = await getShortUrl(8, 1, 18)
		if (!short_url) throw 'Ran out of random strings'

		await mongo.client.db('TinyUrl').collection('Urls').insertOne({ actual_url: req.body.url, short_url, createdAt: Date.now() })

		return res.send({ short_url })
	} catch (e) {
		console.log(e)
		return res.status(500).send()
	}
}

export default { bodySchema, handler }
