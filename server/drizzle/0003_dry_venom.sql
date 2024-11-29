ALTER TABLE `campaigns` DROP COLUMN `isDeleted`;--> statement-breakpoint
ALTER TABLE `campaigns` DROP COLUMN `deleted_at`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `isDeleted`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `deleted_at`;