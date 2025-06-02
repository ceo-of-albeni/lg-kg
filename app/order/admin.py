from django.contrib import admin
from .models import Order


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'name', 'email', 'phone', 'user', 'project_name',
        'status', 'estimated_realization_date', 'odu_placing'
    )
    list_filter = ('status', 'odu_placing', 'building_type', 'cac_system_type')
    search_fields = ('name', 'email', 'phone', 'project_name', 'clicked_product_name')
    readonly_fields = ('file_link',)

    fieldsets = (
        ('User Info', {
            'fields': ('user', 'name', 'email', 'phone')
        }),
        ('Project Details', {
            'fields': (
                'project_name', 'project_address', 'estimated_realization_date',
                'building_type', 'building_floors', 'cac_system_type', 'cac_idu_type',
                'capacity_per_m2', 'piping_type', 'odu_placing'
            )
        }),
        ('Additional Info', {
            'fields': ('clicked_product_name', 'comment', 'accessories', 'remarks', 'file_link')
        }),
        ('Status', {
            'fields': ('status',)
        }),
    )
