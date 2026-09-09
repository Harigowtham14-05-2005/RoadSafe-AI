import csv
import random
import datetime

# Seed for reproducibility
random.seed(42)

# Locations & Hotspot centroids
HOTSPOTS = [
    {"name": "NH-44 Highway Mile 142", "lat": 28.6139, "lng": 77.2090, "speed": 100, "type": "Highway", "risk_bias": "high"},
    {"name": "Outer Ring Road Junction 14", "lat": 28.5355, "lng": 77.3910, "speed": 80, "type": "Dual carriageway", "risk_bias": "high"},
    {"name": "Grand Trunk Road Corridor B", "lat": 28.7041, "lng": 77.1025, "speed": 60, "type": "Single carriageway", "risk_bias": "high"},
    {"name": "Expressway Interchange South", "lat": 28.4595, "lng": 77.0266, "speed": 120, "type": "Highway", "risk_bias": "medium"},
    {"name": "Central Metro Boulevard", "lat": 28.6289, "lng": 77.2065, "speed": 50, "type": "Roundabout", "risk_bias": "medium"},
    {"name": "East River Bridge Crossing", "lat": 28.6012, "lng": 77.2405, "speed": 40, "type": "Single carriageway", "risk_bias": "low"},
    {"name": "West Urban Junction 8", "lat": 28.6400, "lng": 77.1200, "speed": 60, "type": "T-Junction", "risk_bias": "medium"},
    {"name": "Airport Expressway Tollway", "lat": 28.5562, "lng": 77.0999, "speed": 100, "type": "Highway", "risk_bias": "medium"},
    {"name": "Industrial Sector 18 Corridor", "lat": 28.5000, "lng": 77.3000, "speed": 60, "type": "Single carriageway", "risk_bias": "high"},
    {"name": "North Ring Junction 2", "lat": 28.7500, "lng": 77.1800, "speed": 80, "type": "Dual carriageway", "risk_bias": "medium"},
]

WEATHER_OPTS = ["Clear", "Rain", "Fog", "Storm", "Other"]
WEATHER_WEIGHTS = [0.60, 0.22, 0.10, 0.05, 0.03]

SURFACE_OPTS = ["Dry", "Wet", "Icy", "Poor surface", "Unknown"]
LIGHT_OPTS = ["Daylight", "Darkness: street lights present and lit", "Darkness: no street lights", "Darkness: street lights unlit"]
VEHICLE_OPTS = ["Car", "Motorcycle", "Truck / Heavy Goods", "Bus", "Van / Light Goods", "Bicycle"]
JUNCTION_OPTS = ["Not at junction", "T-Junction", "Crossroads", "Roundabout", "Slip road / Merge ramp", "Multiple junction"]
URBAN_RURAL_OPTS = ["Urban", "Rural"]
GENDER_OPTS = ["Male", "Female"]

start_date = datetime.date(2025, 1, 1)
end_date = datetime.date(2026, 8, 25)
days_range = (end_date - start_date).days

records = []

