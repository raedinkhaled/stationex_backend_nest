/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptProvider implements HashingProvider {
  async hashPassword(data: string | Buffer): Promise<string> {
    // Generate Salt
    const salt = await bcrypt.ge;
    throw new Error('Method not implemented.');
  }
  comparePassword(
    data: string | Buffer,
    encryptedPassword: string,
  ): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
