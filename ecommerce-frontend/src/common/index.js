const backendEndPoint = "http://localhost:5000/api/v1";
const apiSummary = {
  signup: {
    url: `${backendEndPoint}/signup`,
    method: "POST",
  },
  signin: {
    url: `${backendEndPoint}/signin`,
    method: "POST",
  },
  profile: {
    url: `${backendEndPoint}/profile`,
    method: "GET",
  },
  logout: {
    url: `${backendEndPoint}/logout`,
    method: "POST",
  },
  users: {
    url: `${backendEndPoint}/users`,
    method: "GET",
  },
  updateUser: {
    url: `${backendEndPoint}/users`,
    method: "PUT",
  },
  createProduct: {
    url: `${backendEndPoint}/products`,
    method: "POST",
  },
  fetchProduct: {
    url: `${backendEndPoint}/products`,
    method: "GET",
  },
};

export default apiSummary;
