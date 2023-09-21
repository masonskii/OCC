# need optimisation

import subprocess
import io
from contextlib import redirect_stdout
from config.init_config import cfg
import logging
import os
from googletrans import Translator


# Configure logging
logging.basicConfig(filename='logfile.log', level=logging.DEBUG,
                    format='%(asctime)s %(levelname)s: %(message)s')

logging.debug('Code execution started')


def create_code_file(path: str, text: str = None) -> bool:
    if not text:
        return False

    with open(path, "w") as file:
        file.write(text)

    logging.debug(f'Code file created at {path}')
    return True


def execute_code(params: dict = None) -> [str, str or None]:
    if not params:
        return "", ""
    if params['lang'] == 'python':
        return execute_python_code(params['code'])
    if params['lang'] == 'c' or params['lang'] == 'cpp':
        return execute_c_code(params)
    if params['lang'] == 'js':
        return execute_js_code(params)
    if params['lang'] == 'cs':
        return execute_cs_code(params)
    if params['lang'] == 'go':
        return execute_golang_code(params)
    if params['lang'] == 'ruby':
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
    return output, None


def execute_c_code(params: dict) -> [str, str or None]:
    if not params or len(params) == 0:
        raise ValueError("params is none or params len = 0")
    logging.info(f"start executing c or cpp code")
    lang: str = params['lang']
    code: str = params['code']

    path: str = f"builds/{lang}/code.{lang}"

    # Write the code to a file
    create_code_file(path, code)

    # Compile the code
    cmd: list[str] = [cfg.get('COMPILER', f'{lang}'),
                      path, '-o', f"builds/{lang}/code"]
    subprocess.run(cmd, check=True)
    logging.info(f'Code compiled with command: {" ".join(cmd)}')

    # Execute the compiled code
    execute_cmd: list[str] = [f"builds/{lang}/code"]
    process: subprocess.CompletedProcess[str] = subprocess.run(
        execute_cmd, capture_output=True, text=True)
    logging.info(
        f'Code executed, stdout: {process.stdout.strip()}, stderr: {process.stderr.strip() or None}')
    return [process.stdout.strip(), process.stderr.strip() or None]


def execute_js_code(params: dict) -> [str, str or None]:
    if not params or len(params) == 0:
        raise ValueError("params is none or params len = 0")
    logging.info(f"start executing javascript code")
    lang: str = params['lang']
    code: str = params['code']

    path: str = f"builds/{lang}/code.{lang}"

    # Write the code to a file
    create_code_file(path, code)
    # Execute the compiled code
    execute_cmd: list[str] = [cfg.get('COMPILER', f'{lang}'), path]
    process: subprocess.CompletedProcess[str] = subprocess.run(
        execute_cmd, capture_output=True, text=True)
    logging.info(
        f'Code executed, stdout: {process.stdout.strip()}, stderr: {process.stderr.strip() or None}')
    return [process.stdout.strip(), process.stderr.strip() or None]


def execute_cs_code(params: dict) -> [str, str or None]:
    if not params or len(params) == 0:
        raise ValueError("params is none or params len = 0")
    logging.info(f"start executing c# code")
    lang: str = params['lang']
    code: str = params['code']

    path: str = f"builds/{lang}"
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
    lang: str = params['lang']
    code: str = params['code']

    path: str = f"builds/{lang}/code.{lang}"
    # Write the code to a file
    create_code_file(path, code)
    # Execute the compiled code
    execute_cmd: list[str] = [cfg.get('COMPILER', f'{lang}'), path]
    process: subprocess.CompletedProcess[str] = subprocess.run(
        execute_cmd, capture_output=True, text=True)
    logging.info(
        f'Code executed, stdout: {process.stdout.strip()}, stderr: {process.stderr.strip() or None}')
    return [process.stdout.strip(), process.stderr.strip() or None]


def execute_golang_code(params: dict) -> [str, str or None]:
    if not params or len(params) == 0:
        raise ValueError("params is none or params len = 0")
    logging.info(f"start executing c or cpp code")
    lang: str = params['lang']
    code: str = params['code']

    path: str = f"builds/{lang}/code.{lang}"

    # Write the code to a file
    create_code_file(path, code)
    # Compile the code
    cmd: list[str] = [cfg.get('COMPILER', f'{lang}'), 'build',
                      path]
    subprocess.run(cmd, check=True)
    logging.info(f'Code compiled with command: {" ".join(cmd)}')
    # Execute the compiled code
    execute_cmd: list[str] = [cfg.get('COMPILER', f'{lang}'), 'run',
                              f"builds/{lang}"]
    process: subprocess.CompletedProcess[str] = subprocess.run(
        execute_cmd, capture_output=True, text=True)
    logging.info(
        f'Code executed, stdout: {process.stdout.strip()}, stderr: {process.stderr.strip() or None}')
    return [process.stdout.strip(), process.stderr.strip() or None]


def translate_text(params: dict = None) -> str:
    translator = Translator(service_urls=['translate.google.com'])
    translated = translator.translate(
        params['text'], src=params['before'], dest=params['after'])
    return translated.text
