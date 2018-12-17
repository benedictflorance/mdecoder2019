<!DOCTYPE html>
<html>
<head>
    <title>MDecoder 2018</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
</head>
<body>
    <header>
        @yield('header')
    </header>
    <section>
        @yield('content')
    </section>
</body>
</html>