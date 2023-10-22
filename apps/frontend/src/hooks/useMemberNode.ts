import { useCallback, useState } from "react";
import { MemberNode } from "shared-types";

export const useMemberNode = (id: number) => {
  const [children, setChildren] = useState<MemberNode[]>([]);

  const addNode = useCallback(async (node: Omit<MemberNode, "id">) => {}, []);

  return { children, addNode };
};
