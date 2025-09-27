import { client } from "@matrio/db";

export async function getEmailVerificationToken(email: string) {
  return client.verificationToken
    .findFirst({ where: { identifier: email } })
    .then((token) => token?.token);
}

export async function clearDb() {
  await client.$transaction([
    client.verificationToken.deleteMany(),
    client.user.deleteMany(),
    client.session.deleteMany(),
    client.profile.deleteMany(),
    client.account.deleteMany(),
    client.userSettings.deleteMany(),
  ]);
}