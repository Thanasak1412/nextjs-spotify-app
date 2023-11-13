import { Image } from '@chakra-ui/react';

const ChakraImage = ({ src, ...sx }: { src: string }) => {
  return (
    <Image
      src={src}
      maxWidth="100%"
      height="auto"
      objectFit="cover"
      verticalAlign="middle"
      bgColor="black.900"
      bgPos="50%"
      bgRepeat="no-repeat"
      bgSize="contain"
      borderRadius={8}
      mixBlendMode="difference"
      {...sx}
    />
  );
};

export default ChakraImage;
