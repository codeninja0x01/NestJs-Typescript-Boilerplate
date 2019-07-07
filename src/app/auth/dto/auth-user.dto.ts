import { User } from '../../user/user.model';

export class AuthUserDto {
    public token: string;

    public user: User;
}
