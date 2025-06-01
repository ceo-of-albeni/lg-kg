from django.db import models


class Catalog(models.Model):
    title = models.CharField(max_length=255)
    file_link = models.URLField()
    cover = models.ImageField(upload_to='catalogs/covers/')

    def __str__(self):
        return self.title
