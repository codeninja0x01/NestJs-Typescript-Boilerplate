import { IsEmail, IsNotEmpty } from 'class-validator';

import { SignupInput } from '../../../generated/graphql';

export class SignupDto extends SignupInput {
    @IsEmail({
        allow_display_name: true,
    }, {
        message: 'Email is Invalid',
    })
    public email: string;

    @IsNotEmpty()
    public password: string;

    @IsNotEmpty()
    public name: string;
}
