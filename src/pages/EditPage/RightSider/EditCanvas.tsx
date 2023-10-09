import InputColor from "src/lib/InputColor";
import Item from "src/lib/Item";
import { updateCanvasStyle, updateCanvasTitle } from "src/store/editStore";
import type { ICanvas } from "src/store/editStoreTypes";
import styles from "./edit.module.less";
import { Input, InputNumber, ColorPicker } from "antd";
import type { Color } from "antd/es/color-picker";
import Upload from "./component/Upload";

export default function EditCanvas({ canvas }: { canvas: ICanvas }) {
  const style = canvas.content.style;

  const handleStyleChange = ({
    name,
    value,
  }: {
    name: string;
    value: number | string;
  }) => {
    updateCanvasStyle({ [name]: value });
  };

  return (
    <div className={styles.main}>
      <div className={styles.title}>画布属性</div>
      <div className={styles.contentEdit}>
        <Item label="标题: ">
          <Input
            className={styles.itemRight}
            value={canvas.title}
            onChange={(e) => {
              let newValue = e.target.value;
              updateCanvasTitle(newValue);
            }}
          />
        </Item>

        <Item label="画布宽度 (px): ">
          <InputNumber
            className={styles.itemRight}
            value={style.width}
            onChange={(value) => {
              handleStyleChange({
                name: "width",
                value: parseInt(value) - 0,
              });
            }}
          />
        </Item>

        <Item label="画布高度 (px): ">
          <InputNumber
            className={styles.itemRight}
            value={style.height}
            onChange={(value) => {
              handleStyleChange({
                name: "height",
                value: parseInt(value) - 0,
              });
            }}
          />
        </Item>

        <Item label="背景颜色: ">
          <ColorPicker
            value={style.backgroundColor}
            onChange={(color: Color) => {
              handleStyleChange({
                name: "backgroundColor",
                value: color.toRgbString(),
              });
            }}
            style={{
              height: 32,
            }}
            showText
          />
        </Item>

        <Item label="背景图片: ">
          <Upload
            value={style.backgroundImage}
            canClear
            onChange={(value: string) => {
              handleStyleChange({
                name: "backgroundImage",
                value,
              });
            }}
          />
        </Item>
      </div>
    </div>
  );
}
