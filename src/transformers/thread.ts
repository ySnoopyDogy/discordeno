import { Bot } from "../bot.ts";
import { Channel } from "../types/channels/channel.ts";
import { DiscordChannelTypes } from "../types/channels/channel_types.ts";
import { SnakeCasedPropertiesDeep } from "../types/util.ts";

export function transformThread(bot: Bot, channel: SnakeCasedPropertiesDeep<Channel>): DiscordenoThread {
  if (
    channel.type !== DiscordChannelTypes.GuildNewsThread &&
    channel.type !== DiscordChannelTypes.GuildPublicThread &&
    channel.type !== DiscordChannelTypes.GuildPrivateThread
  )
    throw new Error("Cannot convert non-thread channel to a thread.");

  return {
    name: channel.name || "",
    id: bot.transformers.snowflake(channel.id),
    type: channel.type,
    parentId: bot.transformers.snowflake(channel.parent_id!),
    memberCount: channel.member_count || 1,
    messageCount: channel.message_count || 1,
    archiveTimestamp: channel.thread_metadata?.archive_timestamp
      ? Date.parse(channel.thread_metadata.archive_timestamp)
      : undefined,
    autoArchiveDuration: channel.thread_metadata?.auto_archive_duration || 0,
    ownerId: bot.transformers.snowflake(channel.owner_id!),
    botIsMember: Boolean(channel.member),
    archived: channel.thread_metadata?.archived,
    locked: channel.thread_metadata?.locked,
  };
}

export interface DiscordenoThread {
  id: bigint;
  name: string;
  type:
    | DiscordChannelTypes.GuildNewsThread
    | DiscordChannelTypes.GuildPublicThread
    | DiscordChannelTypes.GuildPrivateThread;
  parentId: bigint;
  memberCount: number;
  messageCount: number;
  archiveTimestamp?: number;
  autoArchiveDuration: number;
  archived?: boolean;
  locked?: boolean;
  ownerId: bigint;
  botIsMember: boolean;
}
