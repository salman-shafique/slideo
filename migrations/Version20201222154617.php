<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201222154617 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE color_template DROP FOREIGN KEY FK_4BE584C17E3C61F9');
        $this->addSql('DROP INDEX IDX_4BE584C17E3C61F9 ON color_template');
        $this->addSql('ALTER TABLE color_template DROP owner_id, DROP title, DROP description, DROP is_active');
        $this->addSql('ALTER TABLE presentation DROP color_template_id');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE color_template ADD owner_id INT DEFAULT NULL, ADD title VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, ADD description VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, ADD is_active TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE color_template ADD CONSTRAINT FK_4BE584C17E3C61F9 FOREIGN KEY (owner_id) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_4BE584C17E3C61F9 ON color_template (owner_id)');
        $this->addSql('ALTER TABLE presentation ADD color_template_id INT DEFAULT NULL');
    }
}
