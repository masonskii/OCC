import os
import io
import logging
import subprocess
from contextlib import redirect_stdout

from backend.src.executing.config import cfg

# Configure logging
logging.basicConfig(filename='./log/logfile.log', level=logging.DEBUG,
                    format='%(asctime)s %(levelname)s: %(message)s')


def create_code_file(path: str, text: str = None) -> bool:
    if not text:
        return False

    with open(path, "w") as file:
        file.write(text)

    logging.debug(f'Code file created at {path}')
    return True


def execute_code(params: dict = None) -> [str, str or None]:
    logging.info(params)
    if not params:
        return "", ""
    if params['language'] == 'python':
        logging.info(f"Start executing python code")
        return execute_python_code(params['code'])
    if params['language'] == 'c' or params['language'] == 'cpp':
        logging.info(f"start executing c or cpp code")
        return execute_c_code(params)
    if params['language'] == 'js':
        return execute_js_code(params)
    if params['language'] == 'cs':
        return execute_cs_code(params)
    if params['language'] == 'go':
        return execute_golang_code(params)
    if params['language'] == 'ruby':
        return execute_ruby_code(params)
    else:
        raise Exception('Unsupported language')


def execute_python_code(code: str) -> [str, str or None]:
    logging.info(f"start executing python code")
    f = io.StringIO()
    with redirect_stdout(f):
        exec(code, {}, {'output': None})
    output = f.getvalue().strip()
    logging.debug(f'Python code executed, output: {output}')
    return [output, None]


def execute_c_code(params: dict) -> [str, str or None]:
    if not params or len(params) == 0:
        raise ValueError("params is none or params len = 0")
    logging.info(f"start executing c or cpp code")
    language: str = params['language']
    code: str = params['code']

    path: str = f"builds/{language}/code.{language}"

    # Write the code to a file
    create_code_file(path, code)

    # Compile the code
    compiler = "g++" if language == "cpp" else "gcc"
    cmd: list[str] = [compiler, path, '-o', f"builds/{language}/code"]
    subprocess.run(cmd, check=True)
    logging.info(f'Code compiled with command: {" ".join(cmd)}')

    # Execute the compiled code
    execute_cmd: list[str] = [f"builds/{language}/code"]
    process: subprocess.CompletedProcess[str] = subprocess.run(
        execute_cmd, capture_output=True, text=True)
    logging.info(
        f'Code executed, stdout: {process.stdout.strip()}, stderr: {process.stderr.strip() or None}')
    return [process.stdout.strip(), process.stderr.strip() or None]


def execute_js_code(params: dict) -> [str, str or None]:
    if not params or len(params) == 0:
        raise ValueError("params is none or params len = 0")
    logging.info(f"start executing javascript code")
    language: str = params['language']
    code: str = params['code']

    path: str = f"builds/{language}/code.{language}"

    # Write the code to a file
    create_code_file(path, code)
    # Execute the compiled code
    execute_cmd: list[str] = ['node', path]
    process: subprocess.CompletedProcess[str] = subprocess.run(
        execute_cmd, capture_output=True, text=True)
    logging.info(
        f'Code executed, stdout: {process.stdout.strip()}, stderr: {process.stderr.strip() or None}')
    return [process.stdout.strip(), process.stderr.strip() or None]


def execute_cs_code(params: dict) -> [str, str or None]:
    if not params or len(params) == 0:
        raise ValueError("params is none or params len = 0")
    logging.info(f"start executing c# code")
    language: str = params['language']
    code: str = params['code']

    path: str = f"builds/{language}"
    code_file_path = f"{path}/Program.cs"

    # Create the directories if necessary
    os.makedirs(path, exist_ok=True)

    # Create a new C# console application
    subprocess.run(['dotnet', 'new', 'console', '-o',
                    path, '--force'], check=True)
    # Write the code to a file
    create_code_file(code_file_path, code)
    # Compile the code
    cmd: list[str] = ['dotnet', 'build', path]
    subprocess.run(cmd, check=True)
    logging.info(f'Code compiled with command: {" ".join(cmd)}')

    # Execute the compiled code
    execute_cmd: list[str] = ['dotnet', 'run', '--project', path]
    process: subprocess.CompletedProcess[str] = subprocess.run(
        execute_cmd, capture_output=True, text=True)
    logging.info(
        f'Code executed, stdout: {process.stdout.strip()}, stderr: {process.stderr.strip() or None}')

    return [process.stdout.strip(), process.stderr.strip() or None]


def execute_ruby_code(params: dict) -> [str, str or None]:
    if not params or len(params) == 0:
        raise ValueError("params is none or params len = 0")
    logging.info(f"start executing c or cpp code")
    language: str = params['language']
    code: str = params['code']

    path: str = f"builds/{language}/code.ruby"
    # Write the code to a file
    create_code_file(path, code)
    # Execute the compiled code
    execute_cmd: list[str] = ['ruby', path]
    process: subprocess.CompletedProcess[str] = subprocess.run(
        execute_cmd, capture_output=True, text=True)
    logging.info(
        f'Code executed, stdout: {process.stdout.strip()}, stderr: {process.stderr.strip() or None}')
    return [process.stdout.strip(), process.stderr.strip() or None]


def execute_golang_code(params: dict) -> [str, str or None]:
    if not params or len(params) == 0:
        raise ValueError("params is none or params len = 0")
    logging.info(f"start executing c or cpp code")
    language: str = params['language']
    code: str = params['code']

    path: str = f"builds/{language}/code.{language}"

    # Write the code to a file
    create_code_file(path, code)
    # Compile the code
    cmd: list[str] = ['go', 'build',
                      path]
    subprocess.run(cmd, check=True)
    logging.info(f'Code compiled with command: {" ".join(cmd)}')
    # Execute the compiled code
    execute_cmd: list[str] = [cfg.get('COMPILER', f'{language}'), 'run',
                              f"builds/{language}"]
    process: subprocess.CompletedProcess[str] = subprocess.run(
        execute_cmd, capture_output=True, text=True)
    logging.info(
        f'Code executed, stdout: {process.stdout.strip()}, stderr: {process.stderr.strip() or None}')
    return [process.stdout.strip(), process.stderr.strip() or None]
