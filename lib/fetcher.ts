export default async function fetcher(
  url: string,
  data: { [key: string]: string | number } = undefined,
) {
  const res = await fetch(`${window.location.origin}/api${url}`, {
    method: data ? 'POST' : 'GET',
    body: JSON.stringify(data),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.json();
}
