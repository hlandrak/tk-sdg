# Generated by Django 4.0.2 on 2022-03-16 07:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sdg', '0006_alter_document_sdg_strength_sdgcount'),
    ]

    operations = [
        migrations.DeleteModel(
            name='SDGCount',
        ),
    ]
