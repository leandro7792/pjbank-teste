<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Inventario extends Model
{
    protected $fillable = [
        'descricaoProduto', 'qtdeProduto', 'precoProduto',
    ];


    //gera a coluna virtual total
    protected $appends = ['total'];

    public function getTotalAttribute($value) {

        return $this->qtdeProduto * $this->precoProduto;
    }
}
