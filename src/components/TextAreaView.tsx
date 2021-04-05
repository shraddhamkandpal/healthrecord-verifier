import React from "react";
import "./TextAreaView.css";

type Props = {
  value: string;
  rows?: number;
};

const TextAreaView = ({ value, rows }: Props) => {
  return (
    <textarea readOnly rows={rows} className="textAreaView" value={value} />
  );
};

export default TextAreaView;
