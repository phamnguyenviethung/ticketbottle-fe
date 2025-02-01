import axiosClient from "./axiosClient";

export interface GetEventsOptions {
  page?: number;
  perPage?: number;
  includeInfo?: true;
}

const eventAPI = {
  getEvents: async (options?: GetEventsOptions) => {
    return await axiosClient.get("/event", { params: options });
  },
};

export default eventAPI;
