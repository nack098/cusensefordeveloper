"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Loading from "@/../public/loading.gif";

type Device = {
  mac_address: string;
  name: string;
  id: number;
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
  date_create: string;
  date_update: string;
};

const mac_address = window.location.href.split("/").pop();

const getDeviceData = async (): Promise<Device> => {
  return {
    mac_address: mac_address ? mac_address : "yo",
    name: "device1",
    id: 1,
    topic: "/test",
    project: "TESTING",
    abstract: "THIS IS JUST A TEST",
    isoutdoor: true,
    lat: 20,
    lon: 10,
    sta_addr: "120 asdkjlad asdasd asda asdada",
    remark: "OK JUB",
    org: "TEST",
    org_per: "nack",
    org_email: "nack098askdlad@adjkald.com",
    org_tel: "091-241-1241",
    org_addr: "123 asdakjdl 213ajsdklasdj asjdkla",
    publish: true,
    date_create: "22 MO 1241",
    date_update: "44 mD 1515",
  };
};

const DeviceState: React.FC = () => {
  const [device_data, changeDeviceData] = useState<Device | null>(null);
  const [loading, loadingState] = useState(true);

  useEffect(() => {
    const promise = getDeviceData().then((data) => {
      changeDeviceData(data);
      loadingState(false);
    });
    return () => {
      Promise.reject(promise);
    };
  }, []);

  return (
    <div className={`w-full h-full grid`}>
      {loading ? (
        <Image
          src={Loading}
          alt="loading"
          width={102}
          className="self-center justify-self-center"
        />
      ) : device_data ? (
        <div className="bg-white w-full py-5 px-10 justify-self-center self-center">
          <div className="flex justify-between">
            <div className="w-[50%]">
              <p>
                <b>ID:</b>
                {device_data.id}
              </p>
              <p>
                <b>Name:</b>
                {device_data.name}
              </p>
            </div>
            <div className="w-[50%]">
              <p className="font-bold">MAC address:</p>
              <p>{device_data.mac_address}</p>
            </div>
          </div>
          <div>
            <p className="font-bold">Station Address:</p>
            <p>{device_data.sta_addr}</p>
          </div>
          <div>
            <p className="font-bold">Abstract:</p>
            <p>{device_data.abstract}</p>
          </div>
          <div>
            <p className="font-bold">Remark:</p>
            <p>{device_data.remark}</p>
          </div>
          <div className="flex justify-between">
            <p className="w-[50%]">
              <b>Organization:</b>
              {device_data.org}
            </p>
            <p className="w-[50%]">
              <b>Organization Tel.:</b>
              {device_data.org_tel}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="w-[50%]">
              <b>Organization Person:</b>
              {device_data.org_per}
            </p>
            <p className="w-[50%]">
              <b>Organization Email:</b>
              {device_data.org_email}
            </p>
          </div>
          <div className="flex justify-between">
            <div className="w-[50%]">
              <p className="font-bold">Organization Address:</p>
              <p>{device_data.org_addr}</p>
            </div>
            <div className="w-[50%]">
              <p className="inline-block">
                <b>Publish:</b>
              </p>
              <input type="checkbox" checked={device_data.publish} readOnly />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="w-[50%]">
              <p className="font-bold">Date Created:</p>
              <p>{device_data.date_create}</p>
            </div>
            <div className="w-[50%]">
              <p className="font-bold">Date Update:</p>
              <p>{device_data.date_update}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>There is no data of this device.</p>
      )}
    </div>
  );
};

export default DeviceState;
