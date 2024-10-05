import { TAdmin, TFaculty, TStudent } from "../../../type";
import { TQueryParams, TResponseRedux } from "../../../type/global";
import { baseApi } from "../../api/api";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudents: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        console.log(args);
        if (args) {
          args.forEach((element: TQueryParams) => {
            params.append(element?.name, element?.value);
          });
        }

        return {
          url: "/students",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        console.log("first response", response);
        return {
          data: response.data,
          meta: response.meta,
          message: response.message,
        };
      },
    }),
    getSingleStudents: builder.query({
      query: (id) => {
        return {
          url: `/students/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        console.log("first response", response);
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    addStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
    }),
    getAllFaculty: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        console.log(args);
        if (args) {
          args.forEach((element: TQueryParams) => {
            params.append(element?.name, element?.value);
          });
        }
        return {
          url: "/faculty",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TFaculty[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    getSingleFaculty: builder.query({
      query: (id) => {
        return {
          url: `/faculty/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TFaculty[]>) => {
        console.log("first response", response);
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addFaculty: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: "/users/create-faculty",
          method: "POST",
          body: data,
        };
      },
    }),
    getAllAdmin: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((element: TQueryParams) => {
            params.append(element?.name, element?.value);
          });
        }
        return {
          url: "/admin",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TAdmin[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    getSingleAdmin: builder.query({
      query: (id) => {
        return {
          url: `/admin/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TAdmin[]>) => {
        console.log("first response", response);
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addAdmin: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: "/users/create-admin",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useAddAdminMutation,
  useGetAllAdminQuery,
  useAddFacultyMutation,
  useGetAllFacultyQuery,
  useAddStudentMutation,
  useGetAllStudentsQuery,
  useGetSingleStudentsQuery,
  useGetSingleAdminQuery,
  useGetSingleFacultyQuery,
} = userManagementApi;
