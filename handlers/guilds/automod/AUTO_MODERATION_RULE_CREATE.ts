import type { Bot } from "../../../bot.ts";
import { DiscordAutoModerationRule, DiscordGatewayPayload } from "../../../types/discord.ts";

/** Requires the MANAGE_GUILD permission. */
export function handleAutoModerationRuleCreate(bot: Bot, data: DiscordGatewayPayload, shardId: number) {
  const payload = data.d as DiscordAutoModerationRule;
  bot.events.automodRuleCreate(bot, bot.transformers.automodRule(bot, payload));
}
