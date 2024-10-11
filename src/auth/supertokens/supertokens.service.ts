import { Inject, Injectable } from '@nestjs/common';
import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
/*import ThirdParty from 'supertokens-node/recipe/thirdparty';*/
import EmailPassword from 'supertokens-node/recipe/emailpassword';
import Dashboard from 'supertokens-node/recipe/dashboard';
import UserMetadata from 'supertokens-node/recipe/usermetadata';

import { ConfigInjectionToken, AuthModuleConfig } from '../config.interface';
import { UserAccountService } from 'src/user-account/user-account.service';
import UserRoles from 'supertokens-node/recipe/userroles';

@Injectable()
export class SupertokensService {
  constructor(
    private readonly userAccountService: UserAccountService,
    @Inject(ConfigInjectionToken) private config: AuthModuleConfig,
  ) {
    supertokens.init({
      appInfo: config.appInfo,
      supertokens: {
        connectionURI: config.connectionURI,
        apiKey: config.apiKey,
      },
      recipeList: [
        Session.init({
          exposeAccessTokenToFrontendInCookieBasedAuth: true,
          override: {
            functions: (originalImplementation) => {
              return {
                ...originalImplementation,
                createNewSession: async function (input) {
                  const userId = input.userId;
                  const useraccount =
                    await userAccountService.getUserAccount(userId);

                  // This goes in the access token, and is available to read on the frontend.
                  input.accessTokenPayload = {
                    ...input.accessTokenPayload,
                    accountid: useraccount.at(0).id,
                    accountrole: useraccount.at(0).role,
                  };

                  return originalImplementation.createNewSession(input);
                },
              };
            },
          },
        }),
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
                    const userAccount = {
                      supertokensuserid: userId,
                      firstname: firstName.value,
                      lastname: lastName.value,
                      email: formFields.find((field) => field.id === 'email')
                        .value,
                      phonenumber: phoneNumber.value,
                      role: 'owner',
                    };
                    await userAccountService.createUserAccount(userAccount);
                  }

                  return response;
                },
              };
            },
          },
        }),
        Dashboard.init(),
        UserRoles.init(),
        /*ThirdParty.init({
          // We have provided you with development keys which you can use for testing.
          // IMPORTANT: Please replace them with your own OAuth keys for production use.
          signInAndUpFeature: {
            providers: [
               {
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
              
            ],
          },
        }), */
      ],
    });
  }
}
