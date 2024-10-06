



import { Button, Pagination, Popconfirm, PopconfirmProps, Space, Table, TableColumnsType, TableProps } from "antd";
import { TFaculty, TQueryParams, TResponse, } from "../../../type";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDeleteSingleFacultyMutation, useGetAllFacultyQuery } from "../../../redux/features/admin/userManangementApi";
import { toast } from "sonner";

type DataType = Pick<TFaculty, "_id" | "email" | "id" | 'contactNo'>


const FacultyDataTable = () => {
    const [params, setParams] = useState<TQueryParams[]>([])
    const [page, setPage] = useState(1)
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [id, setId] = useState("")
    const { data: facultyData, isFetching } = useGetAllFacultyQuery([
        // { name: "limit", value: 2 },
        { name: "page", value: page },
        { name: "sort", value: "id" },
        ...params])

    const metaData = facultyData?.meta
    console.log(facultyData)
    const tableData = facultyData?.data?.map(
        ({ id, name, contactNo, email, _id }) => ({
            key: _id,
            _id,
            id,
            name: `${name?.firstName} ${name?.middleName} ${name?.lastName} `,
            contactNo,
            email
        })
    );

    const [deleteFaculty] = useDeleteSingleFacultyMutation()
    const confirm = async (id: string) => {
        console.log(id)


        const toastId = toast.loading("Please wait a moment...")
        try {
            const res = (await deleteFaculty(id) as TResponse<any>)
            console.log(res);
            if (res.error) {
                toast.error(res.error.data.message, { id: toastId });
            } else {
                toast.success(res?.data.message, { id: toastId });
            }

        } catch (error) {
            toast.error("Something went wrong", {
                id: toastId, duration: 2000
            })
        }
    };

    const cancel: PopconfirmProps['onCancel'] = (e) => {
        console.log(e);

    };
    const showLoading = (id: string) => {
        setOpen(true);
        setLoading(true);
        setId(id);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };
    const columns: TableColumnsType<DataType> = [
        {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
        },

        {
            title: 'Roll No.',
            key: 'id',
            dataIndex: 'id',
        },
        {
            title: 'Email',
            key: 'email',
            dataIndex: 'email',
        },
        {
            title: 'Contact No.',
            key: 'contactNo',
            dataIndex: 'contactNo',
        },
        {
            title: 'Action',
            key: 'x',
            render: (item) => {

                return (
                    <Space>
                        <Link to={`/admin/faculty-data/${item.key}`}>
                            <Button>Details</Button>
                        </Link>


                        <Link to={`/admin/edit-faculty/${item.key}`}> <Button >Update</Button></Link>
                        <Button onClick={() => showLoading(item.key)}>Block</Button>
                        <Popconfirm
                            title="Delete the student"
                            description="Are you sure to delete this student?"
                            onConfirm={() => confirm(item.key)}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button >Delete</Button>
                        </Popconfirm>
                    </Space>


                );
            },
            width: '1%',
        },
    ];
    const onChange: TableProps<DataType>['onChange'] = (_pagination, filters, _sorter, extra) => {
        console.log('params', filters, extra);
        const queryParams: TQueryParams[] = []
        if (extra.action === "filter") {
            filters.name?.map(item => {
                queryParams.push({ name: "name", value: item as string })
                setParams(queryParams)
            });
            filters.year?.map(item => {
                queryParams.push({ name: "year", value: item as string })
                setParams(queryParams)
            });

        }
    };
    return (
        <div>

            <Table<DataType>
                loading={isFetching}
                columns={columns}
                dataSource={tableData}
                onChange={onChange}
                showSorterTooltip={{ target: 'sorter-icon' }}
            />

            <Pagination current={page} onChange={(value) => setPage(value)} pageSize={metaData?.limit} total={metaData?.total} />
        </div>
    )
}

export default FacultyDataTable