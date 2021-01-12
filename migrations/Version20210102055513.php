<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210102055513 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE download_presentation (id INT AUTO_INCREMENT NOT NULL, owner_id INT DEFAULT NULL, presentation_id INT NOT NULL, pptx_file LONGTEXT DEFAULT NULL, prev_file LONGTEXT DEFAULT NULL, pdf_file LONGTEXT DEFAULT NULL, number_of_slides INT NOT NULL, completed TINYINT(1) NOT NULL, created DATETIME NOT NULL, updated DATETIME NOT NULL, INDEX IDX_5EF25EE27E3C61F9 (owner_id), INDEX IDX_5EF25EE2AB627E8B (presentation_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE download_presentation ADD CONSTRAINT FK_5EF25EE27E3C61F9 FOREIGN KEY (owner_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE download_presentation ADD CONSTRAINT FK_5EF25EE2AB627E8B FOREIGN KEY (presentation_id) REFERENCES presentation (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE download_presentation');
    }
}
