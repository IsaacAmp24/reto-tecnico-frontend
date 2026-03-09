import { ConfigProvider } from "antd";
import "antd/dist/reset.css";
import esES from "antd/locale/es_ES";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./shared/styles/global.less";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider locale={esES}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);