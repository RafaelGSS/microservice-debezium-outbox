const userService = require('./userService')

module.exports = (app, _opts, done) => {
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
    await userService.createUser(app.knex, data)

    return reply.code(201).send({ status: 201 })
  })

  done()
}
