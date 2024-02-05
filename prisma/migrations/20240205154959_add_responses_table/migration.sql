-- CreateTable
CREATE TABLE `Responses` (
    `user_id` VARCHAR(191) NOT NULL,
    `answer_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Responses_user_id_answer_id_key`(`user_id`, `answer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Responses` ADD CONSTRAINT `Responses_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Responses` ADD CONSTRAINT `Responses_answer_id_fkey` FOREIGN KEY (`answer_id`) REFERENCES `Answers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
