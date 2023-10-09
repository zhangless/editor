import classNames from "classnames";
import React, { memo, useState, useEffect, useMemo } from "react";
import styles from "./index.module.less";
import TextSider from "./ComponentCategory/TextSider";
import ImgSider from "./ComponentCategory/ImgSider";
import GraphSider from "./ComponentCategory/GraphSider";
import TplSider from "./ComponentCategory/TplSider";
import FormSider from "./ComponentCategory/FormSider";
import { Input, Tree } from "antd";
import type { DataNode } from "antd/es/tree";
import { defaultImgProps, defaultTextProps } from "src/utils/const";
import { addCmp } from "src/store/editStore";
import {
  isTextComponent,
  isImgComponent,
  isFormComponent,
  isGraphComponent,
} from "src/utils/const";

export const isTplSide = 0b00000000; // 0

const LeftSider = memo(() => {
  const [showSide, setShowSide] = useState(-1);

  const _setShowSide = (which: number | undefined) => {
    if (showSide === which) {
      setShowSide(0);
    } else {
      setShowSide(which || 0);
    }
  };

  useEffect(() => {
    const cancelShow = () => setShowSide(-1);
    document.getElementById("center")?.addEventListener("click", cancelShow);
    return () => {
      document
        .getElementById("center")
        ?.removeEventListener("click", cancelShow);
    };
  }, []);

  console.log("left render"); //sy-log

  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  const treeData: DataNode[] = [
    {
      title: <div className={styles.level1}>文字</div>,
      key: isTextComponent,

      children: [
        {
          title: (
            <li
              draggable={true}
              className={classNames(styles.cmpItem, styles.level2)}
              onClick={() => addCmp(defaultTextProps)}
              onDragStart={(e) => {
                e.dataTransfer.setData(
                  "drag-cmp",
                  JSON.stringify({ ...defaultTextProps, type: isTextComponent })
                );
              }}
            >
              <i
                className={classNames("iconfont icon-wenben", styles.cmpIcon)}
              />
              <span className={styles.cmpText}>文字</span>
            </li>
          ),
          key: "文字",
        },
      ],
    },
    {
      title: <div className={styles.level1}>图片</div>,
      key: isImgComponent,
      children: [
        {
          title: (
            <div
              className={classNames(styles.cmpItem, styles.level2)}
              onClick={() => addCmp(defaultImgProps)}
            >
              <i
                className={classNames("iconfont icon-tupian", styles.cmpIcon)}
              />
              <span className={styles.cmpText}>图片</span>
            </div>
          ),
          key: "图片",
        },
      ],
    },
  ];
  return (
    <div className={styles.main}>
      <Tree
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        treeData={treeData}
      />

      <ul className={styles.cmps}>
        {/* <li
          className={classNames(
            styles.cmp,
            showSide === isTplSide ? styles.selected : ""
          )}
          onClick={() => _setShowSide(isTplSide)}
        >
          <i
            className={classNames(
              "iconfont icon-mobankuangjia-xianxing",
              styles.cmpIcon
            )}
          />
          <span className={styles.cmpText}>模板</span>
        </li> */}

        {/* <li
          className={classNames(
            styles.cmp,
            showSide === isTextComponent ? styles.selected : ""
          )}
          onClick={() => _setShowSide(isTextComponent)}
        >
          <i className={classNames("iconfont icon-wenben", styles.cmpIcon)} />
          <span className={styles.cmpText}>文本</span>
        </li> */}
        {/* <li
          className={classNames(
            styles.cmp,
            showSide === isImgComponent ? styles.selected : ""
          )}
          onClick={() => _setShowSide(isImgComponent)}
        >
          <i className={classNames("iconfont icon-tupian", styles.cmpIcon)} />
          <span className={styles.cmpText}>图片</span>
        </li> */}
        {/* <li
          className={classNames(
            styles.cmp,
            showSide === isGraphComponent ? styles.selected : ""
          )}
          onClick={() => _setShowSide(isGraphComponent)}
        >
          <i
            className={classNames("iconfont icon-graphical", styles.cmpIcon)}
          />
          <span className={styles.cmpText}>图形</span>
        </li> */}
        {/* <li
          className={classNames(
            styles.cmp,
            showSide === isFormComponent ? styles.selected : ""
          )}
          onClick={() => _setShowSide(isFormComponent)}
        >
          <i className={classNames("iconfont icon-form", styles.cmpIcon)} />
          <span className={styles.cmpText}>表单</span>
        </li> */}
      </ul>

      {showSide === isTplSide && <TplSider />}
      {showSide === isTextComponent && <TextSider />}
      {showSide === isImgComponent && <ImgSider />}
      {showSide === isGraphComponent && <GraphSider />}
      {showSide === isFormComponent && <FormSider />}
    </div>
  );
});

export default LeftSider;
