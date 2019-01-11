import zerorpc
import time
from pymodel import FastaiImageClassifier
from timeit import default_timer as timer


class PyServer(object):
    def __init__(self):
        try:
            self.start = timer()
            # time.sleep(5)
            self.model = FastaiImageClassifier()
            self.end = timer()
        except Exception as e:
            raise Exception(str(e))

    def start_pyserver(self):
        return "Py server started in " + str(round(self.end - self.start, 2)) + " s"

    def predict_image(self, image_path):
        time.sleep(10)  #to trigger H12 timeout error in heroku 
        return "Image in {} is dummy".format(image_path)

s = zerorpc.Server(PyServer())
s.bind("tcp://0.0.0.0:4242")
s.run()