import {
  LoginInterface,
  UserInterface,
  TokenData,
} from '../interfaces/userInterface';
import Model from '../database/models/UserModel';
import HandleBcrypt from '../funcs/handleBcryptjs';
import HandleJWT from '../funcs/handleJWT';

export default class UserService {
  private model = Model;
  private bcrypt = new HandleBcrypt();
  private jwt = new HandleJWT();

  login = async (data: LoginInterface) => {
    const user = await this.model.findOne({
      where: { email: data.email },
    });
    if (!user) {
      return false;
    }

    const { password, role, username, email } = user as unknown as UserInterface;

    const checkPassword = await this.bcrypt.checkPassword(
      data.password,
      password,
    );
    if (!checkPassword) {
      return false;
    }

    return this.jwt.genToken({ role, username, email });
  };

  validate = async (token: string) => {
    const verify = this.jwt.verifyToken(token);
    if (!verify) {
      return false;
    }
    const {
      data: { role },
    } = verify as TokenData;
    return { role };
  };
}
