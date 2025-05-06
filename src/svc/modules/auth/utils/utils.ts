import { conf } from "~src/config/settings";
import { AppUser } from "~src/svc/modules/auth/entities/user";

const users: AppUser[] = [];

export async function findOrCreateUser(user: {
  googleId: string;
  email: string;
  name: string;
}): Promise<AppUser> {
  const userRepo = conf.DEFAULT_DATA_SOURCE.getRepository(AppUser);
  const existing = await userRepo.findOne({
    where: {
      email: user.email,
    },
  });
  if (existing) return existing;

  const newUser = userRepo.save({
    ...user,
  });
  return newUser;
}
