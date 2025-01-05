from django.db import models

class TruckLog(models.Model):
    veicle_image_front = models.CharField(max_length=255, null=True, blank=True)
    veicle_image_back = models.CharField(max_length=255, null=True, blank=True)
    veicle_image_side = models.CharField(max_length=255, null=True, blank=True)
    lp_code = models.CharField(max_length=255, null=True, blank=True) 
    lp_image = models.CharField(max_length=255, null=True, blank=True)
    plate_type = models.CharField(max_length=255, null=True, blank=True)
    container_code = models.CharField(max_length=255, null=True, blank=True)
    container_image = models.CharField(max_length=255, null=True, blank=True)
    load_type = models.CharField(max_length=255, null=True, blank=True)
    seal = models.BooleanField(default=False)
    imdg = models.BooleanField(default=False)
    driver_id = models.CharField(max_length=255, null=True, blank=True)
    driver_face = models.CharField(max_length=255, null=True, blank=True)
    entry_direction = models.IntegerField(null=True, blank=True)
    log_time = models.CharField(max_length=255, null=True, blank=True)
    camera_number = models.IntegerField(null=True, blank=True)
    gate_id = models.CharField(max_length=255, null=True, blank=True)
    lp_acc = models.FloatField(null=True, blank=True)
    container_acc = models.FloatField(null=True, blank=True)
    door_direction = models.FloatField(null=True, blank=True)

    def __str__(self):
        return f"Truck Log {self.id}"
