# Generated by Django 3.1.7 on 2021-03-09 14:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("uploads", "0004_add_model_details"),
    ]

    operations = [
        migrations.AlterField(
            model_name="model",
            name="tags",
            field=models.ManyToManyField(blank=True, to="uploads.Tag"),
        ),
    ]
