import { Test, TestingModule } from '@nestjs/testing';
import { PistolService } from './pistol.service';

describe('PistolService', () => {
  let service: PistolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PistolService],
    }).compile();

    service = module.get<PistolService>(PistolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
