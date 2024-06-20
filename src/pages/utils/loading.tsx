import Lottie from 'react-lottie';
import loadingAnimationData from '../../assets/lotties/loading.json';
import { useState } from 'react';
import { Flex } from 'antd';

export default function Loading() {
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false); 
  }, 2000); 
  
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimationData,
  };

  return (
    <>
      {isLoading ? (
        <Flex justify='center' align='center' style={{height: '100vh'}}>
          <Lottie
            options={defaultOptions}
            width='30vh'
          />
        </Flex>
        ) : (
          <></>
        )}
    </>
  );
}
