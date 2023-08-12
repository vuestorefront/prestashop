
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function getWhishlistItems(context, params) {
  const {psCookieKey, psCookieValue} = params;
  const url = new URL(context.config.api.url + params.lang + '/rest/wishlist');
  url.searchParams.set('action', 'viewWishlist');

  if (psCookieKey && psCookieValue) {
    // It's not possible to get cart items without cookies (or any operation on cart)
    const { data } = await context.client.get(url.href, {
      headers: {
        Cookie: psCookieKey + '=' + psCookieValue + ';'
      }
    });

    return {data};
  } else {
    return {};
  }
}
