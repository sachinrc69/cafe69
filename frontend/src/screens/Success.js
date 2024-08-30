import success from "../Util/successfullOrder.gif";

const Success = () => {
  return (
    <div
      style={{
        paddingTop: "10vh",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <iframe style={{ height: "300px" }} src={success}></iframe>
      <h1>Order placed succesfully :{")"}</h1>
    </div>
  );
};

export default Success;
