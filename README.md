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

Database console <optional>
```sh
docker run -it --rm --name mysqlterm --network microservicedebeziumoutbox_default --link db-ms-user --rm mysql:5.7 sh -c 'exec mysql -h db-ms-user -uroot -ptoor -D ms_user'
```


Consumer topic ms-user
```sh
docker run --rm \
  ches/kafka kafka-console-consumer.sh \
  --topic senz \
  --from-beginning \
  --zookeeper 10.4.1.29:2181
```
