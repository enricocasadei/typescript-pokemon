import React from "react";
import { Alert } from "antd";

export const ErrorAlert = ({ text }: { text?: string }) => (
  <Alert
    message={text || "There was an error."}
    type="error"
    closable
    onClose={() => {}}
  />
);
