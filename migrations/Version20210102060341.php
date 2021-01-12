<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210102060341 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE download_presentation DROP FOREIGN KEY FK_5EF25EE27E3C61F9');
        $this->addSql('DROP INDEX IDX_5EF25EE27E3C61F9 ON download_presentation');
        $this->addSql('ALTER TABLE download_presentation DROP owner_id');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE download_presentation ADD owner_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE download_presentation ADD CONSTRAINT FK_5EF25EE27E3C61F9 FOREIGN KEY (owner_id) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_5EF25EE27E3C61F9 ON download_presentation (owner_id)');
    }
}
