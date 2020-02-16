const outboxService = require('./outboxService')

const userService = {
  // knex symbol - simulate injection dependency
  createUser(knex, data) {
    return knex.transaction(async (trx) => {
      await Promise.all([
        // call the repository
        trx('users').insert(data),
        outboxService.sendMessage(trx, {
          payload: JSON.stringify(data),
          aggregateId: 1,
          aggregateType: 'Users',
          type: 'CREATE'
        })
      ])
    })
  }
}

module.exports = userService
