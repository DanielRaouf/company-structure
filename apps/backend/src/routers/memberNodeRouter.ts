import { FastifyPluginCallback } from "fastify";
import * as memberNodeService from "../services/memberNodeService";

export const memberNodeRouter: FastifyPluginCallback = (fastify, _, done) => {
  fastify.route({
    url: "/children/:id",
    method: "GET",
    handler: memberNodeService.getNodeChildren,
  });

  fastify.route({
    url: "/node",
    method: "POST",
    handler: memberNodeService.addNode,
    schema: {
      body: {
        type: "object",
        required: ["name", "type"],
        properties: {
          name: { type: "string" },
          type: { type: "string", enum: ["Developer", "Manager"] },
        },
      },
    },
  });

  fastify.route({
    url: "/node/:id",
    method: "PATCH",
    handler: memberNodeService.updateNode,
    schema: {
      body: {
        type: "object",
        required: ["parentId"],
        properties: {
          parentId: { type: "number" },
        },
      },
      params: {
        type: "object",
        required: ["id"],
        properties: {
          id: { type: "number" },
        },
      },
    },
  });
  done();
};
