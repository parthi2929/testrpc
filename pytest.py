from pymodel import FastaiImageClassifier
from timeit import default_timer as timer

start = timer()
model = FastaiImageClassifier()
end = timer()

print('model started in ' + str(end-start))

image_path = 'uploads/test.jpg'

result = model.predict(image_path)

print(result)