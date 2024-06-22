import {facetParams} from '../../helpers/facetParams';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function getCategoryProducts(context, params) {
  if (params.input.type && params.input.type === 'instant-search') {
    const url = new URL(context.config.api.url + params.lang + '/rest/productSearch');
    url.searchParams.set('iso_currency', params.currency);
    url.searchParams.set('s', params.input.term);

    const { data } = await context.client.get(url.href);
    return data;
  } else {
    const url = new URL(context.config.api.url + params.lang + '/rest/categoryProducts');
    url.searchParams.set('iso_currency', params.currency);
    const facetsUrl = facetParams(params.input.filters);

    url.searchParams.set('slug', params.input.categorySlug);
    url.searchParams.set('q', facetsUrl);
    url.searchParams.set('order', params.input.sort);
    url.searchParams.set('page', params.input.page);
    url.searchParams.set('with_all_images', '0');
    url.searchParams.set('with_category_tree', '1');

    const { data } = await context.client.get(url.href);
    return data;
  }
}
