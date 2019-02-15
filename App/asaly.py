from flask import Flask
app = Flask(__name__)

@app.route('/Web/')
def hello_world():
	return 'index'