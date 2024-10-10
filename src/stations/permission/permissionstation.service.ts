import { Injectable } from '@nestjs/common';
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

        private readonly stationService: StationsService
    ) { }

    async createPermission(createPermissionDto: CreatePermissionStationDTO): Promise<PermissionStation> {


        const user = await this.userAccountService.findOneByID(createPermissionDto.userId);
        const station = await this.stationService.findOneByID(createPermissionDto.stationId);

        const createdPermission = this.permissionStationRepo.create({
            ...CreatePermissionStationDTO,
            user: user,
            station: station
        })
        await this.permissionStationRepo.save(createdPermission);
        return createdPermission;
    }

    async getPermissionsByUserAndStation(userId: number, stationId: number): Promise<PermissionStation[]> {
        return this.permissionStationRepo.find({
            where: { user: { id: userId }, station: { id: stationId } },
            relations: ['user', 'station']
        });
    }

    async hasPermissionForStation(userId: number, stationId: number, permissionName: string): Promise<boolean> {
        const permission = await this.permissionStationRepo.findOne({
            where: { user: { id: userId }, station: { id: stationId }, permissionName: permissionName },
        });
        return permission?.permissionValue || false;
    }

    async updatePermissionStationForUser(userId: number, stationId: number, permissionName: string, permissionValue: boolean): Promise<PermissionStation> {
        const permission = await this.permissionStationRepo.findOne({
            where: { user: { id: userId }, station: { id: stationId }, permissionName }
        });
        if (permission) {
            permission.permissionValue = permissionValue;
            await this.permissionStationRepo.save(permission);
            return permission
        } else {
            throw new Error('Permission not found');
        }
    }

    async deletePermission(userId: number, stationId: number, permissionName: string): Promise<void> {
        await this.permissionStationRepo.delete({
            user: { id: userId },
            station: { id: stationId },
            permissionName
        });
    }





}
