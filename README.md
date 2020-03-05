# microservice-debezium-outbox

```sh
docker-compose up
```

## Kafka

- Zookeeper
- Kafdrop - http://localhost:9000

## Gateway

- `ms-user`: http://localhost:3000/ms-user


## After up

```sh
http POST http://localhost:8083/connectors/ < ms-user/src/connector.json
```

Create a user example
```sh
http POST http://localhost:3000/ms-user/user name=Gonzaga email=rafael.nunu@hotmail.com
```

So, just go to kafdrop on topic specified in the connector and see the message something like:
```
{
   "before":null,
   "after":{
      "id":2,
      "type":"CREATE",
      "aggregate_type":"Users",
      "aggregate_id":1,
      "payload":"{\"name\":\"Gonzaga\",\"email\":\"rafael.nunu@hotmail.com\"}"
   },
   "source":{
      "version":"1.0.2.Final",
      "connector":"mysql",
      "name":"db-ms-user",
      "ts_ms":1583417056000,
      "snapshot":"false",
      "db":"ms_user",
      "table":"outbox",
      "server_id":1,
      "gtid":null,
      "file":"binlog.000022",
      "pos":520,
      "row":0,
      "thread":12,
      "query":null
   },
   "op":"c",
   "ts_ms":1583417056193
}
```

**IMPORTANT**: You can format this message for make more sense on this pattern. See [Avro](https://debezium.io/documentation/reference/configuration/avro.html)

## Debug

Database console <optional>
```sh
docker run -it --rm --name mysqlterm --network microservicedebeziumoutbox_default --link db-ms-user --rm mysql:5.7 sh -c 'exec mysql -h db-ms-user -uroot -ptoor -D ms_user'
```

Go to localhost:9000 to see topics
