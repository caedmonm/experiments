<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit9185824f0bc7fbd444ae8d8559dbbdeb
{
    public static $files = array (
        '7b11c4dc42b3b3023073cb14e519683c' => __DIR__ . '/..' . '/ralouphie/getallheaders/src/getallheaders.php',
        'c964ee0ededf28c96ebd9db5099ef910' => __DIR__ . '/..' . '/guzzlehttp/promises/src/functions_include.php',
        'a0edc8309cc5e1d60e3047b5df6b7052' => __DIR__ . '/..' . '/guzzlehttp/psr7/src/functions_include.php',
        '37a3dc5111fe8f707ab4c132ef1dbc62' => __DIR__ . '/..' . '/guzzlehttp/guzzle/src/functions_include.php',
    );

    public static $prefixLengthsPsr4 = array (
        'P' => 
        array (
            'Psr\\Http\\Message\\' => 17,
            'Psr\\Cache\\' => 10,
        ),
        'G' => 
        array (
            'GuzzleHttp\\Psr7\\' => 16,
            'GuzzleHttp\\Promise\\' => 19,
            'GuzzleHttp\\' => 11,
            'Grpc\\Gcp\\' => 9,
            'Grpc\\' => 5,
            'Google\\Type\\' => 12,
            'Google\\Rpc\\' => 11,
            'Google\\Protobuf\\' => 16,
            'Google\\LongRunning\\' => 19,
            'Google\\Jison\\' => 13,
            'Google\\Iam\\' => 11,
            'Google\\Cloud\\Dialogflow\\' => 24,
            'Google\\Cloud\\' => 13,
            'Google\\Auth\\' => 12,
            'Google\\Api\\' => 11,
            'Google\\ApiCore\\' => 15,
            'GPBMetadata\\Google\\Protobuf\\' => 28,
            'GPBMetadata\\Google\\Cloud\\Dialogflow\\' => 36,
            'GPBMetadata\\Google\\' => 19,
        ),
        'F' => 
        array (
            'Firebase\\JWT\\' => 13,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Psr\\Http\\Message\\' => 
        array (
            0 => __DIR__ . '/..' . '/psr/http-message/src',
        ),
        'Psr\\Cache\\' => 
        array (
            0 => __DIR__ . '/..' . '/psr/cache/src',
        ),
        'GuzzleHttp\\Psr7\\' => 
        array (
            0 => __DIR__ . '/..' . '/guzzlehttp/psr7/src',
        ),
        'GuzzleHttp\\Promise\\' => 
        array (
            0 => __DIR__ . '/..' . '/guzzlehttp/promises/src',
        ),
        'GuzzleHttp\\' => 
        array (
            0 => __DIR__ . '/..' . '/guzzlehttp/guzzle/src',
        ),
        'Grpc\\Gcp\\' => 
        array (
            0 => __DIR__ . '/..' . '/google/grpc-gcp/src',
        ),
        'Grpc\\' => 
        array (
            0 => __DIR__ . '/..' . '/grpc/grpc/src/lib',
        ),
        'Google\\Type\\' => 
        array (
            0 => __DIR__ . '/..' . '/google/gax/src/Type',
        ),
        'Google\\Rpc\\' => 
        array (
            0 => __DIR__ . '/..' . '/google/gax/src/Rpc',
        ),
        'Google\\Protobuf\\' => 
        array (
            0 => __DIR__ . '/..' . '/google/protobuf/php/src/Google/Protobuf',
        ),
        'Google\\LongRunning\\' => 
        array (
            0 => __DIR__ . '/..' . '/google/gax/src/LongRunning',
        ),
        'Google\\Jison\\' => 
        array (
            0 => __DIR__ . '/..' . '/google/gax/src/Jison',
        ),
        'Google\\Iam\\' => 
        array (
            0 => __DIR__ . '/..' . '/google/gax/src/Iam',
        ),
        'Google\\Cloud\\Dialogflow\\' => 
        array (
            0 => __DIR__ . '/..' . '/google/cloud-dialogflow/src',
        ),
        'Google\\Cloud\\' => 
        array (
            0 => __DIR__ . '/..' . '/google/gax/src/Cloud',
        ),
        'Google\\Auth\\' => 
        array (
            0 => __DIR__ . '/..' . '/google/auth/src',
        ),
        'Google\\Api\\' => 
        array (
            0 => __DIR__ . '/..' . '/google/gax/src/Api',
        ),
        'Google\\ApiCore\\' => 
        array (
            0 => __DIR__ . '/..' . '/google/gax/src/ApiCore',
        ),
        'GPBMetadata\\Google\\Protobuf\\' => 
        array (
            0 => __DIR__ . '/..' . '/google/protobuf/php/src/GPBMetadata/Google/Protobuf',
        ),
        'GPBMetadata\\Google\\Cloud\\Dialogflow\\' => 
        array (
            0 => __DIR__ . '/..' . '/google/cloud-dialogflow/metadata',
        ),
        'GPBMetadata\\Google\\' => 
        array (
            0 => __DIR__ . '/..' . '/google/gax/metadata',
        ),
        'Firebase\\JWT\\' => 
        array (
            0 => __DIR__ . '/..' . '/firebase/php-jwt/src',
        ),
    );

    public static $fallbackDirsPsr4 = array (
        0 => __DIR__ . '/..' . '/google/grpc-gcp/src/generated',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit9185824f0bc7fbd444ae8d8559dbbdeb::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit9185824f0bc7fbd444ae8d8559dbbdeb::$prefixDirsPsr4;
            $loader->fallbackDirsPsr4 = ComposerStaticInit9185824f0bc7fbd444ae8d8559dbbdeb::$fallbackDirsPsr4;

        }, null, ClassLoader::class);
    }
}
