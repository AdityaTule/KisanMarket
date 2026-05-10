from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Use an environment variable for the database if available (for future Postgres)
# Otherwise, use the local kisan.db
db_path = os.path.join(os.path.dirname(__file__), 'kisan.db')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + db_path
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    phone = db.Column(db.String(15), unique=True)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    quantity = db.Column(db.String(50))
    price = db.Column(db.String(50))
    farmer_name = db.Column(db.String(100))
    farmer_phone = db.Column(db.String(15))

with app.app_context():
    db.create_all()

@app.route('/')
def health_check():
    return "KisanMarket API is Running!"

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(phone=data['phone']).first()
    if not user:
        user = User(name=data['name'], phone=data['phone'])
        db.session.add(user)
        db.session.commit()
    return jsonify({"id": user.id, "name": user.name, "phone": user.phone})

@app.route('/api/products', methods=['GET', 'POST'])
def handle_products():
    if request.method == 'POST':
        data = request.json
        new_p = Product(
            name=data['name'], quantity=data['qty'], price=data['price'],
            farmer_name=data['farmer_name'], farmer_phone=data['farmer_phone']
        )
        db.session.add(new_p)
        db.session.commit()
        return jsonify({"msg": "Success"})
    
    products = Product.query.all()
    return jsonify([{
        'id': p.id, 'name': p.name, 'qty': p.qty, 
        'price': p.price, 'farmer': p.farmer_name, 'phone': p.farmer_phone
    } for p in products])

if __name__ == '__main__':
    # Use port from environment variable for deployment
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)