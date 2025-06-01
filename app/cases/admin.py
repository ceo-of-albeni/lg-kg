from django.contrib import admin
from django.utils.html import format_html
from .models import Case


@admin.register(Case)
class CaseAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'company', 'date', 'image_preview')
    search_fields = ('title', 'company', 'address', 'description')
    list_filter = ('date', 'company')
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="height: 100px;" />', obj.image.url)
        return "-"
    image_preview.short_description = 'Image'
