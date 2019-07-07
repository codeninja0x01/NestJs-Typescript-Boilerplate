import { IsEmail, IsNotEmpty } from 'class-validator';

import { SigninInput } from '../../../generated/graphql';

export class SigninDto extends SigninInput {
    @IsEmail({
        allow_display_name: true,
    }, {
        message: 'Email is Invalid',
    })
    public email: string;

    @IsNotEmpty()
    public password: string;
}
