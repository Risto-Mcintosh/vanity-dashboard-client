export default function pageName(pathName: string) {
  if (pathName === '/') return 'Dashboard';
  return pathName
    .substring(1)
    .replace(/^\w/, (c) => c.toUpperCase())
    .replace(/s\//, ' #');
}
