<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210111075845 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE slide DROP FOREIGN KEY FK_72EFEE62C93D69EA');
        $this->addSql('DROP INDEX IDX_72EFEE62C93D69EA ON slide');
        $this->addSql('ALTER TABLE slide DROP background_id');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE slide ADD background_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE slide ADD CONSTRAINT FK_72EFEE62C93D69EA FOREIGN KEY (background_id) REFERENCES content (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_72EFEE62C93D69EA ON slide (background_id)');
    }
}
