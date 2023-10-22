import { useCallback, useEffect, useState } from "react";
import { MemberNode } from "shared-types";

const baseUrl = process.env.BASE_URL ?? "http://localhost:8080";

export const useMemberNode = (id: number) => {
  const [children, setChildren] = useState<MemberNode[]>([]);

  const addNode = useCallback(async (node: Omit<MemberNode, "id">) => {
    try {
      const res = await fetch(`${baseUrl}/node`, {
        method: "POST",
        body: JSON.stringify(node),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const addedNode: MemberNode = await res.json();
      setChildren((old) => [...old, addedNode]);
    } catch (e) {
      //TODO: add error reporting
    }
  }, []);

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const res = await fetch(`${baseUrl}/children/${id}`);
        const nodes: MemberNode[] = await res.json();
        setChildren(nodes);
      } catch (e) {
        //TODO: add error reporting
      }
    };
    fetchChildren();
  }, [id, setChildren]);

  return { children, addNode };
};
