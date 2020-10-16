import os
import mysql.connector

from .. import env



# DOWNLOAD THE PRESENTATION
class Test(object):
    def __init__(self):
        self.db = mysql.connector.connect(host=env.DB_HOST,port=env.DB_PORT, user=env.DB_USER, passwd=env.DB_PASSWORD, database=env.DB_NAME)

    def test(self, args):
        cur =  self.db.cursor()
        cur.execute("SELECT * FROM doctrine_migration_versions WHERE 1")
        data = cur.fetchall()
        return data
    

