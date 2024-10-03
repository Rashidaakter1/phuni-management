import { Button, Table, TableColumnsType, TableProps } from 'antd';
import React, { useState } from 'react'
import { TAcademicFaculty } from '../../../type/academicManagement.type';
import { TQueryParams } from '../../../type/global';
import { useGetAcademicFacultyQuery } from '../../../redux/features/admin/academicManagementApi';



type DataType = Pick<TAcademicFaculty, "name">
const AcademicFaculty = () => {
  const [params, setParams] = useState<TQueryParams[] | undefined>([])
  const { data: facultyData, isLoading, isFetching } = useGetAcademicFacultyQuery(params)
  const tableData = facultyData?.data?.map(
    ({ _id, name }) => ({
      key: _id,
      name,

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

export default AcademicFaculty