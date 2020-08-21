const BASE_URL = 'http://vanity.ristomcintosh.com/api';

type ClientParams = {
  data?: any;
  includePageData?: boolean;
} & RequestInit;

export type PaginationData = {
  Count: number;
  HasNext: boolean;
  HasPrevious: boolean;
  TotalCount: number;
  TotalPages: number;
  CurrentPage: number;
};

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
  return fetch(`${BASE_URL}${endpoint}`, config).then(async (response) => {
    const data = await response
      .clone()
      .json()
      .catch(() => response.text());

    let pageData;
    const pageHeader = response.headers.get('X-Pagination');
    if (pageHeader) {
      pageData = JSON.parse(pageHeader) as PaginationData;
    }

    if (response.ok) {
      return customConfig.includePageData ? { data, pageData } : data;
    } else {
      return Promise.reject(data);
    }
  });
}

export { client };
