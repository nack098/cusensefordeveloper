"use client";

import MockDevices from "@/../test/devices.json";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useReducer, useState } from "react";
import Loading from "@/../public/loading.gif";
import Image from "next/image";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { z } from "zod";
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

type Device = {
  mac_address: string;
  name: string;
  id: number;
};

type InputDevice = {
  mac_address: string;
  name: string;
  topic: string;
  project: string;
  abstract: string;
  isoutdoor: boolean;
  lat: number;
  lon: number;
  sta_addr: string;
  remark: string;
  org: string;
  org_per: string;
  org_email: string;
  org_tel: string;
  org_addr: string;
  publish: boolean;
};

type Props = {
  data: Device[];
};

const Schema = z.custom<InputDevice>();

const project_id = window.location.href.split("/").pop();

const getData = async (
  dataState: React.Dispatch<React.SetStateAction<Device[]>>,
) => {
  dataState(MockDevices);
};

const Devices: React.FC<Props> = ({ data }) => {
  const path = usePathname();
  const [page, changePage] = useState<number>(1);

  const split: Device[][] = [];
  let row = [];

  for (let i: number = 0; i < data.length; i++) {
    row.push(data[i]);
    if (row.length === 25) {
      split.push(row);
      row = [];
      continue;
    }
    if (row.length > 0 && i + 1 === data.length) {
      split.push(row);
      continue;
    }
  }

  return (
    <div className="mx-[30px] mt-[6px]">
      <div className="flex flex-row justify-between px-[10px]">
        <div className="w-[5%]">
          <p>#</p>
        </div>
        <div className="w-[55%] text-center">
          <p>Device Name</p>
        </div>
        <div className="w-[40%] text-end">
          <p>MAC Address</p>
        </div>
      </div>
      <hr className="border-black mb-[6px]" />
      {split.length > 0 ? (
        <>
          {split[page - 1].map((value, i) => (
            <div
              key={`device-${i}`}
              className="flex flex-row justify-between bg-white px-[10px] "
            >
              <div className="w-[5%]">
                <p>{i + 1}.</p>
              </div>
              <div className="w-[55%] text-center">
                <Link
                  href={`${path}/${value.mac_address}`}
                  className="text-blue-500 hover:underline"
                >
                  {value.name}
                </Link>
              </div>
              <div className="w-[40%] text-end">
                <p>{value.mac_address}</p>
              </div>
            </div>
          ))}
          <div className="justify-center self-center text-black mt-[12px] flex flex-row">
            <button
              className="mr-[6px]"
              onClick={() => {
                if (page - 1 === 0) {
                  changePage(split.length);
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
              max={split.length}
              value={page}
              onChange={(e) => {
                if (
                  e.currentTarget.value.length === 0 ||
                  parseInt(e.currentTarget.value) === 0 ||
                  parseInt(e.currentTarget.value) > split.length
                )
                  return;
                changePage(parseInt(e.currentTarget.value));
              }}
              className="text-center text-[12px] w-[18px] bg-[#F5F5F5] rounded-md"
            />
            <p className="text-[12px] mx-[6px]">from</p>
            <p className="text-[12px] ">{split.length}</p>
            <button
              className="ml-[6px]"
              onClick={() => {
                if (page === split.length) {
                  changePage(1);
                  return;
                }
                changePage(page + 1);
              }}
            >
              <FaAngleRight />
            </button>
          </div>
        </>
      ) : (
        <p>There are no device in this project</p>
      )}
    </div>
  );
};

const reducer = (
  state: InputDevice,
  action: { type: string; value: string },
) => {
  switch (action.type) {
    case "mac_address":
      return { ...state, mac_address: action.value };
    case "name":
      return { ...state, name: action.value };
    case "topic":
      return { ...state, topic: action.value };
    case "project":
      return { ...state, project: action.value };
    case "abstract":
      return { ...state, abstract: action.value };
    case "isoutdoor":
      return { ...state, isoutdoor: !state.isoutdoor };
    case "lat":
      return { ...state, lat: parseInt(action.value) };
    case "lon":
      return { ...state, lon: parseInt(action.value) };
    case "sta_addr":
      return { ...state, sta_addr: action.value };
    case "remark":
      return { ...state, remark: action.value };
    case "org":
      return { ...state, org: action.value };
    case "org_per":
      return { ...state, org_per: action.value };
    case "org_email":
      return { ...state, org_email: action.value };
    case "org_tel":
      return { ...state, org_tel: action.value };
    case "org_addr":
      return { ...state, org_addr: action.value };
    case "publish":
      return { ...state, publish: !state.publish };
    default:
      return state;
  }
};

const initialInput: InputDevice = {
  mac_address: "",
  name: "",
  topic: "",
  project: "",
  abstract: "",
  isoutdoor: false,
  lat: 0,
  lon: 0,
  sta_addr: "",
  remark: "",
  org: "",
  org_per: "",
  org_email: "",
  org_tel: "",
  org_addr: "",
  publish: false,
};

const Page: React.FC = () => {
  const [data, updateData] = useState<Device[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, loadingState] = useState(true);
  const [input, inputState] = useReducer(reducer, initialInput as InputDevice);
  const toast = useToast();

  useEffect(() => {
    const promise = getData(updateData).then(() => {
      loadingState(false);
    });
    return () => {
      Promise.reject(promise);
    };
  }, []);

  const Add = async () => {
    if (
      !Schema.safeParse(input).success ||
      input.mac_address.length === 0 ||
      input.name.length === 0 ||
      input.org_email.length === 0 ||
      input.topic.length === 0
    ) {
      toast({
        status: "error",
        title: "Error!",
        description: "Please insert all input",
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
      }, 2000),
    );
    toast.promise(test, {
      success: {
        title: "Success!",
        description: "New device has been created.",
      },
      error: {
        title: "Error!",
        description: "There is an error please try again.",
      },
      loading: {
        title: "Adding Device...",
        description: "Adding new device to your project",
      },
    });
    await test;
    await getData(updateData);
    loadingState(false);
  };

  return (
    <div className="w-full h-full">
      {loading ? (
        <div className="w-full h-full grid">
          <Image
            src={Loading}
            alt="loading"
            width={102}
            className="self-center justify-self-center"
          />
        </div>
      ) : (
        <>
          <Modal
            isOpen={isOpen}
            onClose={onClose}
            motionPreset="slideInTop"
            size={"3xl"}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add Device</ModalHeader>
              <ModalCloseButton />
              <ModalBody marginX={65}>
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold text-xs text-black align-middle">
                      Device Name
                    </p>
                    <input
                      value={input.name}
                      placeholder="Device Name"
                      className="bg-zinc-50 border border-sky-500 rounded-md px-1 my-3"
                      onChange={(e) => {
                        inputState({
                          type: "name",
                          value: e.currentTarget.value,
                        });
                      }}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-xs text-black">
                      MAC Address
                    </p>
                    <input
                      value={input.mac_address}
                      placeholder="MAC Address"
                      className="bg-zinc-50 border border-sky-500 rounded-md px-1 my-3"
                      onChange={(e) => {
                        inputState({
                          type: "mac_address",
                          value: e.currentTarget.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold text-xs text-black">Topic</p>
                    <input
                      value={input.topic}
                      placeholder="Topic"
                      className="bg-zinc-50 border border-sky-500 rounded-md px-1 my-3"
                      onChange={(e) => {
                        inputState({
                          type: "topic",
                          value: e.currentTarget.value,
                        });
                      }}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-xs text-black">Project</p>
                    <input
                      value={input.project}
                      placeholder="Project"
                      className="bg-zinc-50 border border-sky-500 rounded-md px-1 my-3"
                      onChange={(e) => {
                        inputState({
                          type: "project",
                          value: e.currentTarget.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold text-xs text-black">Abstract</p>
                    <input
                      value={input.abstract}
                      placeholder="Abstract"
                      className="bg-zinc-50 border border-sky-500 rounded-md px-1 my-3"
                      onChange={(e) => {
                        inputState({
                          type: "abstract",
                          value: e.currentTarget.value,
                        });
                      }}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-xs text-black">Remark</p>
                    <input
                      value={input.remark}
                      placeholder="Remark(Optional)"
                      className="bg-zinc-50 border border-sky-500 rounded-md px-1 my-3"
                      onChange={(e) => {
                        inputState({
                          type: "remark",
                          value: e.currentTarget.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <p className="font-semibold text-xs text-black">Out Door</p>
                <input
                  checked={input.isoutdoor}
                  placeholder="OutDoor"
                  type="checkbox"
                  className="bg-zinc-50 border border-sky-500 rounded-md px-1 my-3"
                  onChange={(e) => {
                    inputState({
                      type: "isoutdoor",
                      value: e.currentTarget.value,
                    });
                  }}
                />
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold text-xs text-black">Latitude</p>
                    <input
                      value={input.lat}
                      placeholder="Latitude"
                      type="number"
                      className="bg-zinc-50 border border-sky-500 rounded-md px-1 my-3"
                      onChange={(e) => {
                        inputState({
                          type: "lat",
                          value: e.currentTarget.value,
                        });
                      }}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-xs text-black">
                      Longitude
                    </p>
                    <input
                      value={input.lon}
                      placeholder="Longitude"
                      type="number"
                      className="bg-zinc-50 border border-sky-500 rounded-md px-1 my-3"
                      onChange={(e) => {
                        inputState({
                          type: "lon",
                          value: e.currentTarget.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <p className="font-semibold text-xs text-black">
                  Station Address
                </p>
                <input
                  value={input.sta_addr}
                  placeholder="Station Address"
                  className="bg-zinc-50 border border-sky-500 rounded-md px-1 my-3"
                  onChange={(e) => {
                    inputState({
                      type: "sta_addr",
                      value: e.currentTarget.value,
                    });
                  }}
                />
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold text-xs text-black">
                      Organization
                    </p>
                    <input
                      value={input.org}
                      placeholder="Organization(Optional)"
                      className="bg-zinc-50 border border-sky-500 rounded-md px-1 my-3"
                      onChange={(e) => {
                        inputState({
                          type: "org",
                          value: e.currentTarget.value,
                        });
                      }}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-xs text-black">
                      Organization Person
                    </p>
                    <input
                      value={input.org_per}
                      placeholder="Organization Person(Optional)"
                      className="bg-zinc-50 border border-sky-500 rounded-md px-1 my-3"
                      onChange={(e) => {
                        inputState({
                          type: "org_per",
                          value: e.currentTarget.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold text-xs text-black">
                      Organiation Tel.
                    </p>
                    <input
                      value={input.org_tel}
                      placeholder="Organization Tel. (Optional)"
                      className="bg-zinc-50 border border-sky-500 rounded-md px-1 my-3"
                      onChange={(e) => {
                        inputState({
                          type: "org_tel",
                          value: e.currentTarget.value,
                        });
                      }}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-xs text-black">
                      Organization Address
                    </p>
                    <input
                      value={input.org_addr}
                      placeholder="Organization Address (Optional)"
                      className="bg-zinc-50 border border-sky-500 rounded-md px-1 my-3"
                      onChange={(e) => {
                        inputState({
                          type: "org_addr",
                          value: e.currentTarget.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <p className="font-semibold text-xs text-black">
                  Organization Address
                </p>
                <input
                  value={input.org_email}
                  placeholder="Organization Email"
                  className="bg-zinc-50 border border-sky-500 rounded-md px-1 my-3"
                  onChange={(e) => {
                    inputState({
                      type: "org_email",
                      value: e.currentTarget.value,
                    });
                  }}
                />
                <p className="font-semibold text-xs text-black">Publish</p>
                <input
                  checked={input.publish}
                  placeholder="Publish"
                  onChange={(e) => {
                    inputState({
                      type: "publish",
                      value: e.currentTarget.value,
                    });
                  }}
                  type="checkbox"
                  className="bg-zinc-50 border border-sky-500 rounded-md px-1 my-3"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="black" onClick={Add}>
                  Add
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Devices data={data} />
          <div className="flex w-full justify-end">
            <button
              onClick={onOpen}
              className="bg-blue-400 rounded-lg py-[3px] px-[5px] hover:bg-red-300 duration-300 mr-[25px]"
            >
              Add Device
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
