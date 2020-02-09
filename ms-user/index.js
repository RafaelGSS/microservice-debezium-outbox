const fastify = require('fastify')({
  logger: 'info'
})

const config = {
  database: {
    client: 'mysql',
    connection: process.env.DB_CONNECTION || 'mysql://root:@localhost:3306/ms_user_development'
  }
}

fastify.register(require('fastify-knex'), config.database)
fastify.register(rootRoutes)
fastify.register(userRoutes)

fastify.listen(3000, '0.0.0.0', err => {
  if (err) throw err;
})

function rootRoutes(app, _opts, done) {
  app.get('/', (_req, reply) => {
    reply.send({ status: 200 })
  })
  done()
}

function userRoutes(app, _opts, done) {
  app.get('/user', async (_req) => {
    const users = await app.knex.select().from('users')
    return { data: users }
  })

  app.post('/user', {
    schema: {
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string' }
        },
        required: ['name', 'email']
      }
    }
  }, async ({ body }, reply) => {
    const data = {
      name: body.name,
      email: body.email
    }
    await app.knex('users').insert(data)

    return reply.code(201).send({ status: 201 })
  })

  done()
}
