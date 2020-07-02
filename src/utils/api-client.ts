const BASE_URL = 'http://localhost:5000/api';

type ClientParams = {
  data?: any;
} & RequestInit;

async function client<T>(
  endpoint: string,
  { data, ...customConfig }: ClientParams = {}
): Promise<T> {
  const config: RequestInit = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      'Content-Type': 'application/json'
    },
    ...customConfig
  };
  console.log('passed data:', JSON.stringify(data));
  return fetch(`${BASE_URL}${endpoint}`, config).then(async (response) => {
    const data = await response
      .clone()
      .json()
      .catch(() => response.text());

    console.log('response: ', { response, data });
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
}

export { client };
