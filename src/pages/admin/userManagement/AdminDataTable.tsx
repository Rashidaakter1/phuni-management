import { Button, Pagination, Space, Table, TableColumnsType, TableProps } from "antd";
import { TAdmin, TQueryParams, } from "../../../type";
import { useState } from "react";
import { useGetAllAdminQuery } from "../../../redux/features/admin/userManangementApi";
import { Link } from "react-router-dom";

type DataType = Pick<TAdmin, "_id" | "email" | "id" | 'contactNo'>

const AdminDataTable = () => {
  const [params, setParams] = useState<TQueryParams[]>([])
  const [page, setPage] = useState(1)
  const { data: adminData, isLoading, isFetching } = useGetAllAdminQuery([
    // { name: "limit", value: 2 },
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params])

  const metaData = adminData?.meta
  const tableData = adminData?.data?.map(
    ({ id, _id, name, contactNo, email }) => ({
      key: _id,
      _id,
      id,
      name: name?.firstName,
      contactNo,
      email
    })
  );
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
        console.log(item);
        return (
          <Space>
            <Link to={`/admin/admin-data/${item.key}`}>
              <Button>Details</Button>
            </Link>
            <Button>Update</Button>
            <Button>Block</Button>
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

export default AdminDataTable