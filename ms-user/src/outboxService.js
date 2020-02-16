const outboxService = ({
  sendMessage(knex, { aggregateType, aggregateId, type, payload }) {
    return knex('outbox').insert({
      aggregate_type: aggregateType,
      aggregate_id: aggregateId,
      type,
      payload
    })
  }
})

module.exports = outboxService
