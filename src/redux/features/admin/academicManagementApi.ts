import {
  TAcademicDept,
  TAcademicFaculty,
  TAcademicSemester,
} from "../../../type/academicManagement.type";
import { TQueryParams, TResponseRedux } from "../../../type/global";
import { baseApi } from "../../api/api";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAcademicSemester: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        console.log(args);
        if (args) {
          args.forEach((element: TQueryParams) => {
            params.append(element?.name, element?.value);
          });
        }

        return {
          url: "/academic-semester",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
        console.log("first response", response);
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semester/create-academic-semester",
        method: "POST",
        body: data,
      }),
    }),
    getAcademicDept: builder.query({
      query: (args) => {
        return {
          url: "/academic-dept",
          method: "GET",
          params: args,
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicDept[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addAcademicDept: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: "/academic-dept/create-academic-dept",
          method: "POST",
          body: data,
        };
      },
    }),
    getAcademicFaculty: builder.query({
      query: (args) => {
        return {
          url: "/academic-faculty",
          method: "GET",
          params: args,
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicFaculty[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: "/academic-faculty/create-academic-faculty",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAcademicSemesterQuery,
  useAddAcademicSemesterMutation,
  useGetAcademicDeptQuery,
  useAddAcademicDeptMutation,
  useGetAcademicFacultyQuery,
  useAddAcademicFacultyMutation,
} = academicManagementApi;
