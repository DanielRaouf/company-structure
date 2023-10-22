import { FastifyRequest } from "fastify";
import { MemberNode } from "shared-types";
import * as memberNodeService from "./memberNodeService";

const TEST_NAME = "name1";

describe("memberNodeService test", () => {
  it("create a member", async () => {
    const addedNode = await memberNodeService.addNode({
      body: {
        name: TEST_NAME,
        type: "Developer",
        parentId: 1,
      },
    } as FastifyRequest<{ Body: Omit<MemberNode, "id"> }>);

    expect(addedNode.id).toBeDefined();
  });

  it("get node children", async () => {
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
});
