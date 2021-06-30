<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210630124503 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE checkout (id INT AUTO_INCREMENT NOT NULL, presentation_id INT DEFAULT NULL, token VARCHAR(255) NOT NULL, is_completed TINYINT(1) NOT NULL, created DATETIME NOT NULL, updated DATETIME NOT NULL, amount DOUBLE PRECISION NOT NULL, payer JSON NOT NULL, payment_url VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_AF382D4EAB627E8B (presentation_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE checkout ADD CONSTRAINT FK_AF382D4EAB627E8B FOREIGN KEY (presentation_id) REFERENCES presentation (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE checkout');
    }
}
