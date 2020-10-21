import os
from .. import env

class Presentation(object):
    def __init__(self):
        self.db = env.DB

    def get_slides(self,presentaion_id):
        cur = self.db.cursor(dictionary=True)

        cur.execute("SELECT * FROM slide WHERE presentation_id='{}'".format(presentaion_id))
        raw_slides = cur.fetchall()

        slides = []
        for slide in raw_slides:
            pass

        return raw_slides

    def get_presentation(self, id):
        cur = self.db.cursor(dictionary=True)
        cur.execute("SELECT * FROM presentation WHERE id='{}'".format(id))
        presentaion = cur.fetchone()

        # Slides
        presentaion['slides'] = self.get_slides(id)

        return presentaion

    def download(self, args):
        presentaion = self.get_presentation(args['id'])

        return presentaion
    

