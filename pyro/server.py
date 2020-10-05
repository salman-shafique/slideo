import sys
import time
import threading
from argparse import ArgumentParser
from Pyro5 import config, core, server, nameserver
import Slideo

@server.expose
class Server(object):
    def call(self,**vargs):
        print(vargs)
        class_ = getattr(Slideo, vargs['class'])
        method = getattr(class_, vargs['method'])
        return method(**vargs)
    
class NameServer(threading.Thread):
    def __init__(self, hostname):
        super(NameServer, self).__init__()
        self.setDaemon(1)
        self.hostname = hostname
        self.started = threading.Event()

    def run(self):
        self.uri, self.ns_daemon, self.bc_server = nameserver.start_ns(self.hostname)
        self.started.set()
        if self.bc_server:
            self.bc_server.runInThread()
        self.ns_daemon.requestLoop()

ns = NameServer("localhost")
ns.start()
ns.started.wait()
ns = core.locate_ns(ns.uri.host, ns.uri.port)

d = server.Daemon(host="localhost", port=5001)
uri = d.register(Server(), "Slideo")

ns.register("Slideo", uri)
print("Slideo object at %s" % uri)

d.requestLoop(loopCondition=lambda:True)