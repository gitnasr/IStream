import { AkoamQ } from ".";
import { E } from "@/types";

const schedule = {
 StartByAkoam: async (data: E.StartPayload, jName: string) => {
    const job = await AkoamQ.add(jName, data, {jobId: jName,attempts:3});
    return job;
 },
};

export default schedule;
