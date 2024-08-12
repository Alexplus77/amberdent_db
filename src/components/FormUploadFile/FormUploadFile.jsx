import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import axios from "axios";
export const FormUploadFile = () => {
  const [file, setFile] = useState(null);
  //const [getData, setGetData] = useState([]);

  // useEffect(() => {
  //   axios.get("http://localhost:8080/allList").then(({ data }) => {
  //     setGetData(data);
  //   });
  // }, [file]);
  const handleUpload = () => {
    const dataFile = new FormData();
    dataFile.append("uploadfile", file);
    axios
      .post("http://localhost:8080/uploadfile", dataFile, {
        headers: {
          "Content-Type": "multipart/form-data, charset=utf-8",
        },
      })
      .then(({ data }) => {})
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <Upload
        name="uploadfile"
        beforeUpload={(file) => {
          setFile(file);
          return false;
        }}
        onChange={handleUpload}
      >
        <Button icon={<UploadOutlined />}>Выберите CSV файл</Button>
      </Upload>
    </div>
  );
};
