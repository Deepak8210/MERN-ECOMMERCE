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
};

export default apiSummary;
