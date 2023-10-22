import { FastifyRequest } from "fastify";
import { MemberNode } from "shared-types";
import * as memberNodeService from "./memberNodeService";

const TEST_NAME = "name1";

describe("memberNodeService test", () => {
  it("addNode should create a new member", async () => {
    const addedNode = await memberNodeService.addNode({
      body: {
        name: TEST_NAME,
        type: "Developer",
        parentId: 1,
      },
    } as FastifyRequest<{ Body: Omit<MemberNode, "id"> }>);

    expect(addedNode.id).toBeDefined();
  });

  it("getNodeChildren", async () => {
    const addedNode = await memberNodeService.addNode({
      body: {
        name: TEST_NAME,
        type: "Developer",
        parentId: 1,
      },
    } as FastifyRequest<{ Body: Omit<MemberNode, "id"> }>);

    await memberNodeService.addNode({
      body: {
        name: TEST_NAME,
        type: "Developer",
        parentId: addedNode.id,
      },
    } as FastifyRequest<{ Body: Omit<MemberNode, "id"> }>);

    await memberNodeService.addNode({
      body: {
        name: TEST_NAME,
        type: "Developer",
        parentId: addedNode.id,
      },
    } as FastifyRequest<{ Body: Omit<MemberNode, "id"> }>);

    const childNodes = await memberNodeService.getNodeChildren({
      params: {
        id: addedNode.id,
      },
    } as FastifyRequest<{ Params: { id: number } }>);
    expect(childNodes).toHaveLength(2);
  });

  it("getNodeChildren should return root node if passed zero id", async () => {
    const childNodes = await memberNodeService.getNodeChildren({
      params: {
        id: 0,
      },
    } as FastifyRequest<{ Params: { id: number } }>);
    expect(childNodes).toHaveLength(1);
    expect(childNodes.at(0)?.parentId).toBeUndefined();
  });

  it("updateNode should update the node parentId", async () => {
    const addedNode = await memberNodeService.addNode({
      body: {
        name: TEST_NAME,
        type: "Developer",
        parentId: 1,
      },
    } as FastifyRequest<{ Body: Omit<MemberNode, "id"> }>);

    const addedNodeAsNewParent = await memberNodeService.addNode({
      body: {
        name: TEST_NAME,
        type: "Developer",
        parentId: 1,
      },
    } as FastifyRequest<{ Body: Omit<MemberNode, "id"> }>);
    await memberNodeService.updateNode({
      params: { id: addedNode.id },
      body: {
        parentId: addedNodeAsNewParent.id,
      },
    } as FastifyRequest<{
      Params: { id: number };
      Body: { parentId: number };
    }>);
    const childNodes = await memberNodeService.getNodeChildren({
      params: {
        id: addedNodeAsNewParent.id,
      },
    } as FastifyRequest<{ Params: { id: number } }>);
    expect(childNodes).toHaveLength(1);
    expect(childNodes.at(0)?.id).toEqual(addedNode.id);
  });
});
