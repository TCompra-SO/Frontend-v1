import Lottie from "react-lottie-player";
import loadingAnimationData from "../../assets/lotties/loading.json";
import { Flex } from "antd";

export default function LoadingPage() {
  return (
    <div
      style={{
        position: "fixed", // Ensure it covers the entire screen
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "white", // Optional: Set a background color to hide the underlying content
        zIndex: 9999, // Make sure it's on top of other content
      }}
    >
      <Flex justify="center" align="center" style={{ height: "100vh" }}>
        <Lottie
          loop={true}
          play={true}
          animationData={loadingAnimationData}
          style={{ width: "30vh" }}
        />
      </Flex>
    </div>
  );
}
