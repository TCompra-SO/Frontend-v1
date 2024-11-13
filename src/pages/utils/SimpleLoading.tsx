import Lottie from "react-lottie-player";
import loadingAnimationData from "../../assets/lotties/simpleLoading.json";

export default function SimpleLoading() {
  return (
    // <Flex justify='center' align='center' style={{height: '100vh'}}>
    <Lottie loop={true} play={true} animationData={loadingAnimationData} />
    // </Flex>
  );
}
