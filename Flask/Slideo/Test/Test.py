import os

class Test(object):

    def test(self, args):
        return [args,os.getcwd()]

