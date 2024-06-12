const fetcher = async (url: string) => fetch(url).then(async (res) => res.json());
export default fetcher;
