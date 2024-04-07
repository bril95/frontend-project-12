const redirectToMainPage = (data, navigate) => {
  const userToken = data.token;
  localStorage.setItem('token', userToken);
  navigate("/");
}

export default redirectToMainPage;