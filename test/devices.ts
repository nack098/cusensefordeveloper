import { randomUUID } from "crypto";

type Device = {
  mac_address: string;
  name: string;
  id: number;
};

const MockDevices: Device[] = [];

for (let i: number = 0; i < 100; i++) {
  MockDevices.push({
    id: i + 1,
    name: `device${i + 1}`,
    mac_address: `${randomUUID()}`,
  });
}

Bun.write("./devices.json", JSON.stringify(MockDevices));
