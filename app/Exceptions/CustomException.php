<?php

namespace App\Exceptions;

class CustomException extends \Exception {
    public function __construct($message, $statusCode) {
        parent::__construct($message, $statusCode);
    }
}