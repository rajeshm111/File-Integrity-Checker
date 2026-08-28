from flask import Flask, render_template, request, jsonify
import hashlib

app = Flask(__name__)


def calculate_sha256(file):
    sha256_hash = hashlib.sha256()

    while True:
        data = file.read(4096)

        if not data:
            break

        sha256_hash.update(data)

    return sha256_hash.hexdigest()


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/calculate-hash", methods=["POST"])
def calculate_hash():

    if "file" not in request.files:
        return jsonify({
            "success": False,
            "message": "No file selected."
        })

    file = request.files["file"]

    if file.filename == "":
        return jsonify({
            "success": False,
            "message": "Please select a file."
        })

    file_hash = calculate_sha256(file)

    return jsonify({
        "success": True,
        "filename": file.filename,
        "hash": file_hash
    })


if __name__ == "__main__":
    app.run(debug=True)