for i in range(1, 5001):
    accident_id = f"ACC-2026-{i:05d}"
    
    # Assign date
    random_days = random.randint(0, days_range)
    cur_date = start_date + datetime.timedelta(days=random_days)
    date_str = cur_date.strftime("%Y-%m-%d")
    
    # Assign time with peak hours weighting
    hour_roll = random.random()
    if hour_roll < 0.28: # Evening peak 17:00 - 21:00
        hour = random.randint(17, 21)
    elif hour_roll < 0.52: # Morning peak 07:00 - 10:00
        hour = random.randint(7, 10)
    elif hour_roll < 0.72: # Daytime 11:00 - 16:00
        hour = random.randint(11, 16)
    elif hour_roll < 0.88: # Late night 22:00 - 02:00
        hour = random.choice([22, 23, 0, 1, 2])
    else: # Early morning 03:00 - 06:00
        hour = random.randint(3, 6)
        
    minute = random.randint(0, 59)
    time_str = f"{hour:02d}:{minute:02d}"
    
    # Pick location
    hotspot = random.choice(HOTSPOTS)
    # Add slight geo jitter (+/- 0.015 deg)
    lat = round(hotspot["lat"] + random.uniform(-0.015, 0.015), 6)
    lng = round(hotspot["lng"] + random.uniform(-0.015, 0.015), 6)
    location_name = hotspot["name"]
    region = "Capital Metropolitan Corridor" if "Ring" in location_name or "Boulevard" in location_name else "Northern Expressway District"
    
    # Environmental parameters
    weather = random.choices(WEATHER_OPTS, weights=WEATHER_WEIGHTS)[0]
    
    if weather in ["Rain", "Storm"]:
        road_surface = random.choices(SURFACE_OPTS, weights=[0.1, 0.75, 0.05, 0.08, 0.02])[0]
    elif weather == "Fog":
        road_surface = random.choices(SURFACE_OPTS, weights=[0.4, 0.45, 0.05, 0.08, 0.02])[0]
    else:
        road_surface = random.choices(SURFACE_OPTS, weights=[0.82, 0.08, 0.01, 0.07, 0.02])[0]
        
    # Light condition based on hour
    if 6 <= hour <= 18:
        light_condition = "Daylight"
    else:
        if hotspot["type"] == "Highway" and hotspot["risk_bias"] == "high":
            light_condition = random.choices(LIGHT_OPTS[1:], weights=[0.35, 0.55, 0.10])[0]
        else:
            light_condition = random.choices(LIGHT_OPTS[1:], weights=[0.75, 0.15, 0.10])[0]
            
    speed_limit = hotspot["speed"]
    road_type = hotspot["type"]
    junction_type = random.choices(JUNCTION_OPTS, weights=[0.35, 0.25, 0.18, 0.10, 0.08, 0.04])[0]
    urban_rural = "Rural" if hotspot["type"] == "Highway" or "Corridor" in location_name else "Urban"
    
    # Vehicle & Casualty counts
    num_vehicles = random.choices([1, 2, 3, 4, 5], weights=[0.25, 0.55, 0.14, 0.04, 0.02])[0]
    num_casualties = random.choices([1, 2, 3, 4, 6], weights=[0.68, 0.22, 0.06, 0.03, 0.01])[0]
    vehicle_type = random.choices(VEHICLE_OPTS, weights=[0.45, 0.25, 0.15, 0.08, 0.05, 0.02])[0]
    driver_gender = random.choices(GENDER_OPTS, weights=[0.72, 0.28])[0]
    driver_age = random.choices([21, 28, 35, 46, 58, 68], weights=[0.18, 0.32, 0.26, 0.14, 0.07, 0.03])[0] + random.randint(-2, 3)
    
    # Compute realistic severity & risk score
    risk_points = 20
    if speed_limit >= 100: risk_points += 28
    elif speed_limit >= 80: risk_points += 18
    elif speed_limit >= 60: risk_points += 8
    
    if road_surface in ["Wet", "Icy", "Poor surface"]: risk_points += 18
    if weather in ["Rain", "Fog", "Storm"]: risk_points += 14
    if "no street lights" in light_condition or "unlit" in light_condition: risk_points += 20
    elif "Darkness" in light_condition: risk_points += 10
    
    if num_casualties >= 2: risk_points += 12
    if num_vehicles >= 3: risk_points += 10
    if vehicle_type in ["Motorcycle", "Truck / Heavy Goods"]: risk_points += 10
    if urban_rural == "Rural": risk_points += 6
    
    risk_score = min(max(risk_points + random.randint(-8, 8), 10), 98)
    
    if risk_score >= 78 or (speed_limit >= 100 and light_condition == "Darkness: no street lights" and random.random() < 0.6):
        severity = "Fatal" if (risk_score >= 86 or random.random() < 0.38) else "Serious"
    elif risk_score >= 50 or (road_surface == "Wet" and random.random() < 0.45):
        severity = "Serious" if random.random() < 0.62 else "Minor"
    else:
        severity = "Minor" if random.random() < 0.90 else "Serious"
        
    records.append({
        "accident_id": accident_id,
        "date": date_str,
        "time": time_str,
        "latitude": lat,
        "longitude": lng,
        "location_name": location_name,
        "region": region,
        "weather": weather,
        "road_surface": road_surface,
        "light_condition": light_condition,
        "road_type": road_type,
        "junction_type": junction_type,
        "speed_limit": speed_limit,
        "vehicle_type": vehicle_type,
        "number_of_vehicles": num_vehicles,
        "number_of_casualties": num_casualties,
        "urban_rural": urban_rural,
        "driver_age": driver_age,
        "driver_gender": driver_gender,
        "risk_score": risk_score,
        "severity": severity
    })

fieldnames = list(records[0].keys())

with open("backend_r/sample_accidents.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(records)

print(f"Generated {len(records)} realistic accident records in backend_r/sample_accidents.csv")
