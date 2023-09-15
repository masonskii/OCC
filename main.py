import subprocess
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/runcode', methods=['POST'])
def run_code():
    code = request.json['code']
    language = request.json['language']

    # If language is Python, use the same logic as before
    if language == 'python':
        try:
            import io
            from contextlib import redirect_stdout

            f = io.StringIO()
            with redirect_stdout(f):
                exec(code, {}, {'output': None})

            output = f.getvalue().strip()
            error = None
        except Exception as e:
            output = ''
            error = str(e)

        result = {
            'output': output,
            'error': error
        }

    # If language is C++, compile and execute the code
    elif language == 'cpp':
        try:
            # Write the code to a file
            with open('builds/cpp/code.cpp', 'w') as file:
                file.write(code)

            # Compile the code
            compile_cmd = ['g++', 'builds/cpp/code.cpp', '-o', 'builds/cpp/code']
            subprocess.run(compile_cmd, check=True)

            # Execute the compiled code
            execute_cmd = ['builds/cpp/code']
            process = subprocess.run(execute_cmd, capture_output=True, text=True)

            # Get the output and error (if any)
            output = process.stdout.strip()
            error = process.stderr.strip() or None
        except subprocess.CalledProcessError as e:
            output = ''
            error = e.stderr.strip() or str(e)
        except Exception as e:
            output = ''
            error = str(e)

        result = {
            'output': output,
            'error': error
        }
    elif language == 'c':
        try:
            # Write the code to a file
            with open('builds/c/code.c', 'w') as file:
                file.write(code)

            # Compile the code
            compile_cmd = ['gcc', 'builds/c/code.c', '-o', 'builds/c/code']
            subprocess.run(compile_cmd, check=True)

            # Execute the compiled code
            execute_cmd = ['builds/c/code']
            process = subprocess.run(execute_cmd, capture_output=True, text=True)

            # Get the output and error (if any)
            output = process.stdout.strip()
            error = process.stderr.strip() or None
        except subprocess.CalledProcessError as e:
            output = ''
            error = e.stderr.strip() or str(e)
        except Exception as e:
            output = ''
            error = str(e)

        result = {
            'output': output,
            'error': error
        }
    elif language == 'js':
        try:
            with open('builds/js/scripts.js', 'w') as file:
                file.write(code)
            execute_cmd = ['node', 'builds/js/scripts.js']
            process = subprocess.run(execute_cmd, capture_output=True, text=True)
            # Get the output and error (if any)
            output = process.stdout.strip()
            error = process.stderr.strip() or None
        except subprocess.CalledProcessError as e:
            output = ''
            error = e.stderr.strip() or str(e)
        except Exception as e:
            output = ''
            error = str(e)
        result = {
                'output': output,
                'error': error
            }
    # If language is C++, compile and execute the code
    elif language == 'cpp':
        try:
            # Write the code to a file
            with open('builds/cpp/code.cpp', 'w') as file:
                file.write(code)

            # Compile the code
            compile_cmd = ['g++', 'builds/cpp/code.cpp', '-o', 'builds/cpp/code']
            subprocess.run(compile_cmd, check=True)

            # Execute the compiled code
            execute_cmd = ['builds/cpp/code']
            process = subprocess.run(execute_cmd, capture_output=True, text=True)

            # Get the output and error (if any)
            output = process.stdout.strip()
            error = process.stderr.strip() or None
        except subprocess.CalledProcessError as e:
            output = ''
            error = e.stderr.strip() or str(e)
        except Exception as e:
            output = ''
            error = str(e)

        result = {
            'output': output,
            'error': error
        }
    elif language == 'c':
        try:
            # Write the code to a file
            with open('builds/c/code.c', 'w') as file:
                file.write(code)

            # Compile the code
            compile_cmd = ['gcc', 'builds/c/code.c', '-o', 'builds/c/code']
            subprocess.run(compile_cmd, check=True)

            # Execute the compiled code
            execute_cmd = ['builds/c/code']
            process = subprocess.run(execute_cmd, capture_output=True, text=True)

            # Get the output and error (if any)
            output = process.stdout.strip()
            error = process.stderr.strip() or None
        except subprocess.CalledProcessError as e:
            output = ''
            error = e.stderr.strip() or str(e)
        except Exception as e:
            output = ''
            error = str(e)

        result = {
            'output': output,
            'error': error
        }

    elif language == 'js':
        try:
            with open('builds/js/scripts.js', 'w') as file:
                file.write(code)
            execute_cmd = ['node', 'builds/js/scripts.js']
            process = subprocess.run(execute_cmd, capture_output=True, text=True)
            # Get the output and error (if any)
            output = process.stdout.strip()
            error = process.stderr.strip() or None
        except subprocess.CalledProcessError as e:
            output = ''
            error = e.stderr.strip() or str(e)
        except Exception as e:
            output = ''
            error = str(e)
        result = {
            'output': output,
            'error': error
        }
    elif language == 'go':
        try:
            with open('builds/go/execute.go', 'w') as file:
                file.write(code)
            compile_cmd = ['go', 'build', '-o', 'builds/go/execute.go']
            subprocess.run(compile_cmd, check=True)

            execute_cmd = ['builds/go/execute']
            process = subprocess.run(execute_cmd, capture_output=True, text=True)

            output = process.stdout.strip()
            error = process.stderr.strip() or None
        except subprocess.CalledProcessError as e:
            output = ''
            error = e.stderr.strip() or str(e)
        except Exception as e:
            output = ''
            error = str(e)

        result = {
            'output': output,
            'error': error
        }
    elif language == 'ruby':
        try:
            with open('builds/ruby/execute.rb', 'w') as file:
                file.write(code)
            execute_cmd = ['ruby', 'builds/ruby/execute.rb']
            process = subprocess.run(execute_cmd, capture_output=True, text=True)

            output = process.stdout.strip()
            error = process.stderr.strip() or None
        except subprocess.CalledProcessError as e:
            output = ''
            error = e.stderr.strip() or str(e)
        except Exception as e:
            output = ''
            error = str(e)

        result = {
            'output': output,
            'error': error
        }

    elif language == 'cs':
        # Execute C# code
        try:
            with open('builds/cs/main.cs', 'w') as file:
                file.write(code)

            compile_cmd = ['dotnet', 'build builds/cs/main.cs']
            subprocess.run(compile_cmd, check=True)

            execute_cmd = ['dotnet', 'run builds/cs/main.cs']
            process = subprocess.run(execute_cmd, capture_output=True, text=True)

            output = process.stdout.strip()
            error = process.stderr.strip() or None
        except subprocess.CalledProcessError as e:
            output = ''
            error = e.stderr.strip() or str(e)
        except Exception as e:
            output = ''
            error = str(e)

        result = {
            'output': output,
            'error': error
        }
    else:
        result = {
            'output': '',
            'error': 'Unsupported language'
        }
    return jsonify(result)




if __name__ == '__main__':
    app.run()