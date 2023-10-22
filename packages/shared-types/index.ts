export type MemberNode = Manager | Developer;

type NodeCommon = {
  id: number;
  name: string;
  parentId?: number;
};

type Manager = NodeCommon & {
  type: "Manager";
  departmentName?: string;
};

type Developer = NodeCommon & {
  type: "Developer";
  programingLanguage?: string;
};
