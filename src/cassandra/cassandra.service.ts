import { Injectable } from "@nestjs/common";
import { ArrayOrObject, Client, QueryOptions, ValueCallback, mapping, types } from "cassandra-driver";

@Injectable()
export class CassandraService {
    client: Client;
    mapper: mapping.Mapper;

    async onModuleInit() {
        if (this.client) {
            return;
        }

        this.client = new Client({
            contactPoints: [process.env.SCYLLA_HOST],
            keyspace: "",
        });

        await this.client.connect();
    }

    onModuleDestroy() {
        return this.client.shutdown();
    }

    execute(query: string, params?: ArrayOrObject, options?: QueryOptions): Promise<types.ResultSet>;
    execute(
        query: string,
        params: ArrayOrObject,
        options: QueryOptions,
        callback: ValueCallback<types.ResultSet>,
    ): void;
    execute(query: string, params: ArrayOrObject, callback: ValueCallback<types.ResultSet>): void;
    execute(query: string, callback: ValueCallback<types.ResultSet>): void;
    execute(query: string, ...args) {
        if (!this.client) {
            throw new Error("Client not initialized");
        }

        return this.client.execute(query, ...args);
    }
}
