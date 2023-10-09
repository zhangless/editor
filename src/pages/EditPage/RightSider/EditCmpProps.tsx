import styles from "./edit.module.less";
import Item from "src/lib/Item";
import Upload from "./component/Upload";

import { Select, Input } from "antd";

export default function EditCmpProps({
  updateSelectedSingleCmpProps,
  ...props
}: {
  updateSelectedSingleCmpProps: (key: string, value: any) => void;
  [key: string]: any;
}) {
  return (
    <>
      {props?.src !== undefined && (
        <Item label="编辑图片">
          <Upload
            value={props.src}
            onChange={(value) => updateSelectedSingleCmpProps("src", value)}
          />
        </Item>
      )}

      {props?.value !== undefined && (
        <Item label="编辑文案">
          <Input
            className={styles.itemRight}
            value={props.value}
            onChange={(e) =>
              updateSelectedSingleCmpProps("value", e.target.value)
            }
          />
        </Item>
      )}
    </>
  );
}
