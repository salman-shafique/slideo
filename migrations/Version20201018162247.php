<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201018162247 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE analyzed_content');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE analyzed_content (id INT AUTO_INCREMENT NOT NULL, h1_id INT DEFAULT NULL, h1_image_id INT DEFAULT NULL, icon_id INT DEFAULT NULL, original_sentence_id INT DEFAULT NULL, slide_id INT DEFAULT NULL, status VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, created DATETIME NOT NULL, updated DATETIME NOT NULL, INDEX IDX_2DC4A71CDD5AFB87 (slide_id), UNIQUE INDEX UNIQ_2DC4A71C54B9D732 (icon_id), UNIQUE INDEX UNIQ_2DC4A71CBEF74877 (h1_id), UNIQUE INDEX UNIQ_2DC4A71CD02774BA (original_sentence_id), UNIQUE INDEX UNIQ_2DC4A71CF3CD5B34 (h1_image_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE analyzed_content ADD CONSTRAINT FK_2DC4A71C54B9D732 FOREIGN KEY (icon_id) REFERENCES content (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE analyzed_content ADD CONSTRAINT FK_2DC4A71CBEF74877 FOREIGN KEY (h1_id) REFERENCES content (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE analyzed_content ADD CONSTRAINT FK_2DC4A71CD02774BA FOREIGN KEY (original_sentence_id) REFERENCES content (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE analyzed_content ADD CONSTRAINT FK_2DC4A71CDD5AFB87 FOREIGN KEY (slide_id) REFERENCES slide (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE analyzed_content ADD CONSTRAINT FK_2DC4A71CF3CD5B34 FOREIGN KEY (h1_image_id) REFERENCES content (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
    }
}
