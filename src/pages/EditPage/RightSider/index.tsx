import { useState } from "react";
import useEditStore from "src/store/editStore";
import EditCmp from "./EditCmp";
import EditCanvas from "./EditCanvas";
import EditMultiCmps from "./EditMultiCmps";
import styles from "./index.module.less";
import { isGroupComponent } from "src/utils/const";

// 画布
// 单个组件
// 多个组件
export default function RightSider() {
  const [showEdit, setShowEdit] = useState(true);

  const [canvas, assembly] = useEditStore((state) => [
    state.canvas,
    state.assembly,
  ]);

  const assemblySize = assembly.size;
  let selectedCmp: any;
  let isGroup = false;
  if (assemblySize === 1) {
    selectedCmp = canvas.content.cmps[Array.from(assembly)[0]];
    isGroup = !!(selectedCmp.type & isGroupComponent);
  }

  return (
    <div className={styles.main}>
      {assemblySize === 0 && <EditCanvas canvas={canvas} />}

      {assemblySize === 1 && (
        <EditCmp
          selectedCmp={selectedCmp!}
          formKeys={canvas.content.formKeys}
        />
      )}

      {/* <EditMultiCmps isGroup={isGroup} /> */}
    </div>
  );
}
