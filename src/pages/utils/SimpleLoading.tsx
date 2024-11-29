import Lottie from "react-lottie-player";
import loadingAnimationData from "../../assets/lotties/simpleLoading.json";
import { CSSProperties } from "react";
// import { Flex } from "antd";

export default function SimpleLoading({ style }: { style?: CSSProperties }) {
  return (
    // <Flex justify="center" align="center">
    <Lottie
      loop={true}
      play={true}
      animationData={loadingAnimationData}
      style={style}
    />
    // </Flex>
  );
}
