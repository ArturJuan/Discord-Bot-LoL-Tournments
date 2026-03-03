import { SetMetadata } from '@nestjs/common';

export const SLASH_COMMAND_KEY = 'SLASH_COMMAND';

export function SlashCommand() {
  return SetMetadata(SLASH_COMMAND_KEY, true);
}
