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
      providesTags: ["students"],
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
    deleteSingleStudents: builder.mutation({
      query: (id) => {
        return {
          url: `/students/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["students"],
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
      invalidatesTags: ["students"],
    }),
    updateSingleStudent: builder.mutation({
      query: (args) => {
        return {
          url: `/students/${args.id}`,
          method: "PATCH",
          body: args.data,
        };
      },
      invalidatesTags: ["students"],
      transformResponse: (response: TResponseRedux<any>) => {
        console.log("first response", response);
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    // this is for Fcaulty purposes

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
      providesTags: ["faculty"],
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
      invalidatesTags: ["faculty"],
    }),
    updateSingleFaculty: builder.mutation({
      query: (args) => {
        return {
          url: `/faculty/${args.id}`,
          method: "PATCH",
          body: args.data,
        };
      },
      invalidatesTags: ["faculty"],
      transformResponse: (response: TResponseRedux<any>) => {
        console.log("first response", response);
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    deleteSingleFaculty: builder.mutation({
      query: (id) => {
        return {
          url: `/faculty/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["faculty"],
      transformResponse: (response: TResponseRedux<any>) => {
        console.log("first response", response);
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    // this is for the admin
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
      providesTags: ["admin"],
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
      invalidatesTags: ["admin"],
    }),
    updateSingleAdmin: builder.mutation({
      query: (args) => {
        return {
          url: `/admin/${args.id}`,
          method: "PATCH",
          body: args.data,
        };
      },
      invalidatesTags: ["admin"],
      transformResponse: (response: TResponseRedux<any>) => {
        console.log("first response", response);
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    deleteSingleAdmin: builder.mutation({
      query: (id) => {
        return {
          url: `/admin/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["admin"],
      transformResponse: (response: TResponseRedux<any>) => {
        console.log("first response", response);
        return {
          data: response.data,
          meta: response.meta,
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
  useDeleteSingleStudentsMutation,
  useDeleteSingleAdminMutation,
  useDeleteSingleFacultyMutation,
  useUpdateSingleAdminMutation,
  useUpdateSingleFacultyMutation,
  useUpdateSingleStudentMutation,
} = userManagementApi;
