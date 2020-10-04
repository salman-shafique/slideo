import sys
import time
import threading
from argparse import ArgumentParser
from Pyro5 import config, core, server, nameserver

@server.expose
class EchoServer(object):
    def echo(self):
        return  "hello"

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


d = server.Daemon(host="localhost", port=5400)
echo = EchoServer()
objectName = "slideo"
uri = d.register(echo, objectName)

host, port = ns.uri.host, ns.uri.port

ns = core.locate_ns(host, port)
ns.register(objectName, uri)


print("using name server at %s" % ns._pyroUri)

d.requestLoop(loopCondition=lambda:True)