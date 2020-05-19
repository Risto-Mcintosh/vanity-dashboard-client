import productList from '../test/vanity-components-data.json';
import { VanityComponent } from '../types';

async function list() {
  return (productList as unknown) as VanityComponent[];
}

async function update(productType: string, update: VanityComponent) {
  const old = productList.map((p) => {
    if (p.type === productType && p.id === update.id) {
      return { ...p, ...update };
    }
    return p;
  });

  return (old as unknown) as VanityComponent[];
}

export { list, update };
