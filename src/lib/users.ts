import { readFileSync } from 'fs';
import { join } from 'path';
import bcrypt from 'bcryptjs';
import type { User } from '@/types/auth';

let cachedUsers: User[] | null = null;

export function getUsers(): User[] {
  if (cachedUsers) {
    return cachedUsers;
  }

  const usersPath = join(process.cwd(), 'data', 'users.json');
  const fileContent = readFileSync(usersPath, 'utf-8');
  const data = JSON.parse(fileContent);
  cachedUsers = data.users;
  return cachedUsers;
}

export async function verifyUser(
  username: string,
  password: string
): Promise<User | null> {
  const users = getUsers();
  const user = users.find((u) => u.username === username);

  if (!user) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  return isValid ? user : null;
}
