import React from "react";

export default function Loading({ classs }) {
  return (
    <div
      style={{
        height: classs == "menu" ? "100vh" : "100%",
        width: classs == "menu" ? "100vw" : "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        class="spinner-border text-primary"
        role="status"
        style={{ height: "100px", width: "100px" }}
      >
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  );
}
