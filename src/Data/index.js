import React, { useEffect, useState } from "react";
import Dataget from "./Dataget";
import DataPaste from "./DataPaste";
import SheetJSApp from "./Excel/Sheetjs";
import { Select, Row, Col, Typography, Button, Divider, Tooltip } from "antd";
import { BiReset } from "react-icons/bi";

const { Option } = Select;
const { Title } = Typography;

const Index = ({ authObj }) => {
  const [dtype, setDtype] = useState();

  useEffect(() => {
    console.log("authobj", authObj);
    if (authObj && authObj?.dtsetting) setDtype(authObj.dtsetting.dtype);
  }, []);
  function handleChange(value) {
    setDtype(value);
    // let setting = localStorage.getItem("dashsetting");
    // if (setting) {
    //   setting = JSON.parse(setting);
    //   setting.datatype = value;
    //   localStorage.setItem("dashsetting", JSON.stringify(setting));
    // }

    // console.log(`selected ${value}`);
  }
  return (
    <div style={{ padding: "5px 5px 10px 10px" }}>
      <Row gutter={4}>
        <Col flex={11}>
          <Title level={4}>Data</Title>
        </Col>
        <Col flex={"auto"}>
          <div style={{ float: "right" }}>
            <Tooltip title="Reset data">
              <Button
                type="primary"
                size="small"
                icon={<BiReset />}
                onClick={() => setDtype(null)}
              />
            </Tooltip>
          </div>
        </Col>
      </Row>

      <Divider style={{ marginTop: 0 }} />
      {(() => {
        switch (dtype) {
          case "api":
            return (
              <div>
                <Dataget authObj={authObj} />
              </div>
            );
          case "excel":
            return (
              <>
                <SheetJSApp authObj={authObj} />
              </>
            );
          case "paste":
            return (
              <>
                <DataPaste authObj={authObj} />
              </>
            );
          default:
            return (
              <div>
                <label
                  for="dtype"
                  style={{ width: 50, marginRight: 10, marginLeft: 20 }}
                >
                  Data type:
                </label>
                <Select
                  name="dtype"
                  defaultValue={dtype}
                  onChange={handleChange}
                  style={{ width: 200 }}
                  placeholder="Select data type"
                >
                  <Option value=""></Option>
                  <Option value="api">API</Option>
                  <Option value="excel">Excel</Option>
                  <Option value="paste">Direct Paste</Option>
                </Select>
              </div>
            );
        }
      })()}
    </div>
  );
};

export default Index;
