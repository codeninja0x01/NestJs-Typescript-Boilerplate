import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// import { EmailService } from '../email/email.service';
import { UserAddressDto } from './dto/user-address.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
    // private readonly emailService: EmailService
  ) { }

  public async save(user: User): Promise<User> {
    // this.emailService.sendMail({
    //   html: '',
    //   subject: '',
    //   text: '',
    //   to: '',
    // });
    return await this.userRepository.save(user);
  }

  public async update({ name, evePhone, dayPhone, mobPhone, password }: UserUpdateDto, customerId: number): Promise<User> {
    await this.userRepository.update({ id: customerId }, { name, evePhone, mobPhone, dayPhone, password });
    return await this.userRepository.findOne({ id: customerId });
  }

  public async address({ address1, address2, city, country, postalCode, region }: UserAddressDto, customerId: number): Promise<User> {
    await this.userRepository.update({ id: customerId }, { address1, address2, city, country, postalCode, region });
    return await this.userRepository.findOne({ id: customerId });
  }

  public async findByEmail(email: string): Promise<User> {
    const customer = await this.userRepository.findOne(
      { where: { email } }
    );
    return customer;
  }
}
