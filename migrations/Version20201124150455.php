<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201124150455 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE color_template CHANGE accent_1 accent_1 VARCHAR(9) NOT NULL, CHANGE accent_2 accent_2 VARCHAR(9) NOT NULL, CHANGE accent_3 accent_3 VARCHAR(9) NOT NULL, CHANGE accent_4 accent_4 VARCHAR(9) NOT NULL, CHANGE accent_5 accent_5 VARCHAR(9) NOT NULL, CHANGE accent_6 accent_6 VARCHAR(9) NOT NULL, CHANGE background_1 background_1 VARCHAR(9) NOT NULL, CHANGE background_2 background_2 VARCHAR(9) NOT NULL, CHANGE text_1 text_1 VARCHAR(9) NOT NULL, CHANGE text_2 text_2 VARCHAR(9) NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE color_template CHANGE accent_1 accent_1 VARCHAR(7) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE accent_2 accent_2 VARCHAR(7) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE accent_3 accent_3 VARCHAR(7) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE accent_4 accent_4 VARCHAR(7) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE accent_5 accent_5 VARCHAR(7) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE accent_6 accent_6 VARCHAR(7) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE background_1 background_1 VARCHAR(7) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE background_2 background_2 VARCHAR(7) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE text_1 text_1 VARCHAR(7) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE text_2 text_2 VARCHAR(7) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`');
    }
}
