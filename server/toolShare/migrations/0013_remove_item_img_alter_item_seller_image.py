# Generated by Django 4.2.1 on 2023-07-04 15:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("toolShare", "0012_item_img_delete_itemimage"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="item",
            name="img",
        ),
        migrations.AlterField(
            model_name="item",
            name="seller",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="seller",
                to="toolShare.customuser",
            ),
        ),
        migrations.CreateModel(
            name="Image",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("img", models.ImageField(upload_to="images/")),
                (
                    "item",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="toolShare.item"
                    ),
                ),
            ],
        ),
    ]
