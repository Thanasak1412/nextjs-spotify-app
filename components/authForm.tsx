import { ChangeEvent, FC, SyntheticEvent, useState } from 'react';
import { Flex, Box } from '@chakra-ui/layout';
import { Button, Input } from '@chakra-ui/react';
import NextImage from 'next/image';
import { useRouter } from 'next/router';
// lib
import { auth } from '../lib/mutations';

type Props = {
  mode: 'Sign In' | 'Sign Up';
  url: 'signin' | 'signup';
};

const initialInputForm = {
  email: '',
  password: '',
};

const AuthForm: FC<Props> = ({ mode, url }) => {
  const [inputForm, setInputForm] = useState(initialInputForm);

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { email, password } = inputForm;

    try {
      const { status } = await auth(url, { email, password });

      setIsLoading(false);

      if (!status) {
        return;
      }

      router.push('/');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error', error?.message ?? error);
      setIsLoading(false);
    }
  };

  return (
    <Box width="100vw" height="100vh" bgColor="black" color="white">
      <Flex justify="center" align="center" height="6.25rem">
        <NextImage src="/logo.svg" alt="logo" width={120} height={60} />
      </Flex>
      <Flex justify="center" align="center" height="calc(100vh - 100px)">
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Flex
            width={{ sm: '100%', md: 'md' }}
            flexDirection="column"
            gap={3}
            paddingX={{ base: 4, md: 0 }}
            margin="0 auto"
          >
            <Input
              placeholder="Email"
              type="email"
              name="email"
              value={inputForm.email}
              onChange={handleChange}
              autoComplete="off"
            />
            <Input
              placeholder="Password"
              type="password"
              name="password"
              value={inputForm.password}
              onChange={handleChange}
              autoComplete="off"
            />
            <Button
              type="submit"
              isLoading={isLoading}
              width="36"
              bg="green.500"
              marginX="auto"
              sx={{
                '&:hover': {
                  bg: 'green.400',
                },
              }}
            >
              {mode}
            </Button>
          </Flex>
        </form>
      </Flex>
    </Box>
  );
};

export default AuthForm;
