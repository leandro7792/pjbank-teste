<?php
use App\Inventario;
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Inventario;

class BoletoController extends Controller
{
    public function index(Request $request){

        $inventario = Inventario::all();
        $total = number_format($inventario->sum('total'), 2 ,".","");

        $data = new \DateTime("+3 days");

        $dados = array(
                "url" => "https://sandbox.pjbank.com.br/recebimentos/d3418668b85cea70aa28965eafaf927cd34d004c/transacoes",
                "dados" => array(
                    "vencimento" => $data->format("m/d/Y"),
                    "valor" => $total,
                    "juros" => "0",
                    "juros_fixo" => "0",
                    "multa"=> "0",
                    "multa_fixo"=> "0",
                    "nome_cliente"=> "Cliente de Exemplo",
                    "email_cliente"=> "cliente.exemplo@pjbank.com.br",
                    "telefone_cliente"=> "1940096830",
                    "cpf_cliente"=> "62936576000112",
                    "endereco_cliente"=> "Rua Joaquim Vilac",
                    "numero_cliente"=> "509",
                    "bairro_cliente"=> "Vila Teixeira",
                    "cidade_cliente"=> "Campinas",
                    "estado_cliente"=> "SP",
                    "cep_cliente"=> "13301510",
                    "logo_url"=> "https://pjbank.com.br/assets/images/logo-pjbank.png",
                    "texto"=> "Texto opcional",
                    "grupo"=> "Boletos001",
                    "webhook"=> "http://example.com.br",
                    "pedido_numero"=> "89724"
                )
            );



        return response()->json($dados, 200);


    }
}
