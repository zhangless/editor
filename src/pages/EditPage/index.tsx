import { Layout } from "antd";
import styles from "./index.module.less";
import LeftSider from "./LeftSider";
import Center from "./Center";
import RightSider from "./RightSider";
import Header from "./Header";
import { useEffect } from "react";

export default function EditPage() {
  useEffect(() => {
    window.addEventListener("beforeunload", function (e) {
      // 取消事件的默认行为
      e.preventDefault();

      // 在确认对话框中显示一条消息
      e.returnValue = "";
    });

    return () => {};
  }, []);
  return (
    <Layout className={styles.main}>
      <Header />
      <div className={styles.content}>
        <LeftSider />
        <Center />
        <RightSider />
      </div>
    </Layout>
  );
}
