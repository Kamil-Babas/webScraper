<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @vite(['resources/css/style.css'])
</head>
<body>

    <div class="container">

        <div class="form-container">
            <form>
                <div class="url-search-input">
                    <input type="text" id="urlInput">
                </div>
                <div class="form-button">
                    <button id="searchButton">Search</button>
                </div>
            </form>
        </div>

    </div>

    @vite(['resources/js/script.js'])
</body>
</html>
