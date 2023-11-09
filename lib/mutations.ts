import fetcher from './fetcher';

export async function auth(
  mode: 'signin' | 'signup',
  body: { email: string; password: string },
) {
  const { status, message } = await fetcher(`/${mode}`, body);

  return { status, message };
}
