"use client";

import { useSession } from "next-auth/react";
import MockProjects from "../../../test/projects.json";
import { useState } from "react";

type Project = {
  id: string;
  name: string;
};

const getProjects = async (username: string) => {
  //todo get data from server
  return MockProjects as Project[];
};

const Projects: React.FC = () => {
  const { data: session } = useSession();
  const [data, updateData] = useState<Project[]>([]);
  getProjects(session?.user?.name || "").then((data) => updateData(data));
  return <div></div>;
};

export default Projects;
