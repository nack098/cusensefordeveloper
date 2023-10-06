"use client";

import { useSession } from "next-auth/react";
import MockProjects from "../../../test/projects.json";
import {
  FaArrowDownAZ,
  FaAngleLeft,
  FaAngleRight,
  FaRegCalendar,
  FaArrowUpAZ,
} from "react-icons/fa6";
import { useEffect, useState } from "react";
import Loading from "@/../public/loading.gif";
import Image from "next/image";
import Link from "next/link";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

type Project = {
  id: string;
  name: string;
  update: string;
};

const getProjects = async (
  username: string,
  updateData: React.Dispatch<React.SetStateAction<Project[]>>,
  loadingState: React.Dispatch<React.SetStateAction<boolean>>
) => {
  //todo get data from server
  updateData(MockProjects as Project[]);
  const timeout = new Promise((resolve, reject) =>
    setTimeout(() => {
      console.log("Finished");
      resolve(200);
    }, 2000)
  );
  await timeout;
  loadingState(false);
};

const splitList = (projects: Project[]) => {
  let split = [];
  let row = [];
  for (let count = 0; count < projects.length; count++) {
    if (count % 5 === 0 && row.length > 0) {
      split.push(row);
      row = [];
    }
    row.push(projects[count]);
  }
  split.push(row);
  return split;
};

