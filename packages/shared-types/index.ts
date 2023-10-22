export type MemberNode = Manager | Developer;

type NodeCommon = {
  id: number;
  name: string;
  parentId?: number;
};

export type Manager = NodeCommon & {
  type: "Manager";
  departmentName?: string;
};

export type Developer = NodeCommon & {
  type: "Developer";
  programingLanguage?: string;
};
