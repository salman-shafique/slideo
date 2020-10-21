<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201021084949 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE color_template (id INT AUTO_INCREMENT NOT NULL, presentation_id INT DEFAULT NULL, accent_1 VARCHAR(7) NOT NULL, accent_2 VARCHAR(7) NOT NULL, accent_3 VARCHAR(7) NOT NULL, accent_4 VARCHAR(7) NOT NULL, accent_5 VARCHAR(7) NOT NULL, accent_6 VARCHAR(7) NOT NULL, background_1 VARCHAR(7) NOT NULL, background_2 VARCHAR(7) NOT NULL, text_1 VARCHAR(7) NOT NULL, text_2 VARCHAR(7) NOT NULL, title VARCHAR(255) NOT NULL, INDEX IDX_4BE584C1AB627E8B (presentation_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE color_template ADD CONSTRAINT FK_4BE584C1AB627E8B FOREIGN KEY (presentation_id) REFERENCES presentation (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE color_template');
    }
}
