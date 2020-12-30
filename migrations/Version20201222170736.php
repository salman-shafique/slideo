<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201222170736 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE slide ADD color_template_id INT NOT NULL');
        $this->addSql('ALTER TABLE slide ADD CONSTRAINT FK_72EFEE6279A372B4 FOREIGN KEY (color_template_id) REFERENCES color_template (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_72EFEE6279A372B4 ON slide (color_template_id)');
        $this->addSql('ALTER TABLE style ADD color_template_id INT NOT NULL');
        $this->addSql('ALTER TABLE style ADD CONSTRAINT FK_33BDB86A79A372B4 FOREIGN KEY (color_template_id) REFERENCES color_template (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_33BDB86A79A372B4 ON style (color_template_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE slide DROP FOREIGN KEY FK_72EFEE6279A372B4');
        $this->addSql('DROP INDEX UNIQ_72EFEE6279A372B4 ON slide');
        $this->addSql('ALTER TABLE slide DROP color_template_id');
        $this->addSql('ALTER TABLE style DROP FOREIGN KEY FK_33BDB86A79A372B4');
        $this->addSql('DROP INDEX UNIQ_33BDB86A79A372B4 ON style');
        $this->addSql('ALTER TABLE style DROP color_template_id');
    }
}
