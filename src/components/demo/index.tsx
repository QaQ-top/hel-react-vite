import React from "react";

export const Demo: React.FC = () => {
  return <button onClick={() => {
    alert('远程组件事件被触发了')
  }}>
    demo click
  </button>
}