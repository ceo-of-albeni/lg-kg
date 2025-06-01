from django.contrib import admin
from .models import Category, Type, ProductModel, Product, Specs, Description


# Inline for specs (key-value pairs)
class SpecsInline(admin.TabularInline):
    model = Specs
    extra = 1
    verbose_name = "Specification"
    verbose_name_plural = "Specifications"


# Inline for descriptions
class DescriptionInline(admin.StackedInline):
    model = Description
    extra = 1
    verbose_name = "Description Block"
    verbose_name_plural = "Descriptions"


class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'product_model']
    inlines = [SpecsInline, DescriptionInline]
    prepopulated_fields = {"slug": ("name",)}  # Optional: auto-generate slug from name


admin.site.register(Product, ProductAdmin)
admin.site.register(Category)
admin.site.register(Type)
admin.site.register(ProductModel)
