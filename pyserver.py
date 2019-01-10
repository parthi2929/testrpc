import zerorpc

class PyServer(object):
    def start_pyserver(self):
        return "Py server started"

    def predict_image(self, image_path):
        return "Image in {} is dummy".format(image_path)

s = zerorpc.Server(PyServer())
s.bind("tcp://0.0.0.0:4242")
s.run()