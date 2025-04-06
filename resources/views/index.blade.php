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

        <div id="errors_container" class="errors-container">
            <ul id="errors">

            </ul>
        </div>

        <div class="form-container">
            <form>
                <div class="url-search-input">
                    <input type="text" id="urlInput" placeholder="Enter website URL (e.g., https://example.com)">
                </div>
                <div class="form-button">
                    <button id="searchButton">Scrape website</button>
                </div>
            </form>
        </div>

        <div id="websiteDetailsContainer" class="website-details-container">
            <div class="website-details">
                <div class="website-title"><strong>Title:</strong> <span id="website_title"></span></div>
                <div><strong>Description:</strong> <span id="website_description"></span></div>
            </div>
        </div>

        <div id="h1Container" class="header-elements-container margin-bottom">
            <details>
                <summary>Click to view the list of <span class="bold header">&nbsp;&lt;h1&gt;</span></summary>
                <ol id="h1_list">

                </ol>
            </details>
        </div>

        <div id="h2Container" class="header-elements-container margin-bottom">
            <details>
                <summary>Click to view the list of <span class="bold header">&nbsp;&lt;h2&gt;</span></summary>
                <ol id="h2_list">

                </ol>
            </details>
        </div>

        <div id="h3Container" class="header-elements-container margin-bottom">
            <details>
                <summary>Click to view the list of <span class="bold header">&nbsp;&lt;h3&gt;</span></summary>
                <ol id="h3_list">

                </ol>
            </details>
        </div>

        <div id="linksContainer" class="display-none margin-bottom">
            <details>
                <summary>Show links on website</summary>
                <ol id="links_list">

                </ol>
            </details>
        </div>

    </div>

    @vite(['resources/js/script.js'])
</body>
</html>
