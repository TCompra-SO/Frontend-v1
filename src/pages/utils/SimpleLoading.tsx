import Lottie from "react-lottie-player";
import loadingAnimationData from "../../assets/lotties/simpleLoading.json";
import { CSSProperties } from "react";
import { SpinProps } from "antd/lib/spin";
import { Spin } from "antd";
// import { Flex } from "antd";

export default function SimpleLoading({
  style,
  size,
}: {
  style?: CSSProperties;
  size?: SpinProps["size"];
}) {
  return size ? (
    <Spin
      size={size}
      indicator={
        <Lottie
          loop={true}
          play={true}
          animationData={loadingAnimationData}
          style={style}
        />
      }
    ></Spin>
  ) : (
    <Lottie
      loop={true}
      play={true}
      animationData={loadingAnimationData}
      style={style}
    ></Lottie>
  );
}
