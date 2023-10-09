import {
  editAssemblyStyle,
  updateSelectedCmpAttr,
  updateSelectedSingleCmpProps,
} from "src/store/editStore";
import type { ICmpWithKey, Style } from "src/store/editStoreTypes";
import styles from "./edit.module.less";
import EditCmpStyle from "./EditCmpStyle";
import EditCmpProps from "./EditCmpProps";
import Item from "src/lib/Item";
import React from "react";
import { Select, Input, Tabs } from "antd";
import type { TabsProps } from "antd";

export type HandleAttributesChangeType = (obj: any) => void;

const alignmentOption = [
  {
    value: "left",
    label: "左对齐",
  },
  {
    value: "right",
    label: "右对齐",
  },
  {
    value: "x-center",
    label: "水平居中",
  },
  {
    value: "top",
    label: "上对齐",
  },
  {
    value: "bottom",
    label: "下对齐",
  },
  {
    value: "y-center",
    label: "垂直居中",
  },
];

export default function EditCmp({
  selectedCmp,
  formKeys,
}: {
  selectedCmp: ICmpWithKey;
  formKeys: any;
}) {
  const { style, onClick, formKey, formItemName, inputType, props } =
    selectedCmp;

  const handleAttributesChange: HandleAttributesChangeType = (obj) => {
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      updateSelectedCmpAttr(key, value);
    });
  };

  const handleChangeAlignment = (align: string) => {
    let newStyle: Style = {};
    switch (align) {
      case "left":
        newStyle.left = 0;
        break;
      case "right":
        newStyle.right = 0;
        break;

      case "x-center":
        newStyle.left = "center";
        break;
      case "top":
        newStyle.top = 0;
        break;
      case "bottom":
        newStyle.bottom = 0;
        break;

      case "y-center":
        newStyle.top = "center";
        break;
    }
    editAssemblyStyle(newStyle);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "样式",
      children: (
        <>
          <Item label="对齐页面: ">
            <Select
              options={alignmentOption}
              onChange={handleChangeAlignment}
              className={styles.itemRight}
              placeholder="选择对齐页面方式--"
            />
          </Item>
          <EditCmpStyle
            styleName="style"
            styleValue={style}
            onClick={onClick}
            inputType={inputType}
            handleAttributesChange={handleAttributesChange}
          />
        </>
      ),
    },
  ];
  Object.keys(props as Object).length > 0 &&
    items.push({
      key: "2",
      label: "属性",
      children: (
        <>
          <EditCmpProps
            updateSelectedSingleCmpProps={updateSelectedSingleCmpProps}
            {...props}
          />
        </>
      ),
    });

  return (
    <div className={styles.main}>
      <div className={styles.title}>组件属性</div>

      {formItemName != undefined && (
        <>
          <Item label="所属表单: ">
            <select
              className={styles.itemRight}
              value={formKey}
              onChange={(e) => {
                handleAttributesChange({ formKey: e.target.value });
              }}
            >
              {formKeys &&
                formKeys.map((key: string) => {
                  return (
                    <option key={key} value={key}>
                      form{key}
                    </option>
                  );
                })}
            </select>
          </Item>
          <Item label="form字段: ">
            <input
              type="text"
              className={styles.itemRight}
              value={formItemName}
              onChange={(e) => {
                handleAttributesChange({ formItemName: e.target.value });
              }}
            />
          </Item>
        </>
      )}

      <Tabs defaultActiveKey="1" items={items} className={styles.tab} />
    </div>
  );
}
