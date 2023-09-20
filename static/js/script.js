window.addEventListener('DOMContentLoaded', function() {
    const textarea = document.getElementById('code');
    const languageSelect = document.getElementById('language');
    const runButton = document.getElementById('run-button');
    const outputArea = document.getElementById('output');
    textarea.value = "print('Hello,world!')";
    // Создайте объект для связи языков программирования с их модами
    const languageModes = {
        python: 'python',
        javascript: 'js',
        c: 'c',
        cpp: 'cpp',
        cs: "cs",
        java: "java",
        go: "go",
        ruby: "ruby"
            // Добавьте другие языки и соответствующие им псевдонимы модов для CodeMirror
    };

    const initialLanguage = languageSelect.value;

    // Создайте экземпляр CodeMirror, преобразуя textarea в редактор кода
    const codeEditor = CodeMirror.fromTextArea(textarea, {
        mode: languageModes[initialLanguage],
        theme: 'material-darker',
        lineNumbers: true,
        indentUnit: 4,
        indentWithTabs: true,
        extraKeys: { 'Ctrl-Space': 'autocomplete' },
    });

    runButton.addEventListener('click', function() {
        const code = codeEditor.getValue(); // Используйте getValue() для получения кода из CodeMirror
        const language = languageSelect.value;
        executeCode(code, language);
    });

    function executeCode(code, language) {
        const codeData = {
            code: code,
            language: language
        };

        fetch('/runcode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(codeData)
            })
            .then(response => response.json())
            .then(result => {
                outputArea.innerText = result.output || result.error || 'No output';
            })
            .catch(error => {
                outputArea.innerText = 'Error: ' + error.message;
            });
    }

    // Обновляем мод CodeMirror, когда выбирается новый язык
    languageSelect.addEventListener("change", function() {
        const selectedLanguage = languageSelect.value;
        let mode = "";

        switch (selectedLanguage) {
            case "python":
                codeEditor.setValue("print('Hello,world!')")
                codeEditor.focus()
                codeEditor.setCursor({line: 2, ch: 0})
                mode = "python";
                break;
            case "c":
                codeEditor.setValue('#include <stdio.h>\n\nint main() {\n\nprintf("Hello world");\nreturn 0;\n}')
                codeEditor.focus()
                codeEditor.setCursor({line: 2, ch: 0})
                mode = "text/x-csrc";
                break;
            case "cpp":
                codeEditor.setValue('#include <iostream>\n\nint main(){\n   std::cout<<"hello,world!"<<std::endl;\n  return 0;\n}')
                codeEditor.focus()
                codeEditor.setCursor({line: 2, ch: 0})
                mode = "text/x-c++src";
                break;
            case "cs":
                codeEditor.setValue('Console.WriteLine("Hello,world!");')
                codeEditor.focus()
                codeEditor.setCursor({line: 2, ch: 0})
                mode = "text/x-csharp";
                break;
            case "java":
                mode = "text/x-java";
                break;
            case "js":
                codeEditor.setValue("console.log('Hello,world!')")
                codeEditor.focus()
                codeEditor.setCursor({line: 2, ch: 0})
                mode = "javascript";
                break;
            case "ruby":
                codeEditor.setValue("puts 'hello, world!'")
                codeEditor.focus()
                codeEditor.setCursor({line: 2, ch: 0})
                mode = "ruby";
                break;
            case "go":
                codeEditor.setValue("package main")
                codeEditor.focus()
                codeEditor.setCursor({line: 2, ch: 0})
                mode = "go";
                break;
            default:
                codeEditor.setValue("print('Hello,world!')")
                codeEditor.focus()
                codeEditor.setCursor({line: 2, ch: 0})
                mode = "python";
        }
        codeEditor.setOption("mode", mode);
    });
    document.getElementById('file-input').addEventListener('change', function (event) {
        const reader = new FileReader();
        reader.onload = function (event) {
           codeEditor.setValue(event.target.result);
        }
        reader.readAsText(event.target.files[0]);
    }, false);
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 600) {
            document.querySelector('.io-container').style.flexDirection = 'column';
        } else {
        document.querySelector('.io-container').style.flexDirection = 'row';
        }
    });
    var translateButton = document.getElementById("translate-button");
    var translator = document.getElementById("translator");

    translateButton.addEventListener("click", function() {
      toggleTranslator();
    });

    function toggleTranslator() {
      if (translator.style.display === "none") {
        translator.style.display = "flex";
      } else {
        translator.style.display = "none";
      }
    }
    var translator = document.getElementById("translator");
    var textInput = document.getElementById("text-input");
    var languageSelectTr = document.getElementById("language-select-tr");
    var translateButton = document.getElementById("translate-button");
    var translationOutput = document.getElementById("translation-output");

    translateButton.addEventListener("click", function() {
      var text = textInput.value;
      var language = languageSelectTr.value;

      if (text) {
        translateText(text, language);
      }
    });

    function translateText(text, language) {
            const codeData = {
            text: text,
            language: language
            };
            fetch('/translate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(codeData)
            })
            .then(response => response.json())
            .then(result => {
                translationOutput.innerText = data
            })
            .catch(error => {
                translationOutput.innerText = 'Error: ' + error.message;
            });
    }
});