import { render, screen } from "@testing-library/react";
import { MemberNodeComponent } from "./MemberNode";
const TEST_NAME = "name 1";
test("renders learn react link", () => {
  render(
    <MemberNodeComponent
      node={{
        id: 1,
        name: TEST_NAME,
        type: "Manager",
        departmentName: "IT",
        height: 0,
      }}
    />
  );
  const memberId = screen.getByText(/Member ID: 1/i);
  const departmentManaged = screen.getByText(/Department Managed: IT/i);
  expect(memberId).toBeInTheDocument();
  expect(departmentManaged).toBeInTheDocument();
});
