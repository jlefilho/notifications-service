import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { ServerKafka } from "@nestjs/microservices";

@Injectable()
export class KafkaConsumerService extends ServerKafka implements OnModuleDestroy {
    constructor() {
        super({
            client: {
                clientId: 'notifications',
                brokers: ['driven-tarpon-13254-us1-kafka.upstash.io:9092'],
                sasl: {
                    mechanism: 'scram-sha-256',
                    username: `${process.env.KAFKA_USERNAME_KEY}`,
                    password: `${process.env.KAFKA_PASSWORD_KEY}`
                },
                ssl: true,
            }
        })
    }

    async onModuleDestroy() {
        await this.close()
    }
}