import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";

export const TableAppointments = () => {
  const [getData, setGetData] = useState([]);
  const columns = [
    {
      title: "Дата",
      dataIndex: "Date",
      key: "Date",
    },
    {
      title: "Клиника",
      dataIndex: "Clinic",
      key: "Clinic",
    },
    {
      title: "Ф.И.О пациента",
      dataIndex: "Name",
      key: "Name",
    },
    {
      title: "Операция",
      dataIndex: "Operation",
      key: "Operation",
    },
    {
      title: "Сумма за прием",
      dataIndex: "Sum",
      key: "Sum",
    },
    {
      title: "Комментарии",
      dataIndex: "Comment",
      key: "Comment",
    },
  ];
  useEffect(() => {
    axios.get("http://localhost:8080/allList").then(({ data }) => {
      const newData = data.map((el, i) => {
        el.key = i;
        return el;
      });
      setGetData(newData);
    });
  }, []);

  console.log(getData);
  return (
    <div className={"tableList"}>
      <Table
        className={"tableStyle"}
        rowClassName={"rowTableStyle"}
        dataSource={getData}
        columns={columns}
      />
      ;
    </div>
  );
};
