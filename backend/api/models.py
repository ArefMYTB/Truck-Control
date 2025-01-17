from django.db import models


class Truck(models.Model):
    vehicle_image_front = models.CharField(max_length=255, null=True, blank=True)
    vehicle_image_back = models.CharField(max_length=255, null=True, blank=True)
    lp_codes = models.JSONField(null=True, blank=True)
    lp_image = models.CharField(max_length=255, null=True, blank=True)
    lp_acc = models.JSONField(null=True, blank=True)
    plate_type = models.CharField(max_length=50, null=True, blank=True) #
    container_codes = models.JSONField(null=True, blank=True)
    container_image = models.CharField(max_length=255, null=True, blank=True)
    container_acc = models.JSONField(null=True, blank=True)
    Container_size = models.CharField(max_length=50)
    load_type = models.CharField(max_length=50, null=True, blank=True)
    seal = models.BooleanField(default=False)
    imdg = models.BooleanField(default=False) #
    driver_id = models.CharField(max_length=50, null=True, blank=True)
    driver_face = models.CharField(max_length=255, null=True, blank=True)
    driver_confirmed = models.BooleanField(default=False)
    entry_direction = models.IntegerField(null=True, blank=True) #
    log_time = models.CharField(max_length=50, null=True, blank=True)
    camera_number = models.IntegerField(null=True, blank=True) #
    gate_id = models.CharField(max_length=50, null=True, blank=True) #
    door_direction = models.FloatField(null=True, blank=True) #
    status = models.CharField(max_length=50)
    weight = models.CharField(max_length=20)

    # # LP Code Parsing
    # def parse_lp_codes(self):
    #     return [self._parse_lp_code(lp_code) for lp_code in self.lp_codes] if self.lp_codes else []
    #
    # # Container Code Parsing
    # def parse_container_codes(self):
    #     return [self._parse_container_code(container_code) for container_code in
    #             self.container_codes] if self.container_codes else []
    #
    # # Helper Methods
    # def _parse_lp_code(self, lp_code):
    #     if not lp_code:
    #         return None
    #     return {
    #         "part1": lp_code[:2],
    #         "part2": lp_code[7:] if len(lp_code) > 6 else None,
    #         "part3": lp_code[2:5],
    #         "part4": lp_code[5:7],
    #     }
    #
    # def _parse_container_code(self, container_code):
    #     if not container_code:
    #         return None
    #     return {
    #         "part1": container_code[:4],
    #         "part2": container_code[4:10],
    #         "part3": container_code[10:11],
    #         "part4": container_code[11:],
    #     }
    #
    # def __str__(self):
    #     return f"Truck with {len(self.lp_codes or [])} LP Codes / {len(self.container_codes or [])} Container Codes"



