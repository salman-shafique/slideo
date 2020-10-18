import os
import mysql.connector

PUBLIC_PATH = "/var/www/app/public"


# parse symfony's .env file
if os.path.exists("/var/www/app/.env.local"):
    # First check local env
    env_file = open("/var/www/app/.env.local", "r")
else:
    env_file = open("/var/www/app/.env", "r")

for line in env_file.readlines():
    line = line.strip().replace("\n", "")
    if "DATABASE_URL" == line[: len("DATABASE_URL")]:
        DB_USER = line.split("//")[1].split(":")[0]
        DB_PASSWORD = line.split("@")[0].split(":")[-1]
        DB_NAME = line.split("/")[-1].split("?")[0]

        UNIX_SOCKET = False
        DB_HOST = False
        DB_PORT = False
        DB=False
        if "unix_socket" in line:
            # Connection with socket
            #DATABASE_URL=mysql://slideo:xhtpWpZ.47-.YuzLKx@localhost/slideo?unix_socket=/var/run/mysqld/mysqld.sock
            
            DB_NAME = line.split("?")[0].split("/")[1]
            UNIX_SOCKET = line.split("unix_socket=")[1]
            #DB = mysql.connector.connect( user=DB_USER, passwd=DB_PASSWORD, database=DB_NAME,unix_socket=UNIX_SOCKET)
        else:
            DB_HOST = line.split("@")[1].split(":")[0]
            DB_PORT = int(line.split(":")[-1].split("/")[0])
            #DB = mysql.connector.connect(host=DB_HOST,port=DB_PORT, user=DB_USER, passwd=DB_PASSWORD, database=DB_NAME)

        continue
    if "THENOUNPROJECT_KEY" == line[: len("THENOUNPROJECT_KEY")]:
        THENOUNPROJECT_KEY = line.split("=")[1].strip()
        continue
    if "THENOUNPROJECT_SECRET" == line[: len("THENOUNPROJECT_SECRET")]:
        THENOUNPROJECT_SECRET = line.split("=")[1].strip()
        continue
