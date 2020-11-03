<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201103094706 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE content ADD slide_id INT DEFAULT NULL, ADD style_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE content ADD CONSTRAINT FK_FEC530A9DD5AFB87 FOREIGN KEY (slide_id) REFERENCES slide (id)');
        $this->addSql('ALTER TABLE content ADD CONSTRAINT FK_FEC530A9BACD6074 FOREIGN KEY (style_id) REFERENCES style (id)');
        $this->addSql('CREATE INDEX IDX_FEC530A9DD5AFB87 ON content (slide_id)');
        $this->addSql('CREATE INDEX IDX_FEC530A9BACD6074 ON content (style_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE content DROP FOREIGN KEY FK_FEC530A9DD5AFB87');
        $this->addSql('ALTER TABLE content DROP FOREIGN KEY FK_FEC530A9BACD6074');
        $this->addSql('DROP INDEX IDX_FEC530A9DD5AFB87 ON content');
        $this->addSql('DROP INDEX IDX_FEC530A9BACD6074 ON content');
        $this->addSql('ALTER TABLE content DROP slide_id, DROP style_id');
    }
}
