const expiryToken = {
  UserTokenExpiry: () => new Date(Date.now() + 60 * 60 * 24 * 30 * 1000),
};

export default expiryToken;
