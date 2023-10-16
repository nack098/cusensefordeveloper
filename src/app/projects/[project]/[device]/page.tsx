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
  publish: number;
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
    publish: 1,
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
    <div className="w-full h-full grid">
      {loading ? (
        <Image
          src={Loading}
          alt="loading"
          width={102}
          className="self-center justify-self-center"
        />
      ) : device_data ? (
        <div className="bg-white w-full h-96 justify-self-center self-center grid grid-cols-3 grid-rows-1">
          <div>
            <p>
              <b>ID:</b>
              {device_data.id}
            </p>
            <p>
              <b>Name:</b>
              {device_data.name}
            </p>
            <div>
              <p className="font-bold">Station Address:</p>
              <p>{device_data.sta_addr}</p>
            </div>
            <p>
              <b>Remark:</b>
              {device_data.remark}
            </p>
          </div>
          <div className="col-span-2 justify-self-end text-end">
            <div>
              <p className="font-bold">MAC address:</p>
              <p>{device_data.mac_address}</p>
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
