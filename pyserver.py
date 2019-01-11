import zerorpc
import time
from pymodel import FastaiImageClassifier


class PyServer(object):
    def __init__(self):
        # time.sleep(5)
        self.model = FastaiImageClassifier()

    def start_pyserver(self):
        return "Py server started"

    def predict_image(self, image_path):
        time.sleep(10)  #to trigger H12 timeout error in heroku 
        return "Image in {} is dummy".format(image_path)

s = zerorpc.Server(PyServer())
s.bind("tcp://0.0.0.0:4242")
s.run()