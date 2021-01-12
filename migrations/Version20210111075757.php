<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210111075757 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE style ADD background_id INT NOT NULL');
        $this->addSql('ALTER TABLE style ADD CONSTRAINT FK_33BDB86AC93D69EA FOREIGN KEY (background_id) REFERENCES content (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_33BDB86AC93D69EA ON style (background_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE style DROP FOREIGN KEY FK_33BDB86AC93D69EA');
        $this->addSql('DROP INDEX UNIQ_33BDB86AC93D69EA ON style');
        $this->addSql('ALTER TABLE style DROP background_id');
    }
}
