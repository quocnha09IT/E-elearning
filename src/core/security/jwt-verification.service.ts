import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jose from 'jose';

@Injectable()
export class JwtVerificationService {
  private jwkSetUri: string;
  private issuerUri: string;
  constructor(configService: ConfigService) {
    this.jwkSetUri = 'https://www.googleapis.com/service_accounts/v1/jwk/securetoken%40system.gserviceaccount.com';
    this.issuerUri = 'https://securetoken.google.com/conectfirebase-f90f0'
  }

  async verify(token: string) {
    try {
      const JWKS = await jose.createRemoteJWKSet(new URL(this.jwkSetUri));
      const { payload } = await jose.jwtVerify(token, JWKS, {
        issuer: this.issuerUri,
      });
      return payload;
    } catch (e) {
      throw e;
    }
  }
}
