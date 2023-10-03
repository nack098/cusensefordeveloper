import { randomUUID } from "crypto";

type Project = {
  id: string;
  name: string;
};

const MockProjects: Project[] = [];

for (let i: number = 0; i < 100; i++) {
  MockProjects.push({ id: `${randomUUID()}`, name: `test${i + 1}` });
}

const MockData = {
  MockProjects,
};

export default MockData;
