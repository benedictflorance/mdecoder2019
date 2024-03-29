<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="shortcut icon" href="https://pragyan.org/mdecoder//images/favicon_temp.png">
        <title>Mdecoder2019</title>
        <link href="https://fonts.googleapis.com/css?family=Audiowide" rel="stylesheet">
    </head>
    <body oncontextmenu="return false">
        <div id="App"></div>
        <script src="{{mix('/mdecoder/js/app.js')}}"></script>
    </body>
</html>
