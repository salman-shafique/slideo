import os
from .. import env
class Test(object):
    def __init__(self):
        self.db = env.DB

    def test(self, args):
        return ["TEST"]
        cur =  self.db.cursor()
        cur.execute("SELECT * FROM doctrine_migration_versions WHERE 1")
        data = cur.fetchall()
        return data
    

