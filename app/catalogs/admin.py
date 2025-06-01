from django.contrib import admin
from django.utils.html import format_html
from .models import Catalog


@admin.register(Catalog)
class CatalogAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'cover_preview', 'file_link')
    search_fields = ('title',)
    readonly_fields = ('cover_preview',)

    def cover_preview(self, obj):
        if obj.cover:
            return format_html('<img src="{}" style="height: 100px;"/>', obj.cover.url)
        return "-"
    cover_preview.short_description = 'Cover'
