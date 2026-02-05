import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { JwtAuthGuard } from '@app/common';
import { CurrentUser } from '@app/common/decorators';
import { UserDto } from '@app/common/dto/user.dto';


@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}


  @UseGuards(JwtAuthGuard)
  @Post()
  aysnc create(@Body() createReservationDto: CreateReservationDto, @CurrentUser() user:UserDto) {
    const _user = this.reservationsService.create(createReservationDto,user._id);

    console.log(user)
    return _user

  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.reservationsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return this.reservationsService.update(id, updateReservationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.reservationsService.remove(id);
  }
}
