from flask import Flask
from flask import render_template
import webbrowser

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
	return render_template('index.html')



if __name__ == "__main__":
	webbrowser.open('http://localhost:5000')
	app.run()