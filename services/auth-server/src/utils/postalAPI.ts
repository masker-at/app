import PostalAPI from '@masker-at/postal-api';

const postalAPI = new PostalAPI(process.env.POSTAL_API_BASE_URL!, process.env.POSTAL_API_KEY!);
export default postalAPI;
