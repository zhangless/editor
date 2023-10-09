import React from "react";
import { Col, Row, Spin } from "antd";
import styles from "./index.module.less";
import Login from "src/components/Login";
import useGlobalStore from "src/store/globalStore";

export default function LoginPage() {
  const loading = useGlobalStore((state) => state.loading);

  if (loading) {
    return (
      <div className="loading">
        <Spin size="large" />
      </div>
    );
  }
  return (
    <Row>
      <Col span={12} className={styles.aside}></Col>
      <Col span={12} className={styles.asideRight} flex={1}>
        <Login />
      </Col>
    </Row>
  );
}
