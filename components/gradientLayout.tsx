import { ReactNode } from 'react';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Image, CSSObject } from '@chakra-ui/react';

type Props = {
  children: ReactNode;
  color: string;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  roundImage: boolean;
  sx: CSSObject;
};

const GradientLayout = ({
  children,
  color,
  image,
  title,
  subtitle,
  description,
  roundImage,
  sx,
}: Props) => {
  return (
    <Box
      height="100%"
      overflowY="auto"
      bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0, 0, 0, 0.95) 75%)`}
    >
      <Flex bg={`${color}.600`} padding="40px 40px 20px" align="flex-end">
        <Box padding="20px 20px 0">
          <Image
            src={image}
            width="100%"
            boxSize="160px"
            boxShadow="2xl"
            borderRadius={roundImage ? '100%' : '3px'}
            objectFit="cover"
            sx={sx}
          />
        </Box>
        <Flex flexDirection="column" justify="center" color="white">
          <Text fontSize="x-small" fontWeight="bold">
            {subtitle}
          </Text>
          <Text fontSize="6xl" fontWeight="extrabold">
            {title}
          </Text>
          <Text fontSize="x-small" fontWeight="bold">
            {description}
          </Text>
        </Flex>
      </Flex>
      <Box>{children}</Box>
    </Box>
  );
};

export default GradientLayout;
