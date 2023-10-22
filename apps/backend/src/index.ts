import Fastify from "fastify";
import cors from "@fastify/cors";

const server = Fastify();

server.register(cors);

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
