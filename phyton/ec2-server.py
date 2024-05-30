from flask import Flask, request, jsonify
import mysql.connector
import requests

app = Flask(__name__)

# Database configuration
db_config = {
    'user': 'admin',
    'password': 'iliketuna04;',
    'host': 'database-inglp.cresys2yulkk.us-east-1.rds.amazonaws.com',
    'database': 'cc'
}

# Endpoint to get all problems
@app.route('/problems', methods=['GET'])
def get_problems():
    try:
        # Establishing a connection to the database
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)

        # Executing the SQL query to fetch all problems
        cursor.execute("SELECT * FROM Problem")
        problems = cursor.fetchall()

        # Closing the database connection
        cursor.close()
        conn.close()

        # Returning the fetched data as JSON
        return jsonify(problems)
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500
    
# Endpoint to get all tests for a specific problem
@app.route('/test/<int:problem_id>', methods=['GET'])
def get_tests(problem_id):
    try:
        # Establishing a connection to the database
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)

        # Executing the SQL query to fetch tests for the specified problem_id
        query = "SELECT * FROM Test WHERE problem_id = %s"
        cursor.execute(query, (problem_id,))
        tests = cursor.fetchall()

        # Closing the database connection
        cursor.close()
        conn.close()

        # Returning the fetched data as JSON
        return jsonify(tests)
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500
    

@app.route('/results', methods=['POST'])
def store_results():
    data = request.get_json()
    print(data)
    
    success = data.get('success')
    failed = data.get('failed')
    problem_id = data.get('problem_id')

    if success is None or failed is None or problem_id is None:
        return jsonify({"error": "Missing required fields"}), 400

    connection = mysql.connector.connect(**db_config)
    cursor = connection.cursor(dictionary=True)
    
    try:
        # Insert the test result into the database
        insert_query = """
        INSERT INTO TestResults (problem_id, success, failed)
        VALUES (%s, %s, %s)
        """
        cursor.execute(insert_query, (problem_id, success, failed))
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({"message": "Test results stored successfully"}), 201
    except Exception as e:
        cursor.close()
        connection.close()
        return jsonify({"error": str(e)}), 500
    

@app.route('/results', methods=['GET'])
def get_results():
    connection = mysql.connector.connect(**db_config)
    cursor = connection.cursor(dictionary=True)
    
    try:
        # Retrieve all test results from the database
        select_query = "SELECT * FROM TestResult"
        cursor.execute(select_query)
        results = cursor.fetchall()
        return jsonify(results), 200
    except Exception as e:
        return jsonify({"error": f"Unexpected error: {e}"}), 500
    finally:
        cursor.close()
        connection.close()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
