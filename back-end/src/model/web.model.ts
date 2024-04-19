export class WebResponse {
  message?: string;
  errors?: string;
  data?: any;
}

export class ConfigRequest {
  user: string;
  password: string;
  host: string;
  database: string;
}

export class QueryRequest {
  query: string;
}
