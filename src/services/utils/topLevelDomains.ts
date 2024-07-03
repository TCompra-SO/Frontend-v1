import httpRequest from "../../utilities/requests/httpRequest";

export default async function getTLDs () {
  const url = 'https://data.iana.org/TLD/tlds-alpha-by-domain.txt';
  const response = await httpRequest(url, 'get', '');
  return response;
}