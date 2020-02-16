const fastify = require('fastify')({
  logger: 'info'
})

const config = {
  database: {
    client: 'mysql',
    connection: process.env.DB_CONNECTION || 'mysql://root:@localhost:3306/ms_user_development'
  }
}

const userController = require('./userController')

fastify.register(require('fastify-knex'), config.database)
fastify.register(userController)

fastify.listen(3000, '0.0.0.0', err => {
  if (err) throw err;
})

