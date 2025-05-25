from django.db import models


class News(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    body = models.TextField()
    image = models.ImageField(upload_to='images/', blank=True)
    date = models.DateField()

    class Meta:
        verbose_name = "News"
        verbose_name_plural = "News"

    def __str__(self):
        return self.title
