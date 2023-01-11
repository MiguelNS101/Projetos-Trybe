import * as bcrypt from 'bcryptjs';

export default class HandleBcrypt {
  checkPassword = async (password: string, encrypted: string) => {
    const resPassword = await bcrypt.compare(password, encrypted);
    return resPassword;
  };
}
