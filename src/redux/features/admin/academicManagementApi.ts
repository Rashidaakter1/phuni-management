import { baseApi } from "../../api/api";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAcademicSemester: builder.query({
      query: () => ({
        url: "/academic-semester",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAcademicSemesterQuery } = academicManagementApi;
