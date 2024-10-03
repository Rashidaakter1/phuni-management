import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetAcademicSemesterQuery } from "../../../redux/features/admin/academicManagementApi"
import { TAcademicSemester } from "../../../type/academicManagement.type";
import { useState } from "react";
import { TQueryParams } from "../../../type/global";



type DataType = Pick<TAcademicSemester, "name" | "year" | "startMonth" | "endMonth">


const AcademicSemester = () => {
    const [params, setParams] = useState<TQueryParams[] | undefined>([])
    const { data: semesterData, isLoading, isFetching } = useGetAcademicSemesterQuery(params)
    const tableData = semesterData?.data?.map(
        ({ _id, name, startMonth, endMonth, year }) => ({
            key: _id,
            name,
            startMonth,
            endMonth,
            year,
        })
    );
    const columns: TableColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            filters: [
                {
                    text: 'Autumn',
                    value: 'Autumn',
                },
                {
                    text: 'Summer',
                    value: 'Summer',
                },
                {
                    text: "Fall",
                    value: 'Fall',
                }]

        },
        {
            title: 'Start Month',
            dataIndex: 'startMonth',

        },
        {
            title: 'End Month',
            dataIndex: 'endMonth',
        },
        {
            title: 'Year',
            dataIndex: 'year', filters: [
                {
                    text: '2024',
                    value: '2024',
                },
                {
                    text: '2025',
                    value: '2025',
                },
                {
                    text: "2026",
                    value: '2026',
                }]

        }, {
            title: 'Action',
            render: () => <Button>Update</Button>,
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


        </div>
    )
}

export default AcademicSemester