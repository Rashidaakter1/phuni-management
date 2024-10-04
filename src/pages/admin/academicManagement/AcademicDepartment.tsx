import { Button, Table, TableColumnsType, TableProps } from 'antd';
import { useState } from 'react'

import { TQueryParams } from '../../../type/global';
import { useGetAcademicDeptQuery } from '../../../redux/features/admin/academicManagementApi';
import { TAcademicDept } from '../../../type/academicManagement.type';

type DataType = Pick<TAcademicDept, "name">

const AcademicDepartment = () => {
  const [params, setParams] = useState<TQueryParams[] | undefined>([])
  const { data: deptData, isFetching } = useGetAcademicDeptQuery(params)
  const tableData = deptData?.data?.map(
    ({ _id, name, academicFaculty }) => ({
      key: _id,
      name,
      academicFaculty: (academicFaculty?.name),
    })
  );


  console.log(tableData)
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
      title: 'Academic Faculty',
      dataIndex: 'academicFaculty',


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

export default AcademicDepartment