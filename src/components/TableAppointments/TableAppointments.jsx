import React, {useEffect, useState, useRef} from "react";
import {Table, Input, Popconfirm} from "antd";
import {EditFilled, DeleteFilled} from '@ant-design/icons'
import axios from "axios";
import style from "./TableAppintments.module.css";

export const TableAppointments = () => {
    const [getData, setGetData] = useState([]);
    const [loading, setLoading] = useState(false);
    const searchInput = useRef(null);
    const [selectData, setSelectData] = useState([]);
    const [selectionType, setSelectionType] = useState("checkbox");


    useEffect(() => {
        setLoading(true);
        axios
            .get("http://localhost:8080/allList")
            .then(({data}) => {
                setLoading(false);
                setGetData(data);
            })
            .catch((e) => console.log("Ошибка http://localhost:8080/allList"));
    }, []);
    const fitchSearchData = (obj) => {
        setLoading(true);
        axios
            .post("http://localhost:8080/search", obj)
            .then(({data}) => {
                setLoading(false);
                setGetData(data);
            })
            .catch((e) => console.log("Ошибка fitchData"));
    };
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        const obj = {};
        obj[dataIndex] = selectedKeys;
        fitchSearchData(obj);
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({selectedKeys, confirm, clearFilters, close}) => (
            <div>
                <Input
                    value={selectedKeys[0]}
                    onPressEnter={(e) => handleSearch(e.target.value, confirm, dataIndex)}
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                />
            </div>
        ),
    });
    const onChangeInput = (e, id, key) => {
        setSelectData((prevState) =>
            prevState.map((el) => {
                if (el._id === id) {
                    el[key] = e.target.value;
                }
                return el;
            }),
        );
        };

    const findAndChangeData = (value, record, dataIndex) => {
        const selected = selectData.find((el) => el._id === record._id);
        return selected?._id ? (
            <Input
                onChange={(e) => onChangeInput(e, selected._id, dataIndex)}
                value={selected[dataIndex]}
            />
        ) : (
            value
        );
    };
    const columns = [
        {
            title: "Дата",
            dataIndex: "Date",
            key: "Date",
            render: (value, record) => findAndChangeData(value, record, "Date"),
            ...getColumnSearchProps("Date"),
        },
        {
            title: "Клиника",
            dataIndex: "Clinic",
            key: "Clinic",
            render: (value, record) => findAndChangeData(value, record, "Clinic"),
            filters: [
                {
                    text: "Каштановая",
                    value: "Каштановая",
                },
                {
                    text: "Каменная",
                    value: "Каменная",
                },
            ],
            onFilter: (value, record) => {
                return record.Clinic.indexOf(value) === 0;
            },
        },
        {
            title: "Ф.И.О пациента",
            dataIndex: "Name",
            key: "Name",
            render: (value, record) => findAndChangeData(value, record, "Name"),
            ...getColumnSearchProps("Name"),
        },
        {
            title: "Операция",
            dataIndex: "Operation",
            key: "Operation",
            render: (value, record) => findAndChangeData(value, record, "Operation"),
        },
        {
            title: "Сумма за прием",
            dataIndex: "Sum",
            key: "Sum",
            render: (value, record) => findAndChangeData(value, record, "Sum"),
        },
        {
            title: "Комментарии",
            dataIndex: "Comment",
            key: "Comment",
            render: (value, record) => findAndChangeData(value, record, "Comment"),
        },
    ];

    const handleFilter = (filters, value) => {
        const obj = {};
        value.Clinic ? (obj.Clinic = value.Clinic[0]) : (obj.Clinic = undefined);
        fitchSearchData(obj);
    };



    const rowSelection = {
selectedRowKeys: selectData.map((el,i)=>i),
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(selectedRowKeys)
            setSelectData(selectedRows);
        },
        getCheckboxProps: (record) => ({
            //disabled: false,

            // // Column configuration not to be checked
            // name: record.name,
        }),
    };
  const confirmEdit = () => {
  selectData.length  &&    axios.post('http://localhost:8080/update', selectData).then(({data})=>{
      setGetData(data)
      setSelectData([])}).catch((e)=>console.log('Ошибка update:', e))}

const cancel = () => {
  setSelectData([])
}
    return (
        <div className={style.tableList}>
            <div className={style.iconsBlock}>
                <Popconfirm  className={!selectData.length ? style.iconsDisabled : style.iconsActiveEdit} description="Вы уверены, что хотите изменить выделенные строки?"
                    title={'Изменение выделенных данных.'}
                    onConfirm={confirmEdit}
                             onCancel={cancel}
                    disabled={!selectData.length}
                             okText="Yes"
                             cancelText="No"> <EditFilled
                   /> </Popconfirm>
                <Popconfirm  className={!selectData.length ? style.iconsDisabled : style.iconsActiveDelete} description="Вы уверены, что хотите удалить выделенные строки?"
                            title={'Удаление выделенных данных.'}
                             //onConfirm={confirm}
                             //onCancel={cancel}
                             disabled={!selectData.length}
                             okText="Yes"
                             cancelText="No"> <DeleteFilled />
                </Popconfirm>

            </div>
            <Table
                loading={loading}
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                className={style.tableStyle}
                rowClassName={style.rowTableStyle}
                dataSource={getData.map((el, i) => {
                    el.key = i;
                    return el;
                })}
                columns={columns}
                onChange={handleFilter}
            />
            ;
        </div>
    );
};
