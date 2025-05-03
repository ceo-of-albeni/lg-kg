from django.db import models
from accounts.models import User


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True, related_name='orders')
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    comment = models.TextField(blank=True, null=True)
    clicked_product_name = models.CharField(max_length=255, blank=True, null=True)
    project_name = models.CharField(max_length=255, blank=True, null=True)
    project_address = models.TextField(blank=True, null=True)
    estimated_realization_date = models.DateField(blank=True, null=True)
    bulding_type = models.CharField(max_length=255, blank=True, null=True)
    building_floors = models.PositiveIntegerField(blank=True, null=True)
    cac_system_type = models.CharField(max_length=255, blank=True, null=True)
    cac_idu_type = models.CharField(max_length=255, blank=True, null=True)
    capacity_per_m2 = models.CharField(max_length=255, blank=True, null=True)
    piping_type = models.CharField(max_length=255, blank=True, null=True)
    odu_placing = models.CharField(max_length=255)
    accessories = models.TextField(blank=True, null=True)
    remarks = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=[('Pending', 'Pending'), ('Done', 'Done')])
    file_link = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"Order #{self.pk} by {self.name}"