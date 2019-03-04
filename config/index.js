let config = {
  db: {
    apiUri: ""
  }
};

switch (process.env.NODE_ENV) {
  case "production":
    config.db.apiUri = "http://infinite-api.herokuapp.com/api";
    break;
  case "dev":
  default:
    config.db.apiUri = "http://192.168.0.103:8080/api";
    break;
}

export default config;
