from django.db import models
from django.contrib.auth.models import User
from backend.core.models import Currency
    
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    language = models.CharField(max_length = 5)
    currency = models.ForeignKey(Currency, verbose_name = 'main Currency', on_delete=models.CASCADE)
    # Some data like statistics or enything related to the user will be here

    def __str__(self):
        return f'{self.user.username} Profile'
