from flask import Flask, request, send_from_directory, render_template
import requests
import sys

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/<path:path>')
def send_js(path):
    return send_from_directory('static', path)

@app.route('/api', methods=['GET'])
def api():
    expression = request.args.get('expression')
    response = requests.get(f'https://newton.vercel.app/api/v2/simplify/{expression}')
    return response.json()

if __name__ == '__main__':
    if len(sys.argv) > 1:
        port = int(sys.argv[1])
    else:
        port = 8080
    app.run(port=port)