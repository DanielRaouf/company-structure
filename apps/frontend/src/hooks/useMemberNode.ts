import { useCallback, useEffect, useState } from "react";
import { MemberNode } from "shared-types";

const baseUrl = process.env.BASE_URL ?? "http://localhost:8080";

export const useMemberNode = (id: number) => {
  const [children, setChildren] = useState<MemberNode[]>([]);

  const addNode = useCallback(async (node: Omit<MemberNode, "id">) => {}, []);

  useEffect(() => {
    const fetchChildren = async () => {
      const res = await fetch(`${baseUrl}/children/${id}`);
      const nodes: MemberNode[] = await res.json();
      setChildren(nodes);
    };
    fetchChildren();
  }, [id, setChildren]);

  return { children, addNode };
};
