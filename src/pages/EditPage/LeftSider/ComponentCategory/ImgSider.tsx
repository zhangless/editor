import { isImgComponent, defaultComponentStyle } from "src/utils/const";
import { addCmp } from "src/store/editStore";
import leftSideStyles from "./leftSide.module.less";

const defaultStyle = {
  ...defaultComponentStyle,
};

const url = "https://www.bubucuo.cn/";

const settings = [
  {
    value: url + "react-head.png",
    style: defaultStyle,
  },
];

const ImgSider = () => {
  return (
    <div className={leftSideStyles.main}>
      <ul className={leftSideStyles.box}>
        {settings.map((item) => (
          <li
            draggable={true}
            key={item.value}
            className={leftSideStyles.item}
            onClick={() => addCmp({ ...item, type: isImgComponent })}
            onDragStart={(e) => {
              e.dataTransfer.setData(
                "drag-cmp",
                JSON.stringify({ ...item, type: isImgComponent })
              );
            }}
          >
            <img src={item.value} draggable={false} alt="" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImgSider;
