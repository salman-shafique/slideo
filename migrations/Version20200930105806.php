<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200930105806 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE analyzed_content (id INT AUTO_INCREMENT NOT NULL, h1_id INT DEFAULT NULL, h1_image_id INT DEFAULT NULL, icon_id INT DEFAULT NULL, original_sentence_id INT DEFAULT NULL, slide_id INT DEFAULT NULL, status VARCHAR(255) DEFAULT NULL, UNIQUE INDEX UNIQ_2DC4A71CBEF74877 (h1_id), UNIQUE INDEX UNIQ_2DC4A71CF3CD5B34 (h1_image_id), UNIQUE INDEX UNIQ_2DC4A71C54B9D732 (icon_id), UNIQUE INDEX UNIQ_2DC4A71CD02774BA (original_sentence_id), INDEX IDX_2DC4A71CDD5AFB87 (slide_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE content (id INT AUTO_INCREMENT NOT NULL, keyword VARCHAR(255) DEFAULT NULL, data JSON DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE presentation (id INT AUTO_INCREMENT NOT NULL, owner_id INT DEFAULT NULL, session_id VARCHAR(255) DEFAULT NULL, title VARCHAR(255) NOT NULL, is_active TINYINT(1) NOT NULL, INDEX IDX_9B66E8937E3C61F9 (owner_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE slide (id INT AUTO_INCREMENT NOT NULL, slide_title_id INT DEFAULT NULL, sub_title_id INT DEFAULT NULL, slide_title_image_id INT DEFAULT NULL, presentation_id INT NOT NULL, direction VARCHAR(255) DEFAULT NULL, lines_dic LONGTEXT NOT NULL, status VARCHAR(255) NOT NULL, style VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_72EFEE6273922698 (slide_title_id), UNIQUE INDEX UNIQ_72EFEE62B03069E4 (sub_title_id), UNIQUE INDEX UNIQ_72EFEE62A752396D (slide_title_image_id), INDEX IDX_72EFEE62AB627E8B (presentation_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE analyzed_content ADD CONSTRAINT FK_2DC4A71CBEF74877 FOREIGN KEY (h1_id) REFERENCES content (id)');
        $this->addSql('ALTER TABLE analyzed_content ADD CONSTRAINT FK_2DC4A71CF3CD5B34 FOREIGN KEY (h1_image_id) REFERENCES content (id)');
        $this->addSql('ALTER TABLE analyzed_content ADD CONSTRAINT FK_2DC4A71C54B9D732 FOREIGN KEY (icon_id) REFERENCES content (id)');
        $this->addSql('ALTER TABLE analyzed_content ADD CONSTRAINT FK_2DC4A71CD02774BA FOREIGN KEY (original_sentence_id) REFERENCES content (id)');
        $this->addSql('ALTER TABLE analyzed_content ADD CONSTRAINT FK_2DC4A71CDD5AFB87 FOREIGN KEY (slide_id) REFERENCES slide (id)');
        $this->addSql('ALTER TABLE presentation ADD CONSTRAINT FK_9B66E8937E3C61F9 FOREIGN KEY (owner_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE slide ADD CONSTRAINT FK_72EFEE6273922698 FOREIGN KEY (slide_title_id) REFERENCES content (id)');
        $this->addSql('ALTER TABLE slide ADD CONSTRAINT FK_72EFEE62B03069E4 FOREIGN KEY (sub_title_id) REFERENCES content (id)');
        $this->addSql('ALTER TABLE slide ADD CONSTRAINT FK_72EFEE62A752396D FOREIGN KEY (slide_title_image_id) REFERENCES content (id)');
        $this->addSql('ALTER TABLE slide ADD CONSTRAINT FK_72EFEE62AB627E8B FOREIGN KEY (presentation_id) REFERENCES presentation (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE analyzed_content DROP FOREIGN KEY FK_2DC4A71CBEF74877');
        $this->addSql('ALTER TABLE analyzed_content DROP FOREIGN KEY FK_2DC4A71CF3CD5B34');
        $this->addSql('ALTER TABLE analyzed_content DROP FOREIGN KEY FK_2DC4A71C54B9D732');
        $this->addSql('ALTER TABLE analyzed_content DROP FOREIGN KEY FK_2DC4A71CD02774BA');
        $this->addSql('ALTER TABLE slide DROP FOREIGN KEY FK_72EFEE6273922698');
        $this->addSql('ALTER TABLE slide DROP FOREIGN KEY FK_72EFEE62B03069E4');
        $this->addSql('ALTER TABLE slide DROP FOREIGN KEY FK_72EFEE62A752396D');
        $this->addSql('ALTER TABLE slide DROP FOREIGN KEY FK_72EFEE62AB627E8B');
        $this->addSql('ALTER TABLE analyzed_content DROP FOREIGN KEY FK_2DC4A71CDD5AFB87');
        $this->addSql('DROP TABLE analyzed_content');
        $this->addSql('DROP TABLE content');
        $this->addSql('DROP TABLE presentation');
        $this->addSql('DROP TABLE slide');
    }
}
