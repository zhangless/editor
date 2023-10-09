import classNames from "classnames";
import { Link, unstable_usePrompt, useNavigate } from "react-router-dom";
import styles from "./index.module.less";
import useEditStore, {
  clearCanvas,
  saveCanvas,
  setCmpSelected,
} from "src/store/editStore";
import { ICmpWithKey } from "src/store/editStoreTypes";

import { DownOutlined } from "@ant-design/icons";
import { message, Dropdown, Button, Tooltip, Space, Typography } from "antd";
import {
  goNextCanvasHistory,
  goPrevCanvasHistory,
} from "src/store/historySlice";
import { useEffect } from "react";
import { isImgComponent, isTextComponent } from "src/utils/const";

const getCmpNameFromType = (type: number) => {
  switch (type) {
    case isTextComponent:
      return "文案";
    case isImgComponent:
      return "图片";
    default:
      break;
  }
};

const generatorCmpTags = (item: ICmpWithKey, index: number) => {
  return {
    key: `${item.type}` + index,
    label: (
      <div
        onClick={() => {
          setCmpSelected(index);
        }}
      >
        {getCmpNameFromType(item.type)}
      </div>
    ),
  };
};

export default function Header() {
  const { hasSavedCanvas, cmps } = useEditStore(
    ({ hasSavedCanvas, canvas }) => {
      return { hasSavedCanvas, cmps: canvas.content.cmps };
    }
  );

  console.log("🚀 ～ file: index.tsx:14 ～ Header ～ assembly:", cmps);

  unstable_usePrompt({
    when: !hasSavedCanvas,
    message: "离开后数据将不会被保存，确认要离开吗?",
  });

  const navigate = useNavigate();

  useEffect(() => {
    document.addEventListener("keydown", keyDown);
    return () => {
      document.removeEventListener("keydown", keyDown);
    };
  }, []);

  const keyDown = (e: any) => {
    if ((e.target as Element).nodeName === "TEXTAREA") {
      return;
    }
    // CMD + key
    if (e.metaKey) {
      switch (e.code) {
        // 撤销、回退
        case "KeyZ":
          if (e.shiftKey) {
            goNextCanvasHistory();
          } else {
            goPrevCanvasHistory();
          }
          return;

        case "KeyS":
          e.preventDefault();
          save();
          return;
      }
    }
  };

  //页面的新增与编辑更新
  const save = () => {
    saveCanvas((_id, isNew) => {
      message.success("保存成功");
      if (isNew) {
        // 新增
        navigate(`?id=${_id}`);
      }
    });
  };

  const saveAndPreview = () => {
    saveCanvas((_id, isNew) => {
      message.success("保存成功");

      if (isNew) {
        // 新增
        navigate(`?id=${_id}`);
      }

      // 跳转生成器项目页
      window.open("http://builder.codebus.tech?id=" + _id + "&preview");
    });
  };

  const saveAndDownload = () => {
    saveCanvas((_id, isNew, res) => {
      message.success("保存成功");

      if (isNew) {
        // 新增
        navigate(`?id=${_id}`);
      }

      //  下载图片
      const img = res.thumbnail.full;
      const ele = document.createElement("a");
      ele.href = img.replace("http://template.codebus.tech/", "");
      ele.download = res.title + ".png";
      ele.style.display = "none";
      document.body.appendChild(ele);
      ele.click();
      document.body.removeChild(ele);
    });
  };

  const emptyCanvas = () => {
    clearCanvas();
  };

  const cmpList = cmps.map(generatorCmpTags);

  console.log("header render"); //sy-log
  return (
    <div className={styles.main}>
      <Link to="/list" className="red">
        <Button type="primary">查看列表</Button>
      </Link>
      <Space>
        <Tooltip title="CMD+Z">
          <Button onClick={goPrevCanvasHistory}>上一步</Button>
        </Tooltip>
        <Tooltip title="CMD+Shift+Z">
          <Button onClick={goNextCanvasHistory}>下一步</Button>
        </Tooltip>
        <Button onClick={emptyCanvas}>清空</Button>
      </Space>
      <Space>
        <Dropdown menu={{ items: cmpList }} placement="bottomLeft">
          <Button color="#fff">组件导航</Button>
        </Dropdown>
        <Button type="primary" onClick={save}>
          保存
        </Button>
        <Button onClick={saveAndPreview}>预览</Button>
        <Button onClick={saveAndDownload}>下载图片</Button>
      </Space>
    </div>
  );
}
