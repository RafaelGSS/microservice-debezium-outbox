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

Go to localhost:9000 to see topics
