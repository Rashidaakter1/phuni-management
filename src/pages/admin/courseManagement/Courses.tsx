import { Button, Modal, Pagination, Table, } from 'antd';

import { useState } from 'react';
import PHForm from '../../../components/form/PHForm';
import PHSelect from '../../../components/form/PHSelect';
import { useAddFacultiesMutation, useGetAllCoursesQuery } from '../../../redux/features/admin/courseManagementApi';
import { TQueryParams, TResponse } from '../../../type';
import { useGetAllFacultyQuery } from '../../../redux/features/admin/userManangementApi';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

type FacultyInfo = {
    key: string;
    title: string;
    code: string;
};

const Courses = () => {
    // const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
    const [params] = useState<TQueryParams[]>([])
    const [page, setPage] = useState(1)
    const { data: courses, isFetching } = useGetAllCoursesQuery([
        // { name: "limit", value: 2 },
        { name: "page", value: page },
        { name: "sort", value: "id" },
        ...params]);
    const metaData = courses?.meta
    const tableData = courses?.data?.map(({ _id, title, prefix, code }) => ({
        key: _id,
        title,
        code: `${prefix}${code}`,
    }));

    const columns = [
        {
            title: 'Title',
            key: 'title',
            dataIndex: 'title',
        },
        {
            title: 'Code',
            key: 'code',
            dataIndex: 'code',
        },
        {
            title: 'Action',
            key: 'x',
            render: (item: FacultyInfo) => {
                return <AddFacultyModal facultyInfo={item} />;
            },
        },
    ];

    // const onChange: TableProps<FacultyInfo>['onChange'] = (
    //     _pagination,
    //     filters,
    //     _sorter,
    //     extra
    // ) => {
    //     if (extra.action === 'filter') {
    //         const queryParams: TQueryParams[] = [];
    //         setParams(queryParams);
    //     }
    // };

    return (
        <>
            <Table
                loading={isFetching}
                columns={columns}
                dataSource={tableData}
            // onChange={onChange}
            />
            <Pagination current={page} onChange={(value) => setPage(value)} pageSize={metaData?.limit} total={metaData?.total} /></>
    );
};

const AddFacultyModal = ({ facultyInfo }: { facultyInfo: FacultyInfo }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: facultiesData } = useGetAllFacultyQuery(undefined);
    const [addFaculties] = useAddFacultiesMutation();

    const facultiesOption = facultiesData?.data?.map((item) => ({
        value: item._id,
        label: item.name.firstName,
    }));

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        const facultyData = {
            courseId: facultyInfo?.key,
            data,
        };
        const toastId = toast.loading("Please wait a moment...")
        try {
            const res = (await addFaculties(facultyData) as TResponse<any>)
            console.log(res);
            if (res.error) {
                toast.error(res.error.data.message, { id: toastId });
            } else {
                toast.success(res?.data?.message, { id: toastId });
            }

        } catch (error) {
            toast.error("Something went wrong", {
                id: toastId, duration: 2000
            })
        }

    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button onClick={showModal}>Add Faculty</Button>
            <Modal
                title="Basic Modal"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <PHForm onSubmit={handleSubmit}>
                    <PHSelect
                        mode="multiple"
                        options={facultiesOption}
                        name="faculties"
                        label="Faculty"
                    />
                    <Button htmlType="submit">Submit</Button>
                </PHForm>
            </Modal>
        </>
    );
};

export default Courses;