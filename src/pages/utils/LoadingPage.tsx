import Lottie from 'react-lottie';
import loadingAnimationData from '../../assets/lotties/loading.json';
import { Flex } from 'antd';

export default function LoadingPage() {
  
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimationData,
  };

  return (
    <Flex justify='center' align='center' style={{height: '100vh'}}>
      <Lottie
        options={defaultOptions}
        width='30vh'
      />
    </Flex>
  );
}
