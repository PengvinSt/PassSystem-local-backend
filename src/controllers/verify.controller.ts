/* eslint-disable prettier/prettier */
import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { VerifyService } from '../services/verify.service';
import IActionStatus from '../interface/action-status.interface';
@Controller()
export class VerifyController {
  constructor(private readonly VerifyService: VerifyService) {}
  @Post('/verify')
  @ApiOperation({ summary: 'Verify is user exist and is code same as needed' })
  @ApiBearerAuth()
  //@ApiBody({required: true, description: "User identifier and token to verifying program"})
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @UseGuards(AuthGuard())
  verifyUser(
    @Body() body: { uuid: string; token: string },
  ): Promise<IActionStatus> {
    return this.VerifyService.verify(body);
  }

  @Post('/setOnline')
  @ApiOperation({ summary: 'Set user status to online' })
  @ApiBearerAuth()
  // @ApiParam({ name: "uId", required: true, description: "User identifier" })
  //@ApiParam({ name: "isVerified", required: true, description: "Is user verified"})
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @UseGuards(AuthGuard())
  setUserOnline(
    @Body() body: { uuid: string; isVerified: boolean },
  ): Promise<IActionStatus> {
    return this.VerifyService.userOnline(body);
  }

  @Post('/setOffline')
  @ApiOperation({ summary: 'Set user status to online' })
  @ApiBearerAuth()
  //@ApiParam({ name: "uId", required: true, description: "User identifier" })
  //@ApiParam({ name: "isVerified", required: true, description: "Is user verified"})
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @UseGuards(AuthGuard())
  setUserOffline(
    @Body() body: { uuid: string; isVerified: boolean },
  ): Promise<IActionStatus> {
    return this.VerifyService.userOffline(body);
  }
}
