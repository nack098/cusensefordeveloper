import { randomUUID } from "crypto";

type Project = {
  id: string;
  name: string;
  update: string;
};

const MockProjects: Project[] = [];

for (let i: number = 0; i < 100; i++) {
  MockProjects.push({
    id: `${randomUUID()}`,
    name: `test${i + 1}`,
    update: Date.now().toString(),
  });
}

Bun.write("./projects.json", JSON.stringify(MockProjects));
