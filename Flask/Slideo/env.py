import os

PUBLIC_PATH = "/var/www/app/public"



# parse symfony's .env file
if os.path.exists("/var/www/app/.env.local"):
    # First check local env
    env_file = open("/var/www/app/.env.local", "r")
else:
    env_file = open("/var/www/app/.env", "r")

for line in env_file.readlines():
    line = line.strip().replace("\n","")
    if "DATABASE_URL" in line:
        DB_HOST = line.split("@")[1].split(":")[0]
        DB_PORT = int(line.split(":")[-1].split("/")[0])
        DB_USER = line.split("//")[1].split(":")[0]
        DB_PASSWORD = line.split("@")[0].split(":")[-1]
        DB_NAME = line.split("/")[-1].split("?")[0]
        continue
    if "THENOUNPROJECT_KEY" in line:
        THENOUNPROJECT_KEY = line.split("=")[1].strip()
        continue
    if "THENOUNPROJECT_SECRET" in line:
        THENOUNPROJECT_SECRET = line.split("=")[1].strip()
        continue
