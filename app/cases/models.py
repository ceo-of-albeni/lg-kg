from django.db import models


class Case(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    body = models.TextField()
    image = models.ImageField(upload_to='images/')
    address = models.CharField(max_length=255)
    date = models.DateField()
    company = models.CharField(max_length=255)

    def __str__(self):
        return self.title
