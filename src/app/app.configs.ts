import {FacebookLoginProvider, GoogleLoginProvider, LinkedinLoginProvider} from "angular-6-social-login-v2";
import {
  AuthServiceConfig,
} from "angular-6-social-login-v2";


/**
 * Created by Claudiu on 10/19/2018.
 */
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider("Your-Facebook-app-id")
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("Your-Google-Client-Id")
      },
      {
        id: LinkedinLoginProvider.PROVIDER_ID,
        provider: new LinkedinLoginProvider("1098828800522-m2ig6bieilc3tpqvmlcpdvrpvn86q4ks.apps.googleusercontent.com")
      },
    ]
  );

  return config;
}
