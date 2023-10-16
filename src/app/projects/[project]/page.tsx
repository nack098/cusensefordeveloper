"use client";

import MockDevices from "@/../test/devices.json";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/../public/loading.gif";
import Image from "next/image";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
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

type Props = {
  data: Device[];
};

const project_id = window.location.href.split("/").pop();

const getData = async (
  dataState: React.Dispatch<React.SetStateAction<Device[]>>
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
        <div className="w-[4%]">
          <p>#</p>
        </div>
        <div className="w-[56%] text-center">
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
              <div className="w-[4%]">
                <p>{i + 1}.</p>
              </div>
              <div className="w-[56%] text-center">
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

const Page: React.FC = () => {
  const [data, updateData] = useState<Device[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, loadingState] = useState(true);
  const [deviceName, changeDeviceName] = useState("");
  const [macAddress, changeMacAddress] = useState("");
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
    if (deviceName.length === 0 && macAddress.length === 0) {
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
      }, 2000)
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
          <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInTop">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add Project</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <p className="font-semibold text-xl text-black">Project Name</p>
                <input
                  value={deviceName}
                  placeholder="Project Name"
                  className="bg-zinc-50 border border-sky-500 rounded-md px-1 my-3"
                  onChange={(e) => {
                    changeDeviceName(e.currentTarget.value);
                  }}
                />
                <p className="font-semibold text-xl text-black">Mac Address</p>
                <input
                  value={macAddress}
                  placeholder="Project Name"
                  className="bg-zinc-50 border border-sky-500 rounded-md px-1 my-3"
                  onChange={(e) => {
                    changeMacAddress(e.currentTarget.value);
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button onClick={Add}>Add</Button>
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
