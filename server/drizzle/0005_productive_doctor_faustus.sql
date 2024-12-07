ALTER TABLE `campaigns` ADD `description` varchar(2000);--> statement-breakpoint
ALTER TABLE `campaigns` ADD CONSTRAINT `name_idx` UNIQUE(`name`);