import { Inject, Injectable } from '@nestjs/common';
import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import ThirdParty from 'supertokens-node/recipe/thirdparty';
import EmailPassword from 'supertokens-node/recipe/emailpassword';
import Dashboard from 'supertokens-node/recipe/dashboard';
import UserMetadata from 'supertokens-node/recipe/usermetadata';

import { ConfigInjectionToken, AuthModuleConfig } from '../config.interface';

@Injectable()
export class SupertokensService {
  constructor(@Inject(ConfigInjectionToken) private config: AuthModuleConfig) {
    supertokens.init({
      appInfo: config.appInfo,
      supertokens: {
        connectionURI: config.connectionURI,
        apiKey: config.apiKey,
      },
      recipeList: [
        Session.init(),
        UserMetadata.init(),
        EmailPassword.init({
          signUpFeature: {
            formFields: [
              {
                id: 'firstName',
              },
              {
                id: 'lastName',
              },
              {
                id: 'phoneNumber',
              },
            ],
          },
          override: {
            apis: (originalImplementation) => {
              return {
                ...originalImplementation,
                signUpPOST: async function name(input) {
                  if (originalImplementation.signUpPOST === undefined) {
                    throw Error('Should never come here');
                  }

                  const response =
                    await originalImplementation.signUpPOST(input);

                  if (response.status === 'OK') {
                    const formFields = input.formFields;
                    const userId = response.user.id;
                    console.log(formFields);
                    const firstName = formFields.find(
                      (field) => field.id === 'firstName',
                    );
                    const lastName = formFields.find(
                      (field) => field.id === 'lastName',
                    );
                    const phoneNumber = formFields.find(
                      (field) => field.id === 'phoneNumber',
                    );
                    await UserMetadata.updateUserMetadata(userId, {
                      first_name: firstName.value,

                      last_name: lastName.value,
                      phone_number: phoneNumber.value,
                    });
                  }

                  return response;
                },
              };
            },
          },
        }),
        Dashboard.init(),
        ThirdParty.init({
          // We have provided you with development keys which you can use for testing.
          // IMPORTANT: Please replace them with your own OAuth keys for production use.
          signInAndUpFeature: {
            providers: [
              /*  {
                config: {
                  thirdPartyId: 'google',
                  clients: [
                    {
                      clientId:
                        '1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com',
                      clientSecret: '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',
                    },
                  ],
                },
              },
              */
            ],
          },
        }),
      ],
    });
  }
}
