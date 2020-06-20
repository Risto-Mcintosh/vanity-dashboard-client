import productList from '../test/vanity-components-data.json';
import { VanityComponent } from '../types';

async function list() {
  return (productList as unknown) as VanityComponent[];
}

async function update(update: VanityComponent) {
  const old = productList.map((p) => {
    if (p.type === update.type && p.id === update.id) {
      return { ...p, ...update };
    }
    return p;
  });

  return (old as unknown) as VanityComponent[];
}

export { list, update };