const ProjectList: React.FC<{ projects: Project[] }> = ({ projects }) => {
  const [page, changePage] = useState<number>(1);

  const list = splitList(projects);

  return (
    <>
      {projects.length > 0 ? (
        <div className="flex flex-col drop-shadow-lg">
          {list[page - 1].map((project, count) => {
            return (
              <div key={`projects - ${count}`}>
                <div className="flex flex-row justify-between bg-[#F5F5F5] p-[18px]">
                  <div>
                    <Link
                      href={`projects/${project.id}`}
                      className="text-sky-600 font-bold text-[18px] hover:underline hover:underline-offset-2"
                    >
                      {project.name}
                    </Link>
                    <p className="text-[12px]">{project.id}</p>
                  </div>
                  <div className="text-right align-middle">
                    <p>
                      {new Date(parseInt(project.update)).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <hr className="w-full bg-[#B4B4B4]" />
              </div>
            );
          })}
          <div className="justify-center self-center text-black mt-[12px] flex flex-row">
            <button
              className="mr-[6px]"
              onClick={() => {
                if (page - 1 === 0) {
                  changePage(list.length);
                  return;
                }
                changePage(page - 1);
              }}
            >
              <FaAngleLeft />
            </button>
            <input
              type="number"
              min="1"
              max={list.length}
              value={page}
              onChange={(e) => {
                if (
                  parseInt(e.currentTarget.value) === 0 ||
                  parseInt(e.currentTarget.value) > list.length
                )
                  return;
                changePage(parseInt(e.currentTarget.value));
              }}
              className="text-center text-[12px] w-[18px] bg-[#F5F5F5] rounded-md"
            />
            <p className="text-[12px] mx-[6px]">from</p>
            <p className="text-[12px] ">{list.length}</p>
            <button
              className="ml-[6px]"
              onClick={() => {
                if (page === list.length) {
                  changePage(1);
                  return;
                }
                changePage(page + 1);
              }}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
      ) : (
        <p>There are no projects</p>
      )}
    </>
  );
};

const Projects: React.FC = () => {
  const { data: session } = useSession();
  const [data, updateData] = useState<Project[]>([]);
  const [loading, loadingState] = useState<boolean>(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [projectName, changeProjectName] = useState<string>("");
  const [sortBy, changeSortBy] = useState<string>("name");
  const toast = useToast();

  useEffect(() => {
    const data = getProjects(
      session?.user?.name || "",
      updateData,
      loadingState
    );
    return () => {
      Promise.reject(data);
    };
  }, [session]);

  const Add = async () => {
    if (projectName.length === 0) {
      toast({
        status: "error",
        title: "Error!",
        description: "Please insert project name",
      });
      return;
    }
    onClose();
    loadingState(true);
    // todo update data
    const test = new Promise((resolve, reject) =>
      setTimeout(() => {
        console.log("Finised Update");
        resolve(200);
      }, 2000)
    );
    toast.promise(test, {
      success: {
        title: "Success!",
        description: "New project has been created.",
      },
      error: {
        title: "Error!",
        description: "There is an error please try again.",
      },
      loading: {
        title: "Adding Project...",
        description: "Adding new project to your directory",
      },
    });
    await test;
    getProjects(session?.user?.name || "", updateData, loadingState);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInTop">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p className="font-semibold text-xl text-black">Project Name</p>
            <input
              value={projectName}
              placeholder="Project Name"
              className="bg-zinc-50 border border-sky-500 rounded-md px-1 my-3"
              onChange={(e) => {
                changeProjectName(e.currentTarget.value);
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={Add}>Add</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div className="my-[45px] xl:my-[75px] mx-[160px] xl:mx-[505px]">
        <p className="text-[24px]">Welcome back!</p>
        <p className="font-bold text-[36px]">
          {session?.user?.name?.toUpperCase()}
        </p>
      </div>
      <div className="flex flex-col xl:flex-row self-center 2xl:self-auto 2xl:mx-[390px] justify-between">
        <div>
          <div className="flex flex-row justify-between">
            <div>
              <p className="font-bold text-[16px]">Projects list</p>
              <hr className="h-[1px] w-[298px] border-black" />
            </div>
            <button
              onClick={onOpen}
              className="text-[12px] font-semibold bg-sky-400 hover:bg-red-400 duration-300 text-zinc-800 rounded-l-xl py-[2px] px-[10px]"
            >
              New Projects
            </button>
          </div>
          <div
            className={`${
              loading ? "grid" : "flex"
            } flex-col w-[747px] h-[481px]`}
          >
            {loading ? (
              <Image
                src={Loading}
                alt="loading"
                width={102}
                className="self-center translate-x-[-55px] xl:translate-x-[55px] justify-self-center"
              />
            ) : (
              <ProjectList
                projects={data.sort((a, b) => {
                  if (sortBy === "date") {
                    return parseInt(a.update) - parseInt(b.update);
                  } else if (sortBy === "dateReverse") {
                    return parseInt(b.update) - parseInt(a.update);
                  } else if (sortBy === "name") {
                    return a.name < b.name ? -1 : 1;
                  } else {
                    return b.name < a.name ? -1 : 1;
                  }
                })}
              />
            )}
          </div>
        </div>
        <div>
          <p className="font-bold text-[16px] xl:translate-x-[158px]">
            Sort by
          </p>
          <hr className="h-[1px] mb-[12px] xl:w-[215px] w-[298px] border-black" />
          <div>
            <button
              className="self-center mb-[12px] xl:translate-x-[158px] block"
              onClick={() => {
                if (sortBy === "name") {
                  changeSortBy("nameReverse");
                  return;
                }
                changeSortBy("name");
              }}
            >
              {sortBy === "nameReverse" ? (
                <FaArrowUpAZ className="inline-block" />
              ) : (
                <FaArrowDownAZ className="inline-block" />
              )}
              <p className="inline-block text-[12px] ml-[5px]">Name</p>
            </button>
            <button
              className="self-center mb-[12px] xl:translate-x-[164.5px] block"
              onClick={() => {
                if (sortBy === "date") {
                  changeSortBy("dateReverse");
                }
                changeSortBy("date");
              }}
            >
              <FaRegCalendar className="inline-block" />
              <p className="inline-block text-[12px] ml-[5px]">Date</p>
            </button>
          </div>
          <hr className="h-[1px] mb-[12px] xl:w-[215px] w-[298px] border-black" />
        </div>
      </div>
    </>
  );
};

export default Projects;
