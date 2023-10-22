import { FastifyRequest } from "fastify";
import { MemberNode } from "shared-types";

// TODO: replace by a real database
const memberNodes: MemberNode[] = [{ id: 1, name: "Keld", type: "Manager" }];

export const getNodeChildren = async (
  request: FastifyRequest<{ Params: { id: number } }>
) => {
  return memberNodes.filter(
    (node) => node.parentId === Number(request.params.id)
  );
};

export const addNode = async (
  request: FastifyRequest<{ Body: Omit<MemberNode, "id"> }>
) => {
  const id = Math.max(...memberNodes.map((node) => node.id)) + 1;
  const node = { id, ...request.body };
  memberNodes.push(node);
  return node;
};

export const updateNode = async (
  request: FastifyRequest<{
    Params: { id: number };
    Body: { parentId: number };
  }>
) => {
  const node = memberNodes.find((node) => node.id === request.params.id);
  if (!node) {
    throw new Error("Node couldn't be found");
  }
  node.parentId = request.body.parentId;
  return node;
};
