window.addEventListener('DOMContentLoaded', function() {
    const textarea = document.getElementById('code');
    const languageSelect = document.getElementById('language');
    const runButton = document.getElementById('run-button');
    const outputArea = document.getElementById('output');

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
                codeEditor.setCursor(1, 0)
                mode = "python";
                break;
            case "c":
                mode = "text/x-csrc";
                break;
            case "cpp":
                mode = "text/x-c++src";
                break;
            case "cs":
                mode = "text/x-csharp";
                break;
            case "java":
                mode = "text/x-java";
                break;
            case "js":
                codeEditor.setValue("console.log('Hello,world!')")
                codeEditor.focus()
                codeEditor.setCursor(1, 0)
                mode = "javascript";
                break;
            case "ruby":
                codeEditor.setValue("puts 'hello, world!'")
                codeEditor.focus()
                codeEditor.setCursor(1, 0)
                mode = "ruby";
                break;
            case "go":
                mode = "go";
                codeEditor.focus()
                codeEditor.setValue("package main")
                codeEditor.setCursor(1, 0)
                break;
            default:
                codeEditor.setValue("print('Hello,world!')")
                codeEditor.focus()
                codeEditor.setCursor(1, 0)
                mode = "python";
        }
        codeEditor.setOption("mode", mode);
    });
});