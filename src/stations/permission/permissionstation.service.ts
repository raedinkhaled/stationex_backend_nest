import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionStation } from './PermissionStation.entity';
import { Repository } from 'typeorm';
import { UserAccountService } from 'src/user-account/user-account.service';
import { StationsService } from '../stations.service';
import { CreatePermissionStationDTO } from './dtos/create-permissionstation.dto';

@Injectable()
export class PermissionstationService {
  constructor(
    @InjectRepository(PermissionStation)
    private permissionStationRepo: Repository<PermissionStation>,

    private readonly userAccountService: UserAccountService,

    private readonly stationService: StationsService,
  ) {}

  async createPermission(
    createPermissionDto: CreatePermissionStationDTO,
    userPerformingId: number,
  ): Promise<PermissionStation> {
    const user = await this.userAccountService.findOneByID(
      createPermissionDto.userId,
    );
    const station = await this.stationService.findOneByIDandLoadCompany(
      createPermissionDto.stationId,
    );

    if (!station) {
      throw new NotFoundException('Station not found');
    }
    console.log(station.company);
    if (station.company.owner.id !== userPerformingId) {
      throw new ForbiddenException(
        'You do not have permission to create permissions for this station',
      );
    }

    const createdPermission = this.permissionStationRepo.create({
      ...createPermissionDto,
      user: user,
      station: station,
    });

    await this.permissionStationRepo.save(createdPermission);
    return createdPermission;
  }

  async getPermissionsByUserAndStation(
    userId: number,
    stationId: number,
  ): Promise<PermissionStation[]> {
    return this.permissionStationRepo.find({
      where: { user: { id: userId }, station: { id: stationId } },
      relations: ['user', 'station'],
    });
  }

  async hasPermissionForStation(
    userId: number,
    stationId: number,
    permissionName: string,
  ): Promise<boolean> {
    const permission = await this.permissionStationRepo.findOne({
      where: {
        user: { id: userId },
        station: { id: stationId },
        permissionName: permissionName,
      },
    });
    return permission?.permissionValue || false;
  }

  async updatePermissionStationForUser(
    userId: number,
    stationId: number,
    permissionName: string,
    permissionValue: boolean,
  ): Promise<PermissionStation> {
    const permission = await this.permissionStationRepo.findOne({
      where: {
        user: { id: userId },
        station: { id: stationId },
        permissionName,
      },
    });
    if (permission) {
      permission.permissionValue = permissionValue;
      await this.permissionStationRepo.save(permission);
      return permission;
    } else {
      throw new Error('Permission not found');
    }
  }

  async deletePermission(
    userId: number,
    stationId: number,
    permissionName: string,
  ): Promise<void> {
    await this.permissionStationRepo.delete({
      user: { id: userId },
      station: { id: stationId },
      permissionName,
    });
  }

  // Get All Permissions for a User Across All Stations
  async getAllPermissionsByUser(userId: number): Promise<PermissionStation[]> {
    return this.permissionStationRepo.find({
      where: { user: { id: userId } },
      relations: ['station'],
    });
  }

  async batchCreateOrUpdatePermissions(
    stationId: number,
    permissions: CreatePermissionStationDTO[],
  ): Promise<PermissionStation[]> {
    const station = await this.stationService.findOneByID(stationId);
    if (!station) {
      throw new NotFoundException(`Station with ID ${stationId} not found`);
    }

    const permissionEntities: PermissionStation[] = [];

    for (const permissionDTO of permissions) {
      const user = await this.userAccountService.findOneByID(
        permissionDTO.userId,
      );
      if (!user) {
        throw new NotFoundException(
          `User with ID ${permissionDTO.userId} not found`,
        );
      }

      let permission = await this.permissionStationRepo.findOne({
        where: {
          user: { id: permissionDTO.userId },
          station: { id: stationId },
          permissionName: permissionDTO.permissionName,
        },
      });

      if (permission) {
        // Update the permission
        permission.permissionValue = permissionDTO.permissionValue;
      } else {
        // Create new permission
        permission = this.permissionStationRepo.create({
          user,
          station,
          permissionName: permissionDTO.permissionName,
          permissionValue: permissionDTO.permissionValue,
        });
      }

      permissionEntities.push(permission);
    }

    return await this.permissionStationRepo.save(permissionEntities);
  }
}
