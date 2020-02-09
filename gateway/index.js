const fastify = require('fastify')({
  logger: 'info'
})

// required plugin for HTTP requests proxy
fastify.register(require('fastify-reply-from'))

// gateway plugin
fastify.register(require('k-fastify-gateway'), {

  routes: [{
    prefix: '/ms-user',
    target: 'http://ms-user:3000',
  }]
})

// start the gateway HTTP server
fastify.listen(3000, '0.0.0.0').then((address) => {
  console.log(`API Gateway listening on ${address}`)
})
