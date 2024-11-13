import Lottie from "react-lottie-player";
import loadingAnimationData from "../../assets/lotties/loading.json";
import { Flex } from "antd";

export default function LoadingPage() {
  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      <Lottie
        loop={true}
        play={true}
        animationData={loadingAnimationData}
        style={{ width: "30vh" }}
      />
    </Flex>
  );
}
