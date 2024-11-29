CREATE TABLE `campaigns` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`updater_id` int,
	`executed_at` timestamp,
	`status` varchar(256) NOT NULL,
	`isDeleted` boolean NOT NULL DEFAULT false,
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`deleted_at` timestamp,
	CONSTRAINT `campaigns_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `department` varchar(256);--> statement-breakpoint
ALTER TABLE `users` ADD `job_title` varchar(256);--> statement-breakpoint
ALTER TABLE `users` ADD `isDeleted` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `campaigns` ADD CONSTRAINT `campaigns_updater_id_users_id_fk` FOREIGN KEY (`updater_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;