import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
  name: 'emailpassword_users_useraccount_readonly',
  expression: `
    SELECT
    epu.user_id,
    epu.email,
    ua.id AS useraccountid
FROM
    emailpassword_users epu
JOIN
    user_account ua
ON
    epu.user_id = ua.supertokensuserid
  `,
})
export class User {
  @ViewColumn()
  user_id: string;
  @ViewColumn()
  email: string;

  @ViewColumn()
  useraccountid: number;
}
