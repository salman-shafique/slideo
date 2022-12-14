<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210809092748 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE style ADD company_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE style ADD CONSTRAINT FK_33BDB86A979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id)');
        $this->addSql('CREATE INDEX IDX_33BDB86A979B1AD6 ON style (company_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE style DROP FOREIGN KEY FK_33BDB86A979B1AD6');
        $this->addSql('DROP INDEX IDX_33BDB86A979B1AD6 ON style');
        $this->addSql('ALTER TABLE style DROP company_id');
    }
}
