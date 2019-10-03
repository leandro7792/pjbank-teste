<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Inventario;
use Faker\Generator as Faker;

$factory->define(Inventario::class, function (Faker $faker) {
    return [
        'descricaoProduto' => $faker->company,
        'qtdeProduto' => $faker->randomNumber(1),
        'precoProduto' => $faker->randomFloat($nbMaxDecimals = 2, $min = 10, $max = 100)
    ];
});
