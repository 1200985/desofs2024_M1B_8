export interface Carausel {
  title: string;
  text: string;
  imageUrl: string;
}

export interface Configuration {
  apiUrl: string;
  authUrl: string;
  clientId: string;
  clientSecret: string;
  recaptchaKey: string;
  carausel: Array<Carausel>;
  bannerUrl: string;
}
