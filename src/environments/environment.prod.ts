import { ApiKeys } from "./keys";

export const environment = {
    production: true,
    APP_ENVIRONMENT: 'PROD',
    API_PATH: 'http://localhost:8080',
    DESTINATIONS_API_PATH: 'https://restcountries.com/v3.1',
    MAP_KEY: ApiKeys.value
    
  };
